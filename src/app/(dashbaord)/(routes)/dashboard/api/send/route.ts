import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextApiRequest, NextApiResponse } from 'next';
import { absoluteUrl } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import prisma from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request, res: Response) {
  if (req.method === 'POST') {
    const { userId } = auth();
    const sender = process.env.Sender || 'resend.dev';
    const body = await req.json();
    let { isPasswordVisible,
      password,
      isDownloadEnabled,
      email, fileId } = body;


    if (!isPasswordVisible) {
      password = 'none'
    }

    try {
      if (userId) {
        const file = await prisma.file.findFirst({
          where: {
            userId: userId,
            id: fileId
          }
        })
        if (file) {
          const sentfile = await prisma.send.create({
            data: {
              hasPassword: isPasswordVisible,
              password: password,
              isDownloadEnabled: isDownloadEnabled,
              recipientEmail: email,
              url: file.url,
              Key: file.key,
              name: file.name,

              fileId: fileId,
              userId: userId,
            }
          })
          const viewUrl = absoluteUrl(`/view/${sentfile.id}`);
          console.log(viewUrl)
          const data = await resend.emails.send({
            from: sender,
            to: email,
            subject: 'Welcome to CelestialDOC',
            react: EmailTemplate({ viewUrl }, { steps: [], links: [] }),
          });

          return Response.json(data);
        }
      }

    } catch (error) {
      return Response.json({ error });
    }
  } else {
    return Response.json({ error: 'Missing user information' });
  }
}
