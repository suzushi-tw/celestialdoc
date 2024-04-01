import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "../ui/card"
import { File, ListFilter } from "lucide-react"

export const Lastviewed = () => {

    return (
        <>

            <Tabs defaultValue="week" className="h-full">
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
                                Recently viewd files...
                            </CardDescription>
                        </CardHeader>
                        <CardContent>

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