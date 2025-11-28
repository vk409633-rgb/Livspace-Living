import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Retail Ecommerce - Tiles, Furniture & Home Finishing Products",
    template: "%s | Retail Ecommerce"
  },
  description: "Premium quality tiles, furniture, sanitary-ware, modular kitchen, lighting, and all house-finishing products. Best prices in Patna, Bihar.",
  keywords: ["tiles", "furniture", "sanitary ware", "modular kitchen", "lighting", "Patna", "Bihar", "home improvement"],
  authors: [{ name: "Retail Ecommerce" }],
  creator: "Retail Ecommerce",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yourstore.com",
    title: "Retail Ecommerce - Premium Home Finishing Products",
    description: "Shop tiles, furniture, sanitary-ware, and more",
    siteName: "Retail Ecommerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail Ecommerce",
    description: "Premium home finishing products",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
