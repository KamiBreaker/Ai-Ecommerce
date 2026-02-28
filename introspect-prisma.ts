import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

async function test() {
    const prisma = new PrismaClient()

    console.log('--- Prisma Instance Keys ---');
    console.log(Object.keys(prisma).join(', '));

    console.log('--- Prototype Keys ---');
    console.log(Object.keys(Object.getPrototypeOf(prisma)).join(', '));

    console.log('--- Model Check ---');
    console.log('user:', !!prisma.user);
    console.log('product:', !!prisma.product);
    console.log('creator:', !!prisma.creator);
    console.log('stylePost:', !!prisma.stylePost);

    await prisma.$disconnect()
}

test()
