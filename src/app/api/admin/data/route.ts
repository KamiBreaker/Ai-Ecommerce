import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Ideally we would check for Admin role in a session/cookie here
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            },
            orderBy: { createdAt: 'desc' }
        });

        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ users, products }, { status: 200 });

    } catch (error) {
        console.error('Admin data error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
