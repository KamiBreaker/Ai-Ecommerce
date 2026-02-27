import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

async function test() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

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
