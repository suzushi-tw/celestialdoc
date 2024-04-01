import { NextResponse, NextRequest } from "next/server";

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const client = new S3Client({
    region: process.env.S3_UPLOAD_REGION,
    credentials: {
        secretAccessKey: process.env.S3_UPLOAD_SECRET || '',
        accessKeyId: process.env.S3_UPLOAD_KEY || '',
    },
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
            const command = new PutObjectCommand({
                Bucket: process.env.S3_UPLOAD_BUCKET,
                Key: file_key,
                ContentType: file_type,  // This should be the MIME type of your file
            });

            const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

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




