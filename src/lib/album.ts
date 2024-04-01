import { PutObjectCommandOutput, S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";


async function getSignedUploadUrl(file_key: string, file_type: string) {

    try {
        const response = await axios.post('/api/signedurl', { file_key, file_type });
        return response.data.signedUrl;
    } catch (error) {
        console.error('Error getting signed URL', error);
        throw error;
    }
}


export async function uploadToalbum(file: File): Promise<{ file_key: string; file_name: string }> {
    return new Promise(async (resolve, reject) => {
        try {
            let extension = '';
            if (file.type === 'image/jpeg') extension = '.jpg';
            else if (file.type === 'image/png') extension = '.png';
            else if (file.type === 'image/gif') extension = '.gif';
            else if (file.type === 'video/mp4') extension = '.mp4';

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
