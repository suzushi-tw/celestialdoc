
import PdfRenderer from '@/components/PdfRenderer'
import { notFound, redirect } from 'next/navigation'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useUser } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs'

const prisma = new PrismaClient();

interface PageProps {
    params: {
        fileId: string
    }
}

const Page = async ({ params }: PageProps) => {
    const { fileId } = params
    const { userId } = auth();
   
    const file = await prisma.file.findFirst({
        where: {
            id: fileId,
            userId: userId,
        },
    })
    if (!file) {
        return;
    }

    return (
        <div className='flex-1 justify-between flex flex-col max-h-[calc(100vh-3.5rem-10rem)]'>
            <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
                {/* Left sidebar & main wrapper */}
                <div className='flex-1 xl:flex'>
                    <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                        {/* Main area */}
                        <PdfRenderer url={file.url} fileId={file.id} />
                    </div>
                </div>

                <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0 '>

                </div>
            </div>
        </div>
    )
}

export default Page