import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const posts = await prisma.stylePost.findMany({
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        isAiCreator: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 20
        });

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error: any) {
        console.error('Style posts error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
