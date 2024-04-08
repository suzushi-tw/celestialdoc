
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';

import { z } from 'zod';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { absoluteUrl } from '@/lib/utils';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import axios from 'axios';



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

  getRecentFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    return await prisma.file.findMany({
      where: { userId: userId },
      orderBy: { updatedAt: 'desc' },
      take: 3,
    });
  }),

  getRecentAlbum: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    return await prisma.album.findMany({
      where: { userId: userId },
      orderBy: { updatedAt: 'desc' },
      take: 3,
    });
  }),
  getRecentSent: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    return await prisma.send.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  }),

  
  getfavoriteafile: privateProcedure.query(async({ctx})=>{
    const {userId}=ctx

    return await prisma.file.findMany({
      where: { 
        userId: userId,
        favorite: true
      },
      orderBy: { updatedAt: 'desc' },
    });
  }),


  getfavoritealbume: privateProcedure.query(async({ctx})=>{
    const {userId}=ctx

    return await prisma.album.findMany({
      where: { 
        userId: userId,
        favorite: true
      },
      orderBy: { updatedAt: 'desc' },
    });
  }),


  filescount: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    const fileExtensions = ['.pdf', '.docx', '.xls'];
    const fileCounts = await Promise.all(fileExtensions.map(async (extension) => {
      const count = await prisma.file.count({
        where: { userId: userId, name: { contains: extension } },
      });

      return { type: extension, count };
    }));

    const albumExtensions = ['.jpg', '.png', '.mp4', '.avi'];
    const albumCounts = await Promise.all(albumExtensions.map(async (extension) => {
      const count = await prisma.album.count({
        where: { userId: userId, name: { contains: extension } },
      });

      return { type: extension, count };
    }));

    return [...fileCounts, ...albumCounts];
  }),



  getUserAlbum: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    return await prisma.album.findMany({
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

  getAlbum: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = auth();

      const file = await prisma.album.findFirst({
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

  deleteAlbum: privateProcedure
    .input(z.object({ id: z.string(), key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await prisma.album.findFirst({
        where: {
          id: input.id,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      await prisma.album.delete({
        where: {
          id: input.id,
          key: input.key,
        },
      })


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

      try {

        if (process.env.R2_S3_ENDPOINT) {
          const deleteParams = {
            Bucket: process.env.R2_BUCKET,
            Key: input.key,
          }
          await R2client.send(new DeleteObjectCommand(deleteParams))
        } else {
          const deleteParams = {
            Bucket: process.env.S3_UPLOAD_BUCKET,
            Key: input.key,
          };

          await S3client.send(new DeleteObjectCommand(deleteParams));
        }
        


      } catch (error) {
        console.error('Error deleting file:', error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }


      return file
    }),
})


export type AppRouter = typeof appRouter
