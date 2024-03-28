
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';

import { z } from 'zod';

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


})


export type AppRouter = typeof appRouter
