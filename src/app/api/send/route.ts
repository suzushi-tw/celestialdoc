import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request, res: Response) {
  if (req.method === 'POST') {

    const sender = process.env.Sender || 'resend.dev';

    const body = await req.json();
    const { isPasswordVisible,
      password,
      isDownloadEnabled,
      email, } = body;

    try {

      
      const data = await resend.emails.send({
        from: sender,
        to: email,
        subject: 'Welcome to CelestialPDF',
        react: EmailTemplate({ firstName: username }, { steps: [], links: [] }),
      });

      return Response.json(data);
    } catch (error) {
      return Response.json({ error });
    }
  } else {
    return Response.json({ error: 'Missing user information' });
  }
}
