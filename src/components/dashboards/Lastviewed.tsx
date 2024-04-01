import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "../ui/card"
import { File, ListFilter } from "lucide-react"
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


export const Lastviewed = () => {

    const { data: recentlyViewedFiles, isLoading } = trpc.getRecentFiles.useQuery();

    return (
        <>

            <Tabs defaultValue="files" className="h-full">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="files">Files</TabsTrigger>
                        <TabsTrigger value="album">Album</TabsTrigger>

                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 gap-1 text-sm"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">Filter</span>
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
                        </DropdownMenu>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 text-sm"
                        >
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">Export</span>
                        </Button>
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
                                            <TableRow key={file.id}>
                                                <TableCell className="font-medium truncate max-w-32">{file.name}</TableCell>
                                                <TableCell className="text-right">{new Date(file.updatedAt).toLocaleDateString()}</TableCell>
                                            </TableRow>
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
                                Recent viewed Album...
                            </CardDescription>
                        </CardHeader>
                        <CardContent>

                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}