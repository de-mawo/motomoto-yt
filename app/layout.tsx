import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Moto Moto",
  description: " Driving lessons at your palm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
