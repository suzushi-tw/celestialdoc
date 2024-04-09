"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from "react"
import { Fileloadingsvg } from "@/lib/icon"

type File = {
    id: string;
    hasPassword: boolean;
    password: string;
    isDownloadEnabled: boolean;
    recipientEmail: string;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    Key: string;
    name: string;
    userId: string | null;
    fileId: string | null;
};

const notifydownload = () => toast.success('Downloading files ...', {
    duration: 5000
});

const passworderror = () => toast.error('Password error ...', {
    duration: 5000
});

export function Elsethenpdfviewer({ file }: { file: File }) {

    const [enteredPassword, setEnteredPassword] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(event.target.value);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [onpageload, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const storedIsPasswordCorrect = sessionStorage.getItem('isPasswordCorrect');
        if (storedIsPasswordCorrect) {
            setIsPasswordCorrect(JSON.parse(storedIsPasswordCorrect));
        }
        setIsLoading(false);
    }, []);

    const handlePasswordCheck = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            console.log("fetching hashed")
            // Make an API call to your server to verify the password
            const response = await axios.post('/view/api/hashed', {
                enteredPassword: enteredPassword,
                fileId: file.id, // Assuming you need the file ID to identify the correct hash to compare against
            });

            if (response.data.ispasswordcorrect) {
                setIsPasswordCorrect(true);
                setPasswordError(false);
                // Optionally, proceed with the download or any other action
            } else {
                setPasswordError(true);
                passworderror();
            }
        } catch (error) {
            console.error('Password verification failed:', error);
            setPasswordError(true);
            passworderror();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownload = async () => {
        notifydownload();
        try {

            const response = await axios.post('api/download', {
                File_key: file.Key
            })
            const presignedUrl = response.data.url; // Adjust this based on your actual response structure

            const presignedresponse = await fetch(presignedUrl);
            const blob = await presignedresponse.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name); // Specify the filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };


    if (onpageload) {
        return (
            <div className='flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="#000000"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="#000000" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="#000000" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="#000000" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="#000000" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="#000000" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="#000000" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="#000000" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle></svg>
            </div>
        )
    }
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">You have a new file !</CardTitle>
                <CardDescription>
                    {file.name}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="items-center justify-center">
                    {/* <Image alt="not-found" height={200} width={100} src={"/hikkoshi2_l.png"} quality={100} /> */}
                </div>
                <div className="grid gap-4">
                    <Toaster />
                    <div className=" gap-2 flex items-center justify-center">
                        <Image alt="not-found" height={600} width={300} src={"/hikkoshi_l.png"} quality={100} />
                    </div>
                    <div className="grid gap-2">
                        {file.hasPassword && !isPasswordCorrect ? (
                            <form onSubmit={handlePasswordCheck} style={{ display: 'contents' }}>
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required value={enteredPassword} onChange={handlePasswordChange} />
                                {passwordError && <p style={{ transition: 'opacity 0.5s' }} className="text-red-600">Password is incorrect</p>}
                                <Button type="submit" className="w-full">
                                {isSubmitting ? <Fileloadingsvg /> : 'Submit Password'}
                                </Button>
                            </form>
                        ) : (
                            <Button type="submit" onClick={handleDownload} className="w-full">
                                Download
                            </Button>
                        )}
                    </div>
                    <Link href="/">
                        <Button type="submit" className="w-full">
                            Go to Homepage ...
                        </Button>
                    </Link>

                    <Link href={"/dashboard"}>
                        <Button variant="outline" className="w-full">
                            Login ...
                        </Button>
                    </Link>

                </div>
                {/* <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline">
                        Sign up
                    </Link>
                </div> */}
            </CardContent>
        </Card>
    )
}
