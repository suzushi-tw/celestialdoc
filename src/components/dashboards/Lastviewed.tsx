import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "../ui/card"
import { File, ListFilter, Send } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption
} from "@/components/ui/table"
import { trpc } from '@/app/_trpc/client'
import { Skeleton } from "@/components/ui/skeleton"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"


export const Lastviewed = () => {

    const { data: recentlyViewedFiles, isLoading } = trpc.getRecentFiles.useQuery();

    const { data: recentlyViewedAlbum } = trpc.getRecentAlbum.useQuery();

    const { data: recentlySent } = trpc.getRecentSent.useQuery();

    return (
        <>

            <Tabs defaultValue="files" className="h-full min-h-full">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="files">Files</TabsTrigger>
                        <TabsTrigger value="album">Album</TabsTrigger>

                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 gap-1 text-sm"
                                >
                                    <Send className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">Last Sent</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Fulfilled
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Declined
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Refunded
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                        <Drawer>
                            <DrawerTrigger asChild>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 gap-1 text-sm"
                                >
                                    <Send className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">Last Sent</span>
                                </Button>

                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full max-w-3xl ">
                                    <DrawerHeader>
                                        <DrawerTitle>Sent</DrawerTitle>
                                        <DrawerDescription>Previously Sent File...</DrawerDescription>
                                    </DrawerHeader>
                                    <div className="p-4 pb-0">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead >File Name</TableHead>
                                                        {/* <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead> */}
                                                        <TableHead>To</TableHead>
                                                        <TableHead className="text-right md:block hidden">Date</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {isLoading ? (
                                                        <TableRow>
                                                            <TableCell colSpan={2}><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        recentlySent?.map((file) => (
                                                            <TableRow key={file.id}>
                                                                <TableCell className="font-medium truncate max-w-32">{file.name}</TableCell>
                                                                <TableCell className="">{file.recipientEmail}</TableCell>
                                                                <TableCell className="text-right md:block hidden">{new Date(file.updatedAt).toLocaleDateString()}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    )}
                                                </TableBody>

                                            </Table>
                                        </div>
                                    </div>
                                    <DrawerFooter>

                                        <Link href={"/sent"}>
                                            <Button className="w-full">Go to Sent ...</Button>
                                        </Link>
                                        <DrawerClose asChild>
                                            <Button variant="outline">Close</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>
                        {/* <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 text-sm"
                        >
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">Export</span>
                        </Button> */}
                    </div>
                </div>
                <TabsContent value="files">
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Files</CardTitle>
                            <CardDescription>
                                Recently viewed files...
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead >File Name</TableHead>
                                        {/* <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead> */}
                                        <TableHead className="text-right">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={2}><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
                                        </TableRow>
                                    ) : (
                                        recentlyViewedFiles?.map((file) => (
                                            <>
                                                <Link href={`/dashboard/${file.id}`}>
                                                    <TableRow key={file.id}>
                                                        <TableCell className="font-medium truncate max-w-32">{file.name}</TableCell>
                                                        <TableCell className="text-right">{new Date(file.updatedAt).toLocaleDateString()}</TableCell>
                                                    </TableRow>
                                                </Link>
                                            </>


                                        ))
                                    )}
                                </TableBody>

                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="album">
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Album</CardTitle>
                            <CardDescription>
                                Recently viewed Album...
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead >File Name</TableHead>
                                        {/* <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead> */}
                                        <TableHead className="text-right">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={2}><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
                                        </TableRow>
                                    ) : (
                                        recentlyViewedAlbum?.map((file) => (
                                            <>
                                                <Link href={`/album`}>
                                                    <TableRow key={file.id}>
                                                        <TableCell className="font-medium truncate max-w-32">{file.name}</TableCell>
                                                        <TableCell className="text-right">{new Date(file.updatedAt).toLocaleDateString()}</TableCell>
                                                    </TableRow>
                                                </Link>
                                            </>

                                        ))
                                    )}
                                </TableBody>

                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}