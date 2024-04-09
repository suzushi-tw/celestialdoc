import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

async function getSignedUploadUrl(file_key: string, file_type: string) {

    try {
        const response = await axios.post('/api/S3signedurl', { file_key, file_type });
        return response.data.signedUrl;
    } catch (error) {
        console.error('Error getting signed URL', error);
        throw error;
    }
}

export async function uploadToS3(file: File): Promise<{ file_key: string; file_name: string }> {
    return new Promise(async (resolve, reject) => {
        try {

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

            const signedUrl = await getSignedUploadUrl(file_key, file.type); // Ensure you await here
            console.log("uploading files")


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
