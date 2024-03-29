import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
 


  
    try {
      const data = await resend.emails.send({
        from: 'notification@celestialpdf.com',
        to: [userEmail],
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
