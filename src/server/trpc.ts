import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { type Context } from './context'

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape
    }
})

// check if the user is signed in, otherwise throw an UNAUTHORIZED code
const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.auth.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next({
        ctx: {
            auth: ctx.auth,
        },
    })
})

export const router = t.router

export const publicProcedure = t.procedure

// export this procedure to be used anywhere in your application
export const protectedProcedure = t.procedure.use(isAuthed)