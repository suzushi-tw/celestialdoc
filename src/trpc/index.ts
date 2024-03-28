
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';

import { z } from 'zod';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { absoluteUrl } from '@/lib/utils';

import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs';
import axios from 'axios';


const prisma = new PrismaClient();


export const appRouter = router({
  authCallback: privateProcedure.query(async () => {
    const { userId } = auth();
    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    const dbUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!dbUser) {

      await prisma.user.create({
        data: {
          id: userId,
        },
      });
    }

    return { success: true };
  }),

  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    return await prisma.file.findMany({
      where: {
        userId,
      },
    })
  }),

  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = auth();

      const file = await prisma.file.findFirst({
        where: {
          key: input.key,
          userId: userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      return file
    }),


  deleteFile: privateProcedure
    .input(z.object({ id: z.string(), key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await prisma.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      await prisma.file.delete({
        where: {
          id: input.id,
          key: input.key,
        },
      })


      const client = new S3Client({
        region: process.env.S3_UPLOAD_REGION,
        credentials: {
          secretAccessKey: process.env.S3_UPLOAD_SECRET || '',
          accessKeyId: process.env.S3_UPLOAD_KEY || '',
        },
      });
      try {
        const deleteParams = {
          Bucket: process.env.S3_UPLOAD_BUCKET,
          Key: input.key,
        };

        await client.send(new DeleteObjectCommand(deleteParams));


      } catch (error) {
        console.error('Error deleting file:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }


      return file
    }),
})


export type AppRouter = typeof appRouter
