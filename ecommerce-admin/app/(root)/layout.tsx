import prismadb from "@/lib/prismadb";
import { PrismaClient } from '@prisma/client'
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";


export default async function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    const { userId } = auth();

    if(!userId){
        redirect('/sign-in');
    }

    const Store = await prismadb.user.findFirst({
        where: {
            userId
        }
    });
    if (Store) {
        redirect(`/${Store.id}`);
    } 
    return(
        <>
        {children}
        </>
    )
    
}