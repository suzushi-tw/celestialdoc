
import PdfRenderer from '@/components/PdfRenderer'
import { useUser } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs'
import Pdfview from '@/components/view/Pdfview';

const prisma = new PrismaClient();

interface PageProps {
    params: {
        fileId: string
    }
}

const Page = async ({ params }: PageProps) => {
    const { fileId } = params
    const { userId } = auth();

    const file = await prisma.send.findFirst({
        where: {
            id: fileId,
        },
    })
    if (!file) {
        return;
    }

    return (
        <div className='flex-1 justify-between flex flex-col max-h-screen min-h-full overflow-hidden'>
            <div className='mx-auto w-full max-w-7xl grow lg:flex xl:px-2 max-h-3xl'>
                {/* Left sidebar & main wrapper */}
                <div className='flex-1 xl:flex'>
                    <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                        {/* Main area */}
                        <Pdfview file={file} />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Page