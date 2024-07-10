import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Moto Moto",
  description: " Driving lessons at your palm",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id as string;
  return (
    <html lang="en">
      <body>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          userId={userId}
        >
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
