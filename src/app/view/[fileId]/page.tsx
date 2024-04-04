
import PdfRenderer from '@/components/PdfRenderer'
import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs'
import Pdfview from '@/components/view/Pdfview';
import prisma from '@/lib/prisma';
import { Filenotexist } from '@/components/view/Filenotexist';
import { Elsethenpdfviewer } from '@/components/view/Elsethenpdfviewer';

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
        return (
            <div className='flex-1 justify-between flex flex-col max-h-screen min-h-full overflow-hidden'>
                <div className='mx-auto w-full max-w-7xl grow lg:flex xl:px-2 max-h-3xl'>
                    {/* Left sidebar & main wrapper */}
                    <div className='flex-1 xl:flex'>
                        <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                            <Filenotexist />
                        </div>
                    </div>


                </div>
            </div>

        );
    }

    if (file.name.endsWith('.pptx') || file.name.endsWith('.pptx') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
        return (
            <div className='flex-1 justify-between flex flex-col max-h-screen min-h-full overflow-hidden'>
                <div className='mx-auto w-full mt-8 max-w-7xl grow lg:flex xl:px-2 max-h-3xl'>
                    {/* Left sidebar & main wrapper */}
                    <div className='flex-1 xl:flex'>
                        <div className='flex items-center justify-center px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                            {/* Main area */}
                            <Elsethenpdfviewer file={file} />
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
                        <Pdfview file={file} />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Page