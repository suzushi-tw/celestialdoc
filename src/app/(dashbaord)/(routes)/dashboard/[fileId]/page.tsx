
import PdfRenderer from '@/components/PdfRenderer'
import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs'
import prisma from '@/lib/prisma';
import Pptrenderer from '@/components/Pptrenderer';

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

    if (file.name.endsWith('.pptx') || file.name.endsWith('.pptx') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
        return (
            <div className='flex-1 justify-between flex flex-col max-h-screen min-h-full overflow-hidden'>
                <div className='mx-auto w-full max-w-7xl grow lg:flex xl:px-2 max-h-3xl'>
                    {/* Left sidebar & main wrapper */}
                    <div className='flex-1 xl:flex'>
                        <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                            {/* Main area */}
                            <Pptrenderer url={file.url} fileId={file.id} filename={file.name} />
                        </div>
                    </div>

                    {/* <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0 max-h-[calc(100vh-3.5rem-20rem)] min-f-full'>

                </div> */}
                </div>
            </div>
        );
    }

    return (
        <div className='flex-1 justify-between flex flex-col max-h-screen min-h-full overflow-hidden'>
            <div className='mx-auto w-full max-w-7xl grow lg:flex xl:px-2 max-h-3xl'>
                {/* Left sidebar & main wrapper */}
                <div className='flex-1 xl:flex'>
                    <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                        {/* Main area */}
                        <PdfRenderer url={file.url} fileId={file.id} filename={file.name} />
                    </div>
                </div>

                {/* <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0 max-h-[calc(100vh-3.5rem-20rem)] min-f-full'>

                </div> */}
            </div>
        </div>
    )
}

export default Page