import { TRPCError, initTRPC } from '@trpc/server'
import { auth } from '@clerk/nextjs';

const t = initTRPC.create()
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
  const { userId } = auth();

  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ctx: {
      userId: userId,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
