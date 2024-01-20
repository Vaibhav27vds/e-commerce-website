import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { connectToDatabase } from '@/helpers/server-helpers';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 401 });
    }

    await connectToDatabase()
    const store = await prisma.store.create({
      data: {
        name,
        userId,
      }
    });
  
    return NextResponse.json({ store });
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  } finally{
    await prisma.$disconnect();
  }
};
