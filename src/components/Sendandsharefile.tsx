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
import { Switch } from "./ui/switch"
import { useState } from "react"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

interface SendProps {
    url: string
    fileId: string
}

const notify = () => toast.success('File Sent !');

export function SendandsharefileDialog({ url, fileId }: SendProps) {

   
    const [isPasswordVisible, setPasswordVisible] = useState(false)

    const [password, setPassword] = useState('')
    const [isDownloadEnabled, setDownloadEnabled] = useState(true)
    const [email, setEmail] = useState('')

    const handleSubmit = async () => {
       
        notify();
        try {
            const response = await axios.post('api/send', {
                isPasswordVisible,
                password,
                isDownloadEnabled,
                email,
                fileId
            })

            // handle response here
        } catch (error) {
            // handle error here
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus-visible:ring-transparent">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl">
                        Send or share
                    </span>
                </button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {/* <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
               
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div> */}
                <DialogHeader>
                    <DialogTitle>Send</DialogTitle>
                    <DialogDescription>
                        Office documents does not support webview when sharing through links !!!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">Enable password</Label>
                        <Switch id="password" defaultChecked={false} onCheckedChange={setPasswordVisible} />

                    </div>
                    {isPasswordVisible && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input id="password" className="col-span-3" placeholder="password ..."
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="download" className="text-right">Download</Label>
                        <Switch id="download" defaultChecked={true}  disabled aria-readonly/>

                    </div>
                    {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="name"
                            placeholder="password ..."
                            className="col-span-3"
                        />
                    </div> */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="username"
                            placeholder="email..."
                            className="col-span-3"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={handleSubmit}>Send</Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
