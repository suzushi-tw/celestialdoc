This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Set Up .env:

```bash
//baseurl
NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in 
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up 
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL=
//the email you wish to send from 
Sender=
RESEND_API_KEY=

//S3 credentials
S3_UPLOAD_BUCKET=
S3_UPLOAD_REGION=
S3_UPLOAD_SECRET=
S3_UPLOAD_KEY=

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Stack

- Nextjs
- Prisma with Postgres, a drizzle schema will be provided soon (WIP)
- Shdcn UI
- AWS S3 for documents
- Clerk Auth
- Resend / AWS SES in the future (WIP)
- Cloudflare R2 for album for optimized bandwidth (WIP)



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

Open source under GPL 3.0 License, you are welcome to 

- Self host
- Make any modification 
- Commercialize it

Modification should be open source so interested user can take a look at it. 
