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


export function generateBookingNumber() {
  const prefix = "MOT";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  
  // Generate two random lowercase alphabetical letters
  const randomLetter1 = letters.charAt(Math.floor(Math.random() * letters.length));
  const randomLetter2 = letters.charAt(Math.floor(Math.random() * letters.length));
  
  // Combine the prefix and random letters to create the booking number
  const bookingNumber = `${prefix}${randomLetter1}${randomLetter2}`;
  
  return bookingNumber;
}


export function generatePaymentToken() {
  const prefix = "tok_";
  const uniqueId = generateUniqueId(); // Function to generate a unique identifier
  
  // Combine the prefix and unique identifier to create the payment token
  const paymentToken = `${prefix}${uniqueId}`;
  
  return paymentToken;
}

// Function to generate a unique identifier (for demonstration purposes)
function generateUniqueId() {
  // Example: Generate a random number with current timestamp
  const timestamp = new Date().getTime();
  const randomId = Math.random().toString(36).substring(2, 10); // Random alphanumeric string
  
  return `${timestamp}_${randomId}`;
}
