import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

async function test() {
    const prisma = new PrismaClient()
    try {
        console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
        const postsCount = await prisma.stylePost.count()
        console.log('StylePost count:', postsCount)
    } catch (err: any) {
        console.error('Test failed:', err.message)
    } finally {
        await prisma.$disconnect()
    }
}

test()
