import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    // will log every req
    log: ['query']
})