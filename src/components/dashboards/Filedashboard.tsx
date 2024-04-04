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
                                href: "/multipdf"
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
                    {/* 
                    <Sidenavaccount
                        isCollapsed={isCollapsed}
                        isSubscribed={subscriptionPlan.isSubscribed}
                        links={[
                            {
                                title: "Account",
                                label: "",
                                icon: User,
                                variant: "ghost",
                                href: "/dashboard/billing"
                            },

                        ]}
                    /> */}


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
                                                {/* <Link
                    href={`/dashboard/${file.id}`}
                    className='flex flex-col gap-2'>
                    <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
                      <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' />
                      <div className='flex-1 truncate'>
                        <div className='flex items-center space-x-3'>
                          <h3 className='truncate text-lg font-medium text-zinc-900'>
                            {file.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link> */}

                                                {/* <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
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
                  </div> */}
                                                <Card className="w-full h-full">
                                                    <Link
                                                        href={`/dashboard/${file.id}`}
                                                        className='flex flex-col gap-2'
                                                        onClick={(event) => {
                                                            handlelatestviewed(file.id); // 更新最近查看的文件
                                                        }}>
                                                        <CardHeader>
                                                            <CardTitle>
                                                                <h3 className='truncate text-lg font-medium text-zinc-900'>
                                                                    {file.name}
                                                                </h3>
                                                            </CardTitle>

                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className=' flex items-center justify-center overflow-hidden h-[200px]'>
                                                                {/* {file.name.endsWith('.docx') ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                                                        <path fill="#2196f3" d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"></path>
                                                                        <path fill="#bbdefb" d="M40 13L30 13 30 3z"></path>
                                                                        <path fill="#1565c0" d="M30 13L40 23 40 13z"></path>
                                                                        <path fill="#e3f2fd" d="M15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"></path>
                                                                    </svg>
                                                                ) : file.name.endsWith('.pdf') ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 512 512"><path fill="#e11d48" d="M64 464h48v48H64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0h165.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V304h-48V160h-80c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16v384c0 8.8 7.2 16 16 16m112-112h32c30.9 0 56 25.1 56 56s-25.1 56-56 56h-16v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V368c0-8.8 7.2-16 16-16m32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-16v48zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-32c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16m32 128c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16h-16v96zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v48c0 8.8-7.2 16-16 16s-16-7.2-16-16v-64z" /></svg>

                                                                ) : null} */}
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
                                <div className='mt-16 flex flex-col items-center gap-2'>
                                    <Ghost className='h-8 w-8 text-zinc-800' />
                                    <h3 className='font-semibold text-xl'>
                                        Pretty empty around here
                                    </h3>
                                    <p>Let&apos;s upload your first PDF.</p>
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