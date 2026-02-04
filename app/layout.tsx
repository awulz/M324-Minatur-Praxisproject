import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swiss Weather App",
  description: "Interactive weather map for Swiss cities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
