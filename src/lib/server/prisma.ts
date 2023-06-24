import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient({ datasources: { db: { url: "mysql://root@localhost:3306/smart_lib" } } });

if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma;
}

export { prisma };