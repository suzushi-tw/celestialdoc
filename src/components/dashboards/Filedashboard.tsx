'use client'

import { trpc } from '@/app/_trpc/client'
// import UploadButton from '@/components/UploadButton'
import {
    Car,
    Ghost,
    Loader2,
    MessageSquare,
    Plus,
    Trash,
} from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import React, { ChangeEvent, FormEventHandler } from 'react'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import { ReactNode } from "react";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Nav } from '@/components/Sidenav'
import {
    AlertCircle,
    Archive,
    ArchiveX,
    File,
    Inbox,
    MessagesSquare,
    PenBox,
    Search,
    Send,
    ShoppingCart,
    Trash2,
    Users2,
    UserCircle,
    BrainCircuit,
    LayoutDashboard,
    MessageCircle,
    User,
    StarIcon
} from "lucide-react"
import { useToast } from '@/components/ui/use-toast'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { toast } from '../ui/use-toast'
import { latestviewedfile } from '@/server/action'
import { PPTsvg, Wordsvg } from '@/lib/icon'
import { Filecardaction } from './Filecardaction'
import Image from 'next/image'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;



const Filesdashboard = () => {
    const [currentlyDeletingFile, setFile] = useState<string | null>(null);

    const utils = trpc.useContext();

    const [switchValue, setSwitchValue] = useState(false);

    const { data: files, isLoading } = trpc.getUserFiles.useQuery();

    const { mutate: deleteFile } = trpc.deleteFile.useMutation({
        onSuccess: () => {
            utils.getUserFiles.invalidate()
        },
        onMutate({ id }) {
            setFile(id);
        },
        onSettled() {
            setFile(null);
        }
    })


    const { toast } = useToast()
    const handlelatestviewed = async (fileId: string) => {
        await latestviewedfile(fileId);
        // 然後導航到新的頁面

    };

    const [isCollapsed, setIsCollapsed] = React.useState(false)

    return (
        <main className='mx-auto max-w-85rem md:p-10'>

            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel minSize={10}
                    maxSize={20} defaultSize={20} className='hidden sm:block'
                >
                    <Nav
                        isCollapsed={isCollapsed}
                        links={[
                            {
                                title: "Dashboard",
                                label: "",
                                icon: LayoutDashboard,
                                variant: "ghost",
                                href: "/dashboard"
                            },
                            {
                                title: "Files",
                                label: "",
                                icon: File,
                                variant: "default",
                                href: "/files"
                            },
                            {
                                title: "Gallery",
                                label: "",
                                icon: ImageIcon,
                                variant: "ghost",
                                href: "/album"
                            },
                            {
                                title: "Favorite",
                                label: "",
                                icon: StarIcon,
                                variant: "ghost",
                                href: "/favorite"
                            },
                            {
                                title: "Sent",
                                label: "",
                                icon: Send,
                                variant: "ghost",
                                href: "/sent"
                            },
                        ]}
                    />
                  


                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={80}>
                    <div className='mt-3 mx-6 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
                        <h1 className='mb-3 font-bold text-5xl text-gray-900'>
                            My Files:
                        </h1>

                        {/* <UploadButton isSubscribed={subscriptionPlan.isSubscribed} /> */}
                        {/* <Button onClick={handleClick}>
          Send email
        </Button> */}
                    </div>
                    <div className='mx-3'>
                        {/* display all user files */}
                        {
                            files && files?.length !== 0 ? (
                                <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
                                    {files
                                        .sort(
                                            (a, b) =>
                                                new Date(b.createdAt).getTime() -
                                                new Date(a.createdAt).getTime()
                                        )
                                        .map((file) => (
                                            <li
                                                key={file.id}
                                                className='col-span-1 divide-y  shadow transition hover:shadow-lg'>
                                                
                                                <Card className="w-full h-full">
                                                    <Link
                                                        href={`/dashboard/${file.id}`}
                                                        className='flex flex-col gap-2'
                                                        onClick={(event) => {
                                                            handlelatestviewed(file.id); // 更新最近查看的文件
                                                        }}>
                                                        <CardHeader>
                                                            <CardTitle>
                                                                <div className='flex justify-between items-center'>
                                                                    <h3 className='truncate text-lg font-medium text-zinc-900'>
                                                                        {file.name}
                                                                    </h3>
                                                                    <Filecardaction url={file.url} fileId={file.id} filename={file.name} favorite={file.favorite} />
                                                                </div>
                                                            </CardTitle>

                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className=' flex items-center justify-center overflow-hidden h-[200px]'>
                                                              
                                                                {file.name.endsWith('.pdf') ? (
                                                                    <Document
                                                                        file={file.url}
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
                                                                    >
                                                                        <Page pageNumber={1} height={100} width={200} />
                                                                    </Document>
                                                                ) : (file.name.endsWith('.docx') || file.name.endsWith('.doc')) ? (
                                                                    <div>
                                                                        <Wordsvg />
                                                                    </div>
                                                                ) : (file.name.endsWith('.pptx') || file.name.endsWith('.ppt')) ? (
                                                                    <div>
                                                                        <PPTsvg />
                                                                    </div>
                                                                ) : null}


                                                            </div>
                                                        </CardContent>
                                                    </Link>
                                                    <CardFooter className="flex justify-between">
                                                        {/* <Button variant="outline">Cancel</Button>
                      <Button>Deploy</Button> */}
                                                        <div className=' w-full  grid grid-cols-3 place-items-center pb-2 gap-6 text-xs text-zinc-500'>
                                                            <div className='flex items-center gap-2'>
                                                                <Plus className='h-4 w-4' />
                                                                {format(
                                                                    new Date(file.createdAt),
                                                                    'MMM yyyy'
                                                                )}
                                                            </div>

                                                            <div className='flex items-center gap-2'>
                                                                <MessageSquare className='h-4 w-4' />
                                                                mocked
                                                            </div>

                                                            <Button
                                                                onClick={() =>
                                                                    deleteFile({ id: file.id, key: file.key })
                                                                }
                                                                size='sm'
                                                                className='w-full'
                                                                variant='destructive'>
                                                                {currentlyDeletingFile === file.id ? (
                                                                    <Loader2 className='h-4 w-4 animate-spin' />
                                                                ) : (
                                                                    <Trash className='h-4 w-4' />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            </li>
                                        ))}
                                </ul>
                            ) : isLoading ? (
                                <Skeleton height={100} className='my-2' count={3} />
                            ) : (
                               
                                <div className='mt-3 flex flex-col items-center gap-2'>

                                    <Image alt='work image' width={200} height={200} src={"/working.png"} />
                                    <h3 className='font-semibold text-xl'>
                                        Pretty empty around here ...
                                    </h3>
                                    <p>Upload your first file </p>
                                </div>
                            )
                        }
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </main >
    )
}

export default Filesdashboard;