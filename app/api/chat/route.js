import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Simple in-memory rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT = 10; // max messages
const RATE_WINDOW = 60 * 1000; // per 60 seconds

function isRateLimited(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];

  // Filter requests within the window
  const recentRequests = userRequests.filter((time) => now - time < RATE_WINDOW);

  if (recentRequests.length >= RATE_LIMIT) {
    return true;
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return false;
}

export async function POST(request) {
  try {
    // Get IP
    const ip = request.headers.get("x-forwarded-for") || 
                request.headers.get("x-real-ip") || 
                "anonymous";

    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many messages. Please wait a moment." },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: `You are a helpful assistant for Hela, a premium minimal streetwear brand. 
      
You help customers with questions about:
- Products: t-shirts, hoodies, jackets, bottoms. Prices range from $45 to $195.
- Sizing: we offer XS, S, M, L, XL, XXL. Fit is generally oversized/relaxed.
- Shipping: free shipping on orders over $150. Standard delivery 3-5 business days.
- Returns: free returns within 30 days, items must be unworn with tags attached.
- Materials: we use premium cotton, organic fabrics, and sustainable materials.
- Brand: Hela is a minimal streetwear brand focused on quality over quantity.

Keep responses short, friendly and on brand. If asked something unrelated to Hela, politely redirect back to the store.`,
      messages: messages,
    });

    return Response.json({
      message: response.content[0].text
    });

  } catch (error) {
    console.error("Chat error:", error);
    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}