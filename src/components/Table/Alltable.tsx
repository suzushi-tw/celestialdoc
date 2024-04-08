"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { trpc } from '@/app/_trpc/client'
import { Switch } from "../ui/switch"
import { changepasswordstate, changedownloadstate, Deletesent } from "@/server/action"
import { useState } from "react"
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
import { not } from "drizzle-orm"
import { SendpdfDialog } from "./Sendpdfdialogue"
import { SendfileDialog } from "./Sendfiledialogue"
import { send } from "process"

const notify = () => toast.success('Successfully Updated !');
const notifydelete = () => toast.success("Deleting !");

export type RecentlySent = {
    id: string
    password: string
    url: string
    name: string
    userId: string | null
    createdAt: string
    updatedAt: string
    hasPassword: boolean
    isDownloadEnabled: boolean
    recipientEmail: string
    fileId: string | null
}

const data: RecentlySent[] = [

]


export const columns: ColumnDef<RecentlySent>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
        enableHiding: true,

    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "recipientEmail",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("recipientEmail")}</div>,
    },
    {
        accessorKey: "isDownloadEnabled",
        header: "Download",
        cell: ({ row }) => {
            let isDownloadEnabled = Boolean(row.getValue("isDownloadEnabled"));
            const sendid = String(row.getValue("id"));
            const toggleDownload = async () => {
                notify();
                isDownloadEnabled = !isDownloadEnabled;
                await changedownloadstate(isDownloadEnabled, sendid);
            }
            return <div>

                {isDownloadEnabled ? (
                    <Select onValueChange={toggleDownload}>
                        <SelectTrigger className=" focus-visible:ring-transparent">
                            <SelectValue placeholder="On" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Download</SelectLabel>
                                <SelectItem value="on">On</SelectItem>
                                <SelectItem value="off">Off</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                ) : (
                    <Select onValueChange={toggleDownload}>
                        <SelectTrigger className=" focus-visible:ring-transparent">
                            <SelectValue placeholder="Off" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Download</SelectLabel>
                                <SelectItem value="on">On</SelectItem>
                                <SelectItem value="off">Off</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            </div>
        },
    },
    {
        accessorKey: "hasPassword",
        header: "Password",
        cell: ({ row }) => {
            let hasPassword = Boolean(row.getValue("hasPassword"));

            const sendid = String(row.getValue("id"));
            const togglePassword = async () => {
                notify();
                hasPassword = !hasPassword;
                await changepasswordstate(hasPassword, sendid);
            }
            // // return <div><Switch checked={hasPassword} onCheckedChange={togglePassword} /></div>
            // if (hasPassword) {
            //     return <div><Switch checked={hasPassword} onCheckedChange={togglePassword} /></div>
            // } else {

            //     return <div><Switch checked={hasPassword} onCheckedChange={togglePassword} /></div>
            // }
            return <div>

                {hasPassword ? (
                    <Select onValueChange={togglePassword}>
                        <SelectTrigger className=" focus-visible:ring-transparent">
                            <SelectValue placeholder="On" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Password</SelectLabel>
                                <SelectItem value="on">On</SelectItem>
                                <SelectItem value="off">Off</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                ) : (
                    <Select onValueChange={togglePassword}>
                        <SelectTrigger className=" focus-visible:ring-transparent">
                            <SelectValue placeholder="Off" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Password</SelectLabel>
                                <SelectItem value="on">On</SelectItem>
                                <SelectItem value="off">Off</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            </div>
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return <div>{date.toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const sendid = String(row.getValue("id"));
            const filename = String(row.getValue("name"));
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="text-red-600"
                            onClick={() => {
                                Deletesent(sendid);
                                notifydelete();
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            {filename.endsWith('.pdf') ? (
                                <SendpdfDialog fileId={sendid} />
                            ) : (
                                <SendfileDialog fileId={sendid} />
                            )}
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem></DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


export function Alltable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({ id: false, })
    const [rowSelection, setRowSelection] = React.useState({})

    const { data: recentlySent } = trpc.getSent.useQuery();

    console.log(recentlySent);
    const table = useReactTable({
        data: recentlySent || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },

    })

    return (
        <div className="w-full">
            <div className="flex items-center pb-4 pt-1">
                <Toaster />
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("recipientEmail")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("recipientEmail")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
