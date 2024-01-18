import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient
};

const prismadb = globalThis.prisma
if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
