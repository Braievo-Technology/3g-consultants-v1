import { NextRequest, NextResponse  } from 'next/server';
import { PrismaClient , ProjectStatus } from '@prisma/client';
import {writeFile} from "fs/promises";
import path from "node:path";

const prisma = new PrismaClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    const event = await prisma.event.findUnique({
        where: { id: Number(params.id) },
        include: { images: true },
    });

    return NextResponse.json(event);
}

export async  function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const event_type = formData.get('event_type') as string;
        const date = formData.get('date') as string;
        const start_time = formData.get('start_time') as string;
        const end_time = formData.get('end_time') as string;
        const location = formData.get('location') as string;
        const capacity = parseInt(formData.get('capacity') as string);
        const status = formData.get('status') as string || "active";
        const description = formData.get('description') as string;

        const images = formData.getAll('images') as File[];
        const savedImagePaths: { image_name: string }[] = [];

        if (images.length > 0 && images[0].size > 0) {
            for (const image of images) {
                const bytes = await image.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const fileName = `${Date.now()}-${image.name}`;
                const filePath = path.join(process.cwd(), 'public/assets/projectImages', fileName);

                await writeFile(filePath, buffer);

                savedImagePaths.push({ image_name: `/assets/projectImages/${fileName}` });
            }

            // Remove old images
            await prisma.eventImages.deleteMany({
                where: { eventId: Number(params.id) },
            });

            // Add new images
            await prisma.eventImages.createMany({
                data: savedImagePaths.map(img => ({
                    eventId: Number(params.id),
                    image_name: img.image_name,
                })),
            });
        }

        const updatedEvent = await prisma.event.update({
            where: { id: Number(params.id) },
            data: {
                title,
                event_type,
                date: date ? new Date(date) : null,
                start_time: start_time ? new Date(start_time) : null,
                end_time: end_time ? new Date(end_time) : null,
                location,
                capacity,
                status,
                description,
            },
        });

        const eventWithImages = await prisma.event.findUnique({
            where: { id: Number(params.id) },
            include: { images: true },
        });

        return NextResponse.json(eventWithImages);
    } catch (error) {
        console.error('FormData PUT error:', error);
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}


export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    await prisma.event.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: 'Event deleted successfully' });
}