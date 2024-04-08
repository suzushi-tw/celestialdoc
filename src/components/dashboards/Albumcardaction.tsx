'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Favoritesvg, Notfavoritesvg } from "@/lib/icon"
import { Togglefavoritealbume } from "@/server/action"

interface SendProps {
    url: string
    fileId: string
    filename: string
    favorite: boolean
}

const notify = () => toast.success('Downloading files !');

export function Albumcardaction({ url, fileId, filename, favorite }: SendProps) {

    const [favoritestate, setFavorite] = useState(favorite);

    const toggleFavorite = () => {
        // 更新狀態
        Togglefavoritealbume(fileId, favoritestate)
        setFavorite(!favoritestate);
        
        // 更新資料庫...
    };


    const handleDownload = async () => {
        notify();
        try {
            const presignedresponse = await fetch(url);
            const blob = await presignedresponse.blob();

            const blobUrl = window.URL.createObjectURL(blob); // 修改此行
            const link = document.createElement('a');
            link.href = blobUrl; // 修改此行
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="  focus-visible:ring-transparent">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={toggleFavorite}
                >
                    Favorite   {favoritestate ? <Favoritesvg /> : <Notfavoritesvg />}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDownload}>Download</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
