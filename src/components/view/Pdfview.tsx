'use client'
import {
    ChevronDown,
    ChevronUp,
    Loader2,
    RotateCw,
    Search,
    RotateCcwSquare,
    RotateCwSquare
} from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { useToast } from '@/components/ui/use-toast'

import { useResizeDetector } from 'react-resize-detector'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import SimpleBar from 'simplebar-react'
import PdfFullscreen from '@/components/PdfFullscreen'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from '@/components/ui/card'
import { DialogDemo } from '@/components/Sendandshare'
import axios from 'axios'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PdfRendererProps {
    url: string
    fileId: string
}
type File = {
    id: string;
    hasPassword: boolean;
    password: string;
    isDownloadEnabled: boolean;
    recipientEmail: string;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    Key: string;
    name: string;
    userId: string | null;
    fileId: string | null;
};


const Pdfview = ({ file }: { file: File }) => {
    const { toast } = useToast()

    const [numPages, setNumPages] = useState<number>()
    const [currPage, setCurrPage] = useState<number>(1)
    const [scale, setScale] = useState<number>(1)
    const [rotation, setRotation] = useState<number>(0)
    const [renderedScale, setRenderedScale] = useState<
        number | null
    >(null)
    const isLoading = renderedScale !== scale
    const CustomPageValidator = z.object({
        page: z
            .string()
            .refine(
                (num) => Number(num) > 0 && Number(num) <= numPages!
            ),
    })
    type TCustomPageValidator = z.infer<
        typeof CustomPageValidator
    >
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<TCustomPageValidator>({
        defaultValues: {
            page: '1',
        },
        resolver: zodResolver(CustomPageValidator),
    })
    const { width, ref } = useResizeDetector();
    const handlePageSubmit = ({
        page,
    }: TCustomPageValidator) => {
        setCurrPage(Number(page))
        setValue('page', String(page))
    }

    const handleDownload = async () => {
        try {
            const response = await axios.post('api/send', {
                File_key: file.Key
            })
        } catch (error) {
            console.error('Download failed:', error);
        }
    };


    return (

        <div className='w-full bg-white rounded-md shadow flex flex-col items-center '>
            <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2'>
                <div className='flex items-center gap-1.5'>
                    <p className='ml-6'>{file.name}</p>
                    {/* <Button
                        disabled={currPage <= 1}
                        onClick={() => {
                            setCurrPage((prev) =>
                                prev - 1 > 1 ? prev - 1 : 1
                            )
                            setValue('page', String(currPage - 1))
                        }}
                        variant='ghost'
                        aria-label='previous page'>
                        <ChevronDown className='h-4 w-4' />
                    </Button>

                    <div className='flex items-center gap-1.5'>
                        <Input
                            {...register('page')}
                            className={cn(
                                'w-12 h-8',
                                errors.page && 'focus-visible:ring-red-500'
                            )}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(handlePageSubmit)()
                                }
                            }}
                        />
                        <p className='text-zinc-700 text-sm space-x-1'>
                            <span>/</span>
                            <span>{numPages ?? 'x'}</span>
                        </p>
                    </div>

                    <Button
                        disabled={
                            numPages === undefined ||
                            currPage === numPages
                        }
                        onClick={() => {
                            setCurrPage((prev) =>
                                prev + 1 > numPages! ? numPages! : prev + 1
                            )
                            setValue('page', String(currPage + 1))
                        }}
                        variant='ghost'
                        aria-label='next page'>
                        <ChevronUp className='h-4 w-4' />
                    </Button> */}


                </div>

                <div className='space-x-2'>


                    {file.isDownloadEnabled && (
                        // <Button
                        //     onClick=
                        //     variant='ghost'
                        //     aria-label='Download'>
                        //     {/* your download icon */}
                        // </Button>
                        <Button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus-visible:ring-transparent"
                            onClick={handleDownload}>
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl">
                                Download
                            </span>
                        </Button>
                    )}

                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className='gap-1.5'
                                aria-label='zoom'
                                variant='ghost'>
                                <Search className='h-4 w-4' />
                                {scale * 100}%
                                <ChevronDown className='h-3 w-3 opacity-50' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onSelect={() => setScale(1)}>
                                100%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(1.5)}>
                                150%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(2)}>
                                200%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(2.5)}>
                                250%
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        onClick={() => setRotation((prev) => prev + 90)}
                        variant='ghost'
                        aria-label='rotate 90 degrees'>
                        <RotateCw className='h-4 w-4' />
                    </Button> */}
                    <Button
                        onClick={() => setRotation((prev) => prev - 90)}
                        variant='ghost'
                        aria-label='rotate 90 degrees'>
                        {/* <RotateCw className='h-4 w-4' /> */}
                        <RotateCcwSquare className='h-4 w-4' />
                    </Button>

                    <Button
                        onClick={() => setRotation((prev) => prev + 90)}
                        variant='ghost'
                        aria-label='rotate 90 degrees'>
                        {/* <RotateCw className='h-4 w-4' /> */}
                        <RotateCwSquare className='h-4 w-4' />
                    </Button>

                    <PdfFullscreen fileUrl={file.url} />
                </div>
            </div>

            <div className='flex-1 w-full max-h-[calc(100vh-10rem)]'>
                <SimpleBar
                    autoHide={false}
                    className='max-h-[calc(100vh-10rem)]'>
                    <div ref={ref}>
                        <Document
                            loading={
                                <div className='flex justify-center'>
                                    <Loader2 className='my-24 h-6 w-6 animate-spin' />
                                </div>
                            }
                            onLoadError={() => {
                                toast({
                                    title: 'Error loading PDF',
                                    description: 'Please try again later',
                                    variant: 'destructive',
                                })
                            }}
                            onLoadSuccess={({ numPages }) =>
                                setNumPages(numPages)
                            }
                            file={file.url}
                            className='max-h-full'>
                            {/* Modified: Dynamically render all pages based on numPages */}
                            <ScrollArea className='h-[calc(100vh-10rem)] '>
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        scale={scale}
                                        rotate={rotation}
                                        width={width ? width : 1}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                ))}
                            </ScrollArea>

                        </Document>
                    </div>
                </SimpleBar>
            </div>
        </div>

    )
}

export default Pdfview