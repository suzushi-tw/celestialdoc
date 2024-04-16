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
    filename: string
    language: string
    text: string
}

const notify = () => toast.success('File Sent !');

export function Creategist({ filename, language, text }: SendProps) {


    const [isPasswordVisible, setPasswordVisible] = useState(false)

    const [password, setPassword] = useState('')
    const [isDownloadEnabled, setDownloadEnabled] = useState(false)
    const [email, setEmail] = useState('')
    const [gistUrl, setGistUrl] = useState(process.env.NEXT_PUBLIC_BASE_URL)

    const handleSubmit = async () => {

        notify();
        try {
            const response = await axios.post('api/creategist', {

                filename,
                language,
                text
            })
            if (response.data.success) {
                setGistUrl(response.data.url)
            }

            // handle response here
        } catch (error) {
            // handle error here
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Gist</Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
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
                            value={gistUrl}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>


                <DialogFooter>
                    <DialogClose>
                        <Button onClick={handleSubmit}>Create</Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
