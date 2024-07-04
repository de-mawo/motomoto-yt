import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//An implementation to make sure that there is a redirect after signing in on Custom Next Auth signin page
export const getPathname = (url: string | undefined): string => {
  if (!url) return "/";
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname;
  } catch (error) {
    console.error("Invalid URL:", error);
    return "/";
  }
};