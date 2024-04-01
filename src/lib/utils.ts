import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function absoluteUrl(path: string) {
  // const { protocol, host } = window.location;
  // return `${protocol}//${host}${path}`;
  return `https://celestaildoc.com${path}`;
}

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const focusInput =
  "focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:dark:ring-blue-700/50 focus:dark:border-blue-700"

export const focusRing = [
  // base
  "outline outline-blue-500 outline-offset-2 outline-0",
  // dark
  "dark:outline-blue-500",
  // focus-visible
  "focus-visible:outline-2",
]

export const hasErrorInput =
  "border-red-500 ring-2 ring-red-200 dark:border-red-500 dark:ring-red-400/20"


