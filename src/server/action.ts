'use server'
import prisma from "@/lib/prisma"
import { auth } from '@clerk/nextjs';

export async function latestviewedfile(fileId: string) {
    const { userId } = auth();
    await prisma.file.update({
        where: {
            id: fileId,
            userId: userId,
        },
        data: { updatedAt: new Date() },
    });
}

export async function changepasswordstate(hasPassword: boolean, sendid: string) {
    const { userId } = auth();
    if (!sendid) {
        throw new Error('fileId is required');
    }
    console.log("theswitch state" + hasPassword + " " + sendid);
    await prisma.send.update({
        where: {
            id: sendid,
            userId: userId,
        },
        data: { hasPassword: hasPassword },
    });
}


export async function changedownloadstate(hasDownload: boolean, sendid: string) {
    const { userId } = auth();
    if (!sendid) {
        throw new Error('fileId is required');
    }
    console.log("theswitch state" + hasDownload + " " + sendid);
    await prisma.send.update({
        where: {
            id: sendid,
            userId: userId,
        },
        data: { isDownloadEnabled: hasDownload },
    });
}

export async function Deletesent(sendid: string) {
    const { userId } = auth();
    if (!sendid) {
        throw new Error('fileId is required');
    }
    console.log("deleting sent" + sendid);
    await prisma.send.delete({
        where: {
            id: sendid,
            userId: userId,
        },
    });
}

export async function Deletefavoritefile(sendid: string) {
    const { userId } = auth();
    if (!sendid) {
        throw new Error('fileId is required');
    }
    console.log("deleting sent" + sendid);
    await prisma.file.delete({
        where: {
            id: sendid,
            userId: userId,
        },
    });
}

export async function Deletefavoritealbum(sendid: string) {
    const { userId } = auth();
    if (!sendid) {
        throw new Error('fileId is required');
    }
    console.log("deleting sent" + sendid);
    await prisma.album.delete({
        where: {
            id: sendid,
            userId: userId,
        },
    });
}



export async function Togglefavoritealbume(fileId: string, favorite: boolean) {
    const { userId } = auth();
    if (!fileId) {
        throw new Error('fileId is required');
    }
    console.log("togglefavorite"+fileId+favorite);
    await prisma.album.update({
        where: {
            id: fileId,
            userId: userId,
        },
        data: {
            favorite: !favorite
        }
    });
}

export async function Togglefavoriteafile(fileId: string, favorite: boolean) {
    const { userId } = auth();
    if (!fileId) {
        throw new Error('fileId is required');
    }
    console.log("togglefavorite"+fileId+favorite);
    await prisma.file.update({
        where: {
            id: fileId,
            userId: userId,
        },
        data: {
            favorite: !favorite
        }
    });
}


