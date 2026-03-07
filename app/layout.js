import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hela",
  description: "Minimal streetwear for people who let the clothes speak for themselves.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}