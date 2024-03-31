import { PutObjectCommandOutput, S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3 = new S3Client({
    endpoint: process.env.NEXT_PUBLIC_R2_S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY || '',
    },
    region: "auto",
});

async function getSignedUploadUrl(file_key: string) {
    const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_R2_BUCKET,
        Key: file_key,
    });

    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 }); // URL expires in 1 hour
    return signedUrl;
}


export async function uploadToR2(file: File): Promise<{ file_key: string; file_name: string }> {
    return new Promise(async (resolve, reject) => {
        try {
            let extension = '';
            if (file.type === 'image/jpeg') extension = '.jpg';
            else if (file.type === 'image/png') extension = '.png';
            else if (file.type === 'image/gif') extension = '.gif';
            else if (file.type === 'video/mp4') extension = '.mp4';

            const file_key = "uploads/" + uuidv4() + extension;
            const signedUrl = await getSignedUploadUrl(file_key); // Ensure you await here

            const response = await fetch(signedUrl, { // Now signedUrl is a string, not a Promise
                method: 'PUT',
                headers: {
                    'Content-Type': file.type
                },
                body: file
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            resolve({
                file_key,
                file_name: file.name,
            });
        } catch (error) {
            reject(error);
        }
    });
}
