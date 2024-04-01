'use server'
import prisma from "@/lib/prisma"
import { auth } from '@clerk/nextjs';

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
