'use client'


import {
  Car,
  Ghost,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
} from 'lucide-react'

import Link from 'next/link'

import { Button } from './ui/button'
import { useState, useEffect } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Input } from './ui/input'
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
import { Nav } from './Sidenav'

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
  StarIcon, TrashIcon
} from "lucide-react"





const Dashboard = () => {
 

  


  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <main className='mx-auto max-w-85rem md:p-10 max-h-[calc(100vh-3.5rem-20rem)] min-h-full'>
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
                variant: "default",
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
                title: "Favorite",
                label: "",
                icon: StarIcon,
                variant: "ghost",
                href: "/multipdf"
              },
              {
                title: "Deleted",
                label: "",
                icon: TrashIcon,
                variant: "ghost",
                href: "/mindmap"
              },
             
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div className='max-w-6xl mt-3 mx-6 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
            <h1 className='mb-3 font-bold text-lg text-gray-900 sm:text-5xl'>
              Dashboard:
            </h1>

            {/* <Button onClick={handleClick}>
          Send email
        </Button> */}
          </div>
          <div className='max-w-5xl h-60 mt-8 mx-auto flex flex-col w-full items-center justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
           
          </div>
          <div className='mt-8 mx-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
            
          </div>
          {/* display all user files */}

        </ResizablePanel>
      </ResizablePanelGroup>

    </main >
  )
}

export default Dashboard
