import { NextResponse, NextRequest } from "next/server";
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
import prisma from "@/lib/prisma";


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
        const { file_key, file_name, userid } = body;
        console.log(file_key, file_name);


        const r2url = `${process.env.NEXT_PUBLIC_R2_ENDPOINT}/${file_key}`;

        const file = {
            key: file_key,
            name: file_name,
            url: r2url,
        };

        try {
            const isFileExist = await prisma.album.findFirst({
                where: {
                    key: file.key,
                },
            })

            if (isFileExist) return


            const createdFile = await prisma.album.create({
                data: {
                    key: file.key,
                    name: file.name,
                    userId: userid,
                    url: file.url,
                },
            })

            return NextResponse.json(
                {
                    success: "file created successfully"
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


