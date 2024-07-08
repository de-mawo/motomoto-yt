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


export const addArrayItem = (currentItems: any[], newItem: any) => {
  const updatedItems = [...currentItems, newItem];
  return updatedItems;
};

export const removeArrayItem = (items: any[], indexToRemove: number) => {
  const updatedItems = items.filter((_, index) => index !== indexToRemove);
  return updatedItems;
};

export function makeSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
