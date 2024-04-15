"use client";
import { LineText } from "@/components/LineText";
import { motion } from "framer-motion";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    ActionIcon,
    ChatInputActionBar,
    ChatInputArea,
    ChatSendButton,
    TokenTag,
} from '@lobehub/ui';
import { Eraser, Languages } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';
import { Snippet, SnippetProps, StoryBook, useControls, useCreateStore, Markdown, MarkdownProps } from '@lobehub/ui';

import { Textarea } from "../ui/textarea";
import React, { Children, useEffect, useState } from 'react';
import { ScrollArea } from "../ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import toast, { Toaster } from 'react-hot-toast';
import { Creategist } from "../creategist";

const updatelanguage = () => toast.success('Updated !');

const Gistdashboard = () => {

    const store = useCreateStore();
    const [text, setText] = useState(''); // 將預設值設定為 'pnpm install @lobehub/ui'

    // const control: SnippetProps | any = useControls(
    //     {

    //         copyable: true,
    //         language: 'sh',
    //         spotlight: false,
    //         type: {
    //             options: ['ghost', 'block'],
    //             value: 'ghost',
    //         },
    //     },
    //     { store },
    // );
    // console.log(text)


    const [options, setOptions] = useState<MarkdownProps | any>({
        allowHtml: true,
        children: {
            rows: true,
            value: text,
        },
        fullFeaturedCodeBlock: true,
    });

    useEffect(() => {
        setOptions((prevOptions: MarkdownProps | any) => ({
            ...prevOptions,
            children: {
                ...prevOptions.children,
                value: text,
            },
        }));
    }, [text]);

    const [language, setLanguage] = useState('ts'); // 預設語言為 python
    const [filename, setFilename] = useState('');

    const handlesyntax = (selectedLanguage: string) => {
        updatelanguage();
        setLanguage(selectedLanguage);
    }
    return (
        <>

            <div className="max-h-[calc(100vh-3.5rem)]">
                <Toaster />
                <div
                    className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] z-[-1]"
                ></div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1],
                        scale: {
                            type: "tween", // tween spring
                            // damping: 10, // if spring
                            // stiffness: 50, // if spring
                            // restDelta: 0.001, // if spring
                        },
                    }}
                >
                    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 pt-16 md:pt-24 text-center">
                        <h1 className="text-6xl">
                            Send <LineText>Gist</LineText> fast
                        </h1>
                        {/* <p className="mx-auto mt-6 max-w-2xl text-2xl tracking-tight text-slate-700 dark:text-slate-400">
                        An open source Google drive / Docsend alternative to store your files and share with others !
                    </p> */}
                    </section>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-6 justify-center items-center">
                        {/* <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                        Join now
                    </button> */}

                        {/* <Link href={"https://github.com/suzushi-tw/celestialdoc"} className="w-40 inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        Self Host
                    </Link>
                    <Link href={"/sign-in"}>
                        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                            Signup
                        </button>
                    </Link> */}

                        <Tabs defaultValue="snippet" className="w-full max-w-5xl max-h-[calc(100vh-3.5rem)]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="snippet">Snippet</TabsTrigger>
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                            </TabsList>
                            <TabsContent value="snippet" className="h-[calc(100vh-3.5rem-20rem)]">
                                <Card>
                                    {/* <CardHeader>
                                    <CardTitle>Account</CardTitle>
                                    <CardDescription>
                                        Make changes to your account here. Click save when you are done.
                                    </CardDescription>
                                </CardHeader> */}
                                    <CardContent className="space-y-2">
                                        {/* <div className="space-y-1">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" defaultValue="Pedro Duarte" />
                                    </div> */}
                                        <div className="space-y-1 mt-3">
                                            <Label htmlFor="message">Your message</Label>
                                            <Textarea
                                                placeholder="Type your message here."
                                                id="message"
                                                className="h-[calc(100vh-3.5rem-25rem)]"
                                                value={text} // Pass the current text state as the value
                                                onChange={(e) => setText(e.target.value)} // Update the text state on change
                                            />
                                        </div>
                                        {/* <Label htmlFor="message">Your message</Label>
                                    <Textarea placeholder="Type your message here." id="message" /> */}
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Input type="filename" placeholder="Filename..." className="w-1/2" value={filename} onChange={(e) => setFilename(e.target.value)}/>
                                        <Select onValueChange={(value) => handlesyntax(value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Language</SelectLabel>
                                                    <SelectItem value="ts">JS/TS</SelectItem>
                                                    <SelectItem value="c">C/C++</SelectItem>
                                                    <SelectItem value="python">Python</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {/* <Button>Save changes</Button> */}
                                        <Creategist filename={filename}/>
                                    </CardFooter>

                                </Card>
                            </TabsContent>
                            <TabsContent value="preview" className="h-[calc(100vh-3.5rem-20rem)]">
                                <Card>
                                    <CardContent className="space-y-2">

                                        <div className="space-y-1 mt-3">
                                            <Label htmlFor="message">Preview</Label>
                                            {/* <StoryBook levaStore={store}> */}
                                            <ScrollArea className="h-[calc(100vh-3.5rem-25rem)]">
                                                {text ? <Markdown >{`\`\`\`${language}\n${text}\n\`\`\``}</Markdown> : <p>No text to preview</p>}
                                            </ScrollArea>

                                            {/* </StoryBook> */}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Input type="filename" placeholder="Filename..." className="w-1/2" value={filename} onChange={(e) => setFilename(e.target.value)}/>
                                        <Select onValueChange={(value) => handlesyntax(value)}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Language</SelectLabel>
                                                    <SelectItem value="ts">JS/TS</SelectItem>
                                                    <SelectItem value="c">C/C++</SelectItem>
                                                    <SelectItem value="python">Python</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {/* <Button>Save changes</Button> */}
                                        <Creategist filename={filename}/>
                                    </CardFooter>

                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                </motion.div>
            </div>



        </>
    );
};

export default Gistdashboard;