'use client'

// import { uploadToS3 } from '@/lib/s3'
import { Inbox, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { uploadToS3 } from '@/lib/s3'
import { trpc } from '@/app/_trpc/client'
import axios from 'axios'
import { useUser } from '@clerk/nextjs';

function Uploadsection() {

    const [isUploading, setIsUploading] = useState(false)
    const [isCreatingChat, setIsCreatingChat] = useState(false)
    const router = useRouter()
    // const storage = getStorage(app)
    const { user } = useUser();

    const { mutate: startPolling } = trpc.getFile.useMutation(
        {
            onSuccess: (file) => {
                router.push(`/dashboard/${file.id}`)
            },
            retry: true,
            retryDelay: 500,
        }
    )





    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0]
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File too large (limit: 10MB)')
                return
            }

            try {
                setIsUploading(true)
                const metadata = {
                    contentType: file.type,
                }
                const data = await uploadToS3(acceptedFiles[0]);
                if (user) {
                    const response = await axios.post("/api/upload", {
                        file_key: data.file_key,
                        file_name: data.file_name,
                        userid: user.id,
                    });
                }



                startPolling({ key: data.file_key });
                // router.push(`/chat/${chatId}`)
            } catch (err) {
                toast.error('Something went wrong ...')
                console.log(err)
            } finally {
                setIsUploading(false)
                setIsCreatingChat(false)
            }
        },
    })
    return (
        <div>
            <div className="p-2 bg-white rounded-2xl w-full">
                <div
                    {...getRootProps({
                        className:
                            'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col hover:border-blue-300 focus:border-blue-300 focus:border-solid outline-none',
                    })}
                >
                    <input {...getInputProps()} />
                    {isUploading || isCreatingChat ? (
                        <>
                            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                            <p className="mt-2 text-sm text-slate-400">Uploading...</p>
                        </>
                    ) : (
                        <>
                            <Inbox className="w-10 h-10 text-blue-500" />
                            <p className="mt-2 text-sm text-slate-400">Drop your file here !</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Uploadsection
