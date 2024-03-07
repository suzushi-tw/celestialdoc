import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function constructMetadata({
  title = "CelestialPDF",
  description = "Boost Productivity with AI, let AI summarize documents with detail analysis. Just like a little assistant that can explain everything including complex topic!",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@Ian"
    },
    icons,
    metadataBase: new URL('https://stellar-celestialpdf.com/'),
    
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}
