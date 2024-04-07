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
import { TabsList, TabsContent, Tabs, TabsTrigger } from '../ui/tabs'
import Image from 'next/image'
import { Favoritealbumtable } from '../Table/Favoritealbumtable'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;



const Favoritedashboard = () => {
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
                                variant: "ghost",
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
                                variant: "default",
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
                            Favorite files :
                        </h1>

                        {/* <UploadButton isSubscribed={subscriptionPlan.isSubscribed} /> */}
                        {/* <Button onClick={handleClick}>
          Send email
        </Button> */}
                    </div>
                    <div className='mx-3 mt-3'>
                        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                            <Tabs defaultValue="files">
                                <div className="flex items-center">
                                    <TabsList>
                                        <TabsTrigger value="files">Files</TabsTrigger>
                                        <TabsTrigger value="gallery">Gallery</TabsTrigger>
                                        {/* <TabsTrigger value="draft">Draft</TabsTrigger>
                                        <TabsTrigger value="archived" className="hidden sm:flex">
                                            Archived
                                        </TabsTrigger> */}
                                    </TabsList>
                                    {/* <div className="ml-auto flex items-center gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                                    <ListFilter className="h-3.5 w-3.5" />
                                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                        Filter
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuCheckboxItem checked>
                                                    Active
                                                </DropdownMenuCheckboxItem>
                                                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                                <DropdownMenuCheckboxItem>
                                                    Archived
                                                </DropdownMenuCheckboxItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Button size="sm" variant="outline" className="h-8 gap-1">
                                            <File className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Export
                                            </span>
                                        </Button>
                                        <Button size="sm" className="h-8 gap-1">
                                            <PlusCircle className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Add Product
                                            </span>
                                        </Button>
                                    </div> */}
                                </div>
                                <TabsContent value="files">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Files</CardTitle>
                                            <CardDescription>
                                                All of your favorite files ...
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                           
                                            <Favoritealbumtable />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="gallery">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Gallery</CardTitle>
                                            <CardDescription>
                                                All of your favorite image and video ...
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='mt-3 flex flex-col items-center gap-2'>

                                                <Image alt='work image' width={200} height={200} src={"/working.png"} />
                                                <h3 className='font-semibold text-xl'>
                                                    This page is under construction
                                                </h3>
                                                <p>Soon you can generate links to share directly</p>
                                            </div>

                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </main>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </main >
    )
}

export default Favoritedashboard;