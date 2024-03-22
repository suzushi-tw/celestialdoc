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
            const file_key = "uploads/" + uuidv4() + (file.type === 'application/pdf' ? '.pdf' : file.type.includes('wordprocessingml') ? '.docx' : '.doc');
            const new_file_key = file_key.replace(/\.docx?$/, '.pdf');
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
