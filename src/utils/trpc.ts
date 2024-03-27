import { AppRouter } from '@/server/routers/index'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>({})