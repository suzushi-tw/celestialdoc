import { NextResponse, NextRequest } from "next/server";
import { useUser } from '@clerk/nextjs';
// import { db } from '@/db'
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
// import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
// import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
// import { PineconeStore } from 'langchain/vectorstores/pinecone'
// import { pinecone } from '@/lib/pinecone'
// import { getUserSubscriptionPlan } from '@/lib/stripe'
// import { PLANS } from '@/config/stripe'
// import { PrismaClient } from '@prisma/client'
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const maxDuration = 300;

const client = new S3Client({
    region: process.env.S3_UPLOAD_REGION,
    credentials: {
        secretAccessKey: process.env.S3_UPLOAD_SECRET || '',
        accessKeyId: process.env.S3_UPLOAD_KEY || '',
    },
});



export async function POST(req: Request, res: Response) {
    const { user } = useUser();
    if (req.method === 'POST') {



        const body = await req.json();
        const { file_key, file_name } = body;
        console.log(file_key, file_name);



        const s3url = `https://${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com/${file_key}`;
        const file = {
            key: file_key,
            name: file_name,
            url: s3url,
        };

        try {
            const isFileExist = await prisma.file.findFirst({
                where: {
                    key: file.key,
                },
            })

            if (isFileExist) return

            if (user != null) {
                const createdFile = await prisma.file.create({
                    data: {
                        key: file.key,
                        name: file.name,
                        userId: user.id,
                        url: file.url,
                        uploadStatus: 'PROCESSING',
                    },
                })

                return NextResponse.json(
                    {
                        success: "file created successfully"
                    },
                    { status: 200 }
                );
            }




        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { error: "internal server error" },
                { status: 500 }
            );
        }
    }
}




