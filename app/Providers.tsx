"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "react-hot-toast";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";
import "@knocklabs/react/dist/index.css";

type ProviderProps = {
  userId: string;
};


const Providers = ({
  children,
  userId,
  ...props
}: ThemeProviderProps & ProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <Toaster />
      <KnockProvider
        apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY as string}
        userId={userId}
      >
        <KnockFeedProvider
          feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID as string}
        >
          {children}
        </KnockFeedProvider>
      </KnockProvider>
    </NextThemesProvider>
  );
};

export default Providers;
