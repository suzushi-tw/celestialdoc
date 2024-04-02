

<img src="./Public/Demo.png" alt="CelestialDOC dashboard" />

## CelestialDOC

CelestialDOC is an open source Google drive or Docsend alternative to store your files and easily share it with others with advanced Link Control. 

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


## Stack

- Nextjs
- Prisma with Postgres, a drizzle schema will be provided soon (WIP)
- Shdcn UI
- AWS S3 for documents
- Clerk Auth
- Resend / AWS SES in the future (WIP)
- Cloudflare R2 for album for optimized bandwidth (WIP)



## Deployment

The easiest way to deploy is 
- Vercel
- Cloudflare Pages (add Edge run time)
- Digital Ocean

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

Open source under GPL 3.0 License, you are welcome to 

- Self host
- Make any modification 
- Commercialize it

Modification should be open source so interested user can take a look at it. 
