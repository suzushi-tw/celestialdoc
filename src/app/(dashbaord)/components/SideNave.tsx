"use client"
import React from 'react'
import { File, Shield, Upload } from "lucide-react";
import { useState } from 'react';
import Image from 'next/image';
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
        <div className="shadow-sm border-r h-full">
            <div className="p-5 border-b">
                {/* <Image src="/logo.svg" width={150} height={100} /> */}
            </div>
            <div className="flex flex-col float-left w-full">
                {menuList.map((item) => (
                    <button
                        key={item.id} // Using unique id as the key
                        className={`flex gap-4 p-2 px-0 hover:bg-gray-100 w-full text-gray-500 ${activeState === item.id ? "bg-blue-50 text-primary" : ""
                            }`}
                        onClick={() => setActiveState(item.id)}
                    >
                        <item.icon />
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SideNave
