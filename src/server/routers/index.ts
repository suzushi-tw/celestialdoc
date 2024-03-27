import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../trpc'
import { useUser } from '@clerk/nextjs';
import db from '@/lib/db/index'
import { users } from '@/lib/db/schema';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export const protectedRouter = router({
    hello: protectedProcedure.query(({ ctx }) => {
        return {
            secret: `${ctx.auth?.userId} is using a protected procedure`
        }
    }),

    authcallback: protectedProcedure.query(async ({ ctx }) => {

        const { user } = useUser();
        let userRecord; // Declare userRecord here to avoid TS2448
        if (user) {
            const userid = user.id;
            const userEmail = user.primaryEmailAddress;
            if (!userid || !userEmail) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            // Corrected variable name from userId to userid
            const dbUser = await prisma.user.findFirst({
                where: {
                    id: user.id,
                },
            });

            // Assuming you want to insert a new user if not found
            if (!userRecord && user.primaryEmailAddress!=null) {
                await prisma.user.create({
                    data: {
                        id: user.id,
                        email: user.primaryEmailAddress.emailAddress,
                    },
                });
            }
        }
    })
})