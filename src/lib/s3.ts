import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

export async function uploadToS3(file: File): Promise<{ file_key: string; file_name: string }> {
    return new Promise((resolve, reject) => {
        try {
            const s3 = new S3({
                region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION,
                credentials: {
                    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
                },
            });

            // Assuming file.type is correctly set for DOC and DOCX files
            let extension = '';
            if (file.type === 'application/pdf') {
                extension = '.pdf';
            } else if (file.type.includes('wordprocessingml')) {
                extension = '.docx';
            } else if (file.type.includes('msword')) {
                extension = '.doc';
            } else if (file.type.includes('ms-powerpoint')) {
                extension = '.ppt';
            } else if (file.type.includes('presentationml')) {
                extension = '.pptx';
            } else {
                throw new Error('Unsupported file type: ' + file.type);
            }

            const file_key = "uploads/" + uuidv4() + extension;
            const params = {
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
                Key: file_key,
                Body: file,
                ContentType: file.type // Ensure this is set correctly
            };
            s3.putObject(params, (err: any, data: PutObjectCommandOutput | undefined) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        file_key,
                        file_name: file.name,
                    });
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}
