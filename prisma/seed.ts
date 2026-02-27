import "dotenv/config";
const { PrismaClient } = require('@prisma/client');
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Seeding luxury data...')

    // Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@fashion.ai' },
        update: {},
        create: {
            email: 'admin@fashion.ai',
            name: 'System Admin',
            password: adminPassword,
            role: 'ADMIN',
        },
    })
    console.log('Created Admin:', admin.email)

    // Create Creator Users
    const creatorPassword = await bcrypt.hash('creator123', 10)

    const creatorsData = [
        {
            email: 'elena@rose.com',
            name: 'Elena Rose',
            bio: 'Luxury minimalist enthusiast. Crafting elegance through simplicity.',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPAjXoTXV9ToXtaEiK-2z-W6HiUQQJ0o5YntiTTMreS8AstJnoczEeThdXNmiX9Ev_E_wZNJ4haDVsBjJp9cxUNMTa-gcHh7SciSWzkhMBZT3UCNr5zgNUY2Li__tTyNj_onp4Pn7VmDoBz3gU51-J3XVyEECZXQqNpQRX5tjUFwMA6nS_B9zT7XU3CT6GD_aVG46xGkXbUnOJWLxT6JQhxhv2MjaSGUW3cbHL1C3pjKv9AzVoYSXN94ESvPj3_0WMFw7BItwxlwA',
            isAiCreator: false
        },
        {
            email: 'masud@stitch.ai',
            name: 'Masud AI',
            bio: 'AI-driven styling engine. Discovering your unique fashion DNA.',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-Qi-Wt5Lu9l1GUrIjByCiHrW-bsCDT3qt4XnSsqNZGFNEzvcKfKpzdq2yMwPvAHPmE338oRSX7Aett0NZcCVt8oky-z8uNyHNrROLIgDv20y8cdJL2ev1evzRn9FvpBaxlKYtfaFBLHr3IigZXVnAYtTYuVBfJdPbcQ9DoR_U191rrduT7MT_aWvHK2K0tES_jNFJ1VxuV42t8kkwiXug-21xqPB-iPu1qbOtpPGMJA-7rKVliloo9au0DDS6HaQ1aGxthuH_zs',
            isAiCreator: true
        }
    ]

    for (const c of creatorsData) {
        const user = await prisma.user.upsert({
            where: { email: c.email },
            update: {},
            create: {
                email: c.email,
                name: c.name,
                password: creatorPassword,
                role: 'USER',
                creatorProfile: {
                    create: {
                        name: c.name,
                        bio: c.bio,
                        avatar: c.avatar,
                        isAiCreator: c.isAiCreator,
                        followers: Math.floor(Math.random() * 5000)
                    }
                }
            },
            include: { creatorProfile: true }
        })
        console.log(`Created Creator: ${user.name}`)

        // Add some style posts
        if (user.creatorProfile) {
            await prisma.stylePost.create({
                data: {
                    creatorId: user.creatorProfile.id,
                    image: c.avatar as string, // Using avatar as placeholder post image
                    caption: `Exploring the new collection. #Luxury #Elegance`,
                    likes: Math.floor(Math.random() * 1000)
                }
            })
        }
    }

    // Products from mock-data
    const products = [
        {
            name: 'Essential Item 01',
            description: 'High-quality garment designed for comfort and style.',
            price: 15000,
            category: 'Category 1',
            isAiGenerated: true,
            stock: 10,
            rating: 4.5,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzD6QKcnDjoPfNHYZoKD9JltkpoWy1othF-BrPpxHZh1QRWur2z9sPn6TuOIbu9CNMpLGH5-krhp_bEk4LyR50VmDWXSGeKq-uhlG-fBDqit8hsem9AiD9pelxFGTY7JxkTHSTGCh37AhnrGhrjLS7-7NGF8JvoevdVTpgk9L2mojHfuyLd8kjtbod0dBinCYOUyvZHE16igI_qz5-SnEHF9CvbCVwX43cx3O9j_xyJJ1HoBbvW4UVRQhi39SAZ7WM2MdEptwt0DA'
        },
        {
            name: 'Premium Item 02',
            description: 'Modern silhouette with premium fabric and detail.',
            price: 4500,
            category: 'Category 2',
            isAiGenerated: false,
            stock: 15,
            rating: 4.2,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1AkchPAfBnylhmUv-SmKIhE1ZXofd949OgwGlHhM7f2dMHv-v6PGCNHzqz2_GAwFJZPNGrOF1KoYUMbFS--esM-baqusQqw6YqSMC2aNnUHn7wE6x29LA-3iJhAu2b34uiB_7ZSwZ5DjOXcAxASTLvcefwKloP3Zx7_JQOHLbdmVUPEgJCuIGwFbdLY8YePcomWhWdV72xxlvxCW8ABFZeSjMQz_wsBwQ7pENXLIBemcCmizwkSlSWoUBmLHJrHygSZkU1zFeSg'
        }
    ]

    const elena = await prisma.creator.findFirst({ where: { name: 'Elena Rose' } })

    for (const product of products) {
        await prisma.product.create({
            data: {
                ...product,
                creatorId: elena?.id
            }
        })
    }

    console.log('Seed complete. Stitch ecosystem initialized.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
