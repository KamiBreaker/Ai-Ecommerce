try {
    const clientPath = require.resolve('@prisma/client');
    console.log('@prisma/client path:', clientPath);

    const { PrismaClient } = require('@prisma/client');
    console.log('PrismaClient export:', typeof PrismaClient);

    if (typeof PrismaClient === 'function') {
        const prisma = new PrismaClient();
        console.log('Instance models:', Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
    }
} catch (err) {
    console.error('Error:', err);
}
