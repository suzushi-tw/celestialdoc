import { protectedRouter } from '@/server/routers'
import * as trpcNext from '@trpc/server/adapters/next'
import { createContext } from '@/server/context';
 
export default trpcNext.createNextApiHandler({
  router: protectedRouter,
  createContext: createContext,
});