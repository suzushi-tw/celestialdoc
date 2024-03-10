"use client"
import React from 'react'
import { File, Shield, Upload } from "lucide-react";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
function SideNave() {
    const menuList = [
        {
            id: 1,
            name: "Upload",
            icon: Upload,
            path: "/upload",
        },
        {
            id: 2,
            name: "Files",
            icon: File,
            path: "/files",
        },
        {
            id: 3,
            name: "Upgrade",
            icon: Shield,
            path: "/upgrade",
        },
    ];

    const [activeState, setActiveState] = useState(0);
    return (
        // <div className="shadow-sm border-r max-h-[calc(100vh-3.5rem-15rem)]">
        //     <div className="flex flex-col float-left w-full">
        //         {menuList.map((item) => (
        //             <button
        //                 key={item.id} // Using unique id as the key
        //                 className={`flex gap-4 p-2 px-0 hover:bg-gray-100 w-full text-gray-500 ${activeState === item.id ? "bg-blue-50 text-primary" : ""
        //                     }`}
        //                 onClick={() => setActiveState(item.id)}
        //             >
        //                 <item.icon />
        //                 {item.name}
        //             </button>
        //         ))}
        //     </div>
        // </div>
        <div className="w-40 flex-col gap-4 mt-8 hidden sm:flex">
            <Link href="/dashboard/files">
                <Button
                    variant={"link"}
                    className={clsx("flex gap-2", {
                        // "text-blue-500": pathname.includes("/dashboard/files"),
                    })}
                >
                    <FileIcon /> All Files
                </Button>
            </Link>

            <Link href="/dashboard/favorites">
                <Button
                    variant={"link"}
                    className={clsx("flex gap-2", {
                        // "text-blue-500": pathname.includes("/dashboard/favorites"),
                    })}
                >
                    <StarIcon /> Favorites
                </Button>
            </Link>

            <Link href="/dashboard/trash">
                <Button
                    variant={"link"}
                    className={clsx("flex gap-2", {
                        // "text-blue-500": pathname.includes("/dashboard/trash"),
                    })}
                >
                    <TrashIcon /> Trash
                </Button>
            </Link>
        </div>
    )
}

export default SideNave
