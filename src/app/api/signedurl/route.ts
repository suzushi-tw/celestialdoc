import { NextResponse, NextRequest } from "next/server";

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const S3client = new S3Client({
    region: process.env.S3_UPLOAD_REGION,
    credentials: {
        secretAccessKey: process.env.S3_UPLOAD_SECRET || '',
        accessKeyId: process.env.S3_UPLOAD_KEY || '',
    },
});

const R2client = new S3Client({
    endpoint: process.env.R2_S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
    region: "auto",
});



export async function POST(req: Request, res: Response) {

    if (req.method === 'POST') {

        const body = await req.json();
        const { file_key, file_type } = body;
        console.log(file_key);

        try {

            // const command = new GetObjectCommand({
            //     Bucket: process.env.S3_UPLOAD_BUCKET,
            //     Key: file_key,
            // });
            const s3command = new PutObjectCommand({
                Bucket: process.env.S3_UPLOAD_BUCKET,
                Key: file_key,
                ContentType: file_type,  // This should be the MIME type of your file
            });

            const r2command = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET,
                Key: file_key,
                ContentType: file_type,
            });

            let signedUrl;
            if (process.env.R2_S3_ENDPOINT) {
                signedUrl = await getSignedUrl(R2client, r2command, { expiresIn: 3600 }); // URL expires in 1 hour
            } else {
                signedUrl = await getSignedUrl(S3client, s3command, { expiresIn: 3600 }); // URL expires in 1 hour
            }
            // console.log(signedUrl)
            return NextResponse.json(
                {
                    success: "file created successfully",
                    signedUrl: signedUrl
                },
                { status: 200 }
            );


        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { error: "internal server error" },
                { status: 500 }
            );
        }
    }
}




