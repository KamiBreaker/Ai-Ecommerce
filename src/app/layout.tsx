import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import { UserProvider } from "../contexts/UserContext";
import { CartProvider } from "../contexts/CartContext";
import { CatalogProvider } from "../contexts/CatalogContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Fashion.AI | The Future of Apparel",
  description: "Luxury AI-powered fashion ecosystem for creators and enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <UserProvider>
          <CatalogProvider>
            <CartProvider>
              <Navbar />
              <main style={{ minHeight: '60vh' }}>{children}</main>
              <Footer />
            </CartProvider>
          </CatalogProvider>
        </UserProvider>

        {/* Bootstrap Bundle JS - Client side only */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          async
        ></script>
      </body>
    </html>
  );
}
