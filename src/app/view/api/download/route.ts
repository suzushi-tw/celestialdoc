import { EmailTemplate } from '@/components/email-template';

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export async function POST(req: Request, res: Response) {
    if (req.method === 'POST') {

        const client = new S3Client({
            region: process.env.S3_UPLOAD_REGION,
            credentials: {
                secretAccessKey: process.env.S3_UPLOAD_SECRET || '',
                accessKeyId: process.env.S3_UPLOAD_KEY || '',
            },
        });
        console.log("getting download url")
        const body = await req.json();
        let { File_key } = body;
        console.log(File_key)
        const command = new GetObjectCommand({
            Bucket: process.env.S3_UPLOAD_BUCKET,
            Key: File_key
        })

        try {
            
            const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
            console.log(signedUrl)
            return Response.json({ success: true, url: signedUrl });
        } catch (error) {
            return Response.json({ error });
        }
    } else {
        return Response.json({ error: 'Missing user information' });
    }
}
