'use server'
import prisma from "@/lib/prisma"
import { auth } from '@clerk/nextjs';
import { stat } from "fs";

export async function favoritefile(fileId: string, isfavorited: boolean) {



}

export async function latestviewedfile(fileId: string) {
    const {userId}=auth();
    await prisma.file.update({
        where: { 
            id: fileId,
            userId: userId,
        },
        data: { updatedAt: new Date() },
    });
}

export async function changepasswordstate(hasPassword: boolean, sendid: string) {
    const {userId}=auth();
    if (!sendid) {
        throw new Error('fileId is required');
    }
    console.log("theswitch state"+hasPassword+" "+sendid);
    await prisma.send.update({
        where: { 
            id: sendid,
            userId: userId,
        },
        data: { hasPassword: hasPassword },
    });
}


export async function changedownloadstate(hasDownload: boolean, sendid: string) {
    const {userId}=auth();
    if (!sendid) {
        throw new Error('fileId is required');
    }
    console.log("theswitch state"+hasDownload+" "+sendid);
    await prisma.send.update({
        where: { 
            id: sendid,
            userId: userId,
        },
        data: { isDownloadEnabled: hasDownload },
    });
}

