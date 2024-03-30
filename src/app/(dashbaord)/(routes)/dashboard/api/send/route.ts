import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/prisma';
import { absoluteUrl } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();
export async function POST(req: Request, res: Response) {
  if (req.method === 'POST') {
    const { userId,  } = auth();
    const sender = process.env.Sender || 'resend.dev';
    const body = await req.json();
    const { isPasswordVisible,
      password,
      isDownloadEnabled,
      email, url } = body;
    let finalpassword = '';
    if (!isPasswordVisible) {
      finalpassword = 'none'
    }

    try {
      const sentfile = await prisma.send.create({
        data: {
          hasPassword: isPasswordVisible,
          password: finalpassword,
          isDownloadEnabled: isDownloadEnabled,
          recipientEmail: email,
          url: url
        }
      })
      const viewUrl=absoluteUrl(`/view/${sentfile.id}`);
      console.log(viewUrl)
      const data = await resend.emails.send({
        from: sender,
        to: email,
        subject: 'Welcome to CelestialPDF',
        react: EmailTemplate({ viewUrl }, { steps: [], links: [] }),
      });

      return Response.json(data);
    } catch (error) {
      return Response.json({ error });
    }
  } else {
    return Response.json({ error: 'Missing user information' });
  }
}
