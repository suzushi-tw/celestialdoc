
import PdfRenderer from '@/components/PdfRenderer'
import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs'
import Pdfview from '@/components/view/Pdfview';
import prisma from '@/lib/prisma';
import { Filenotexist } from '@/components/view/Filenotexist';
import { Elsethenpdfviewer } from '@/components/view/Elsethenpdfviewer';
import { Gistview } from '@/components/view/Gistview';

interface PageProps {
    params: {
        fileId: string
    }
}

const Page = async ({ params }: PageProps) => {
    const { fileId } = params
    const { userId } = auth();

    const Gist = await prisma.gist.findFirst({
        where: {
            id: fileId,
        },
    })
    if (!Gist) {
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

    return (
        <div className='flex-1 justify-between flex flex-col max-h-screen min-h-full overflow-hidden'>
            <div className='mx-auto w-full max-w-7xl grow lg:flex xl:px-2 max-h-3xl'>
                {/* Left sidebar & main wrapper */}
                <div className='flex-1 xl:flex'>
                    <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
                        {/* Main area */}
                        <Gistview filename={Gist.name} filelanguage={Gist.language} text={Gist.text} />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Page