import { EmailTemplate } from '@/components/email-template';

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export async function POST(req: Request, res: Response) {
    if (req.method === 'POST') {

        const client = new S3Client({
            region: process.env.S3_UPLOAD_REGION
        })
        const body = await req.json();
        let { file_key } = body;
        const command = new GetObjectCommand({
            Bucket: process.env.S3_UPLOAD_BUCKET,
            Key: file_key
        })

        try {
            const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

            return Response.json({ success: true, url: signedUrl });
        } catch (error) {
            return Response.json({ error });
        }
    } else {
        return Response.json({ error: 'Missing user information' });
    }
}
