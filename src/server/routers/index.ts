import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../trpc'
import { useUser, auth, currentUser } from '@clerk/nextjs';
import db from '@/lib/db/index'
import { users } from '@/lib/db/schema';
import { PrismaClient } from '@prisma/client'
import { z } from 'zod';

const prisma = new PrismaClient();

export const protectedRouter = router({
    authCallback: protectedProcedure.query(async () => {
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

    getFile: protectedProcedure
        .input(z.object({ key: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { user } = useUser();
            let userid = "";
            if (user) {
                userid = user.id;
            }
            const file = await prisma.file.findFirst({
                where: {
                    key: input.key,
                    userId: userid,
                },
            })

            if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

            return file
        }),


})

export type AppRouter = typeof protectedRouter

