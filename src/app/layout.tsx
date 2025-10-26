import "./globals.css";
import { Orbitron, Raleway, Montserrat } from "next/font/google";

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-orbitron",
});

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-raleway",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} bg-[var(--bg-dark)] text-[var(--text)]`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-30 md:mt-18">
            {children}
          </main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
