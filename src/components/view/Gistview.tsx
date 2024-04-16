import Link from "next/link"

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
import Image from "next/image"
import { StringOrTemplateHeader } from "@tanstack/react-table"
import { ScrollArea } from "../ui/scroll-area"
import { Markdown } from "@lobehub/ui"
interface Gistviewprop {
    filename: string
    filelanguage: string
    text: string
}

export function Gistview({ filename, filelanguage, text }: Gistviewprop) {
    return (
        <Card className="mx-auto max-w-5xl w-full">
            <CardHeader>
                <CardTitle className="text-2xl">{filename}</CardTitle>
                {/* <CardDescription>
                    The file you are looking for has being removed or deleted by the owner !
                </CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-2">


                <div className="space-y-1 mt-3">
                    {/* <Label htmlFor="message">Preview</Label> */}
                    {/* <StoryBook levaStore={store}> */}
                    <ScrollArea className="h-[calc(100vh-3.5rem-15rem)]">
                        <Markdown >{`\`\`\`${filelanguage}\n${text}\n\`\`\``}</Markdown>
                    </ScrollArea>

                    {/* </StoryBook> */}
                </div>

                <div className="items-center justify-center">
                    {/* <Image alt="not-found" height={200} width={100} src={"/hikkoshi2_l.png"} quality={100} /> */}
                </div>
                
            </CardContent>
            <CardFooter>
                <Button>
                    <Link href="/gist">
                    Create your own Gist
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
