import NextAuth from "next-auth"
import prisma from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";


const providers: Provider[] = [Google];

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  });
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers,
    pages: {
      signIn: "/login",
      newUser: "/new-user",
    },
})