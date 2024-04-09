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
    StarIcon,
    MoreHorizontal
} from "lucide-react"
import { useToast } from '@/components/ui/use-toast'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { toast } from '../ui/use-toast'
// import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Image, ImageGallery } from '@lobehub/ui';
import { Filecardaction } from './Filecardaction'
import { Gallerysvg } from '@/lib/icon'
import { Albumcardaction } from './Albumcardaction'
import NextImage from 'next/image'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;



const Albumdashboard = () => {
    const [currentlyDeletingFile, setFile] = useState<string | null>(null);

    const utils = trpc.useContext();

    const [switchValue, setSwitchValue] = useState(false);

    const { data: files, isLoading } = trpc.getUserAlbum.useQuery();



    const { mutate: deleteFile } = trpc.deleteAlbum.useMutation({
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
                                variant: "ghost",
                                href: "/files"
                            },
                            {
                                title: "Gallery",
                                label: "",
                                icon: ImageIcon,
                                variant: "default",
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
                            Gallery :
                        </h1>

                        {/* <UploadButton isSubscribed={subscriptionPlan.isSubscribed} /> */}
                        {/* <Button onClick={handleClick}>
          Send email
        </Button> */}
                    </div>
                    <div className='mx-3'>
                        <ImageGallery>
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

                                                        <CardHeader>
                                                            <CardTitle>
                                                                <div className='flex justify-between items-center'>
                                                                    <h3 className='truncate text-lg font-medium text-zinc-900 '>
                                                                        {file.name}
                                                                    </h3>
                                                                    <Albumcardaction url={file.url} fileId={file.id} filename={file.name} favorite={file.favorite} />
                                                                    {/* <Filecardaction url={file.url} fileId={file.id} filename={file.name} favorite={file.favorite}/> */}
                                                                </div>
                                                            </CardTitle>

                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className=' flex items-center justify-center overflow-hidden h-[200px]'>
                                                                <Image alt={file.name} width="200" height="100" src={file.url} />

                                                            </div>
                                                            {/* <Dialog>
                                                            <DialogTrigger asChild>
                                                                <div className=' flex items-center justify-center overflow-hidden h-[200px]'>
                                                                    <Image alt={file.name} width="200" height="100" src={file.url} />

                                                                </div>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-7xl w-full h-2/3">
                                                                <DialogHeader>
                                                                    <DialogTitle>Edit profile</DialogTitle>
                                                                    <DialogDescription>
                                                                        Make changes to your profile here. Click save when youre done.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className=' flex items-center justify-center overflow-hidden h-full w-full'>
                                                                    <Image alt={file.name} width={window.innerWidth *0.5} height={window.innerHeight * 0.8 } 
                                                                    src={file.url} quality={100} className='objectfit-contain'/>
                                                                </div>
                                                                <DialogFooter>
                                                                    <Button type="submit">Save changes</Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog> */}
                                                        </CardContent>

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

                                                                    <div className='h-4 w-4'>
                                                                        <Gallerysvg />
                                                                    </div>
                                                                    Gallery
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
                                    <div className='mt-3 flex flex-col items-center gap-2 '>

                                        <NextImage alt='work image' width={200} height={200} src={"/working.png"} />
                                        <h3 className='font-semibold text-xl'>
                                            Pretty empty around here ...
                                        </h3>
                                        <p>Upload your first file </p>
                                    </div>
                                )
                            }
                        </ImageGallery>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </main >
    )
}

export default Albumdashboard