import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function absoluteUrl(path: string) {
  // const { protocol, host } = window.location;
  // return `${protocol}//${host}${path}`;
  return `https://celestialdoc.com${path}`;
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
