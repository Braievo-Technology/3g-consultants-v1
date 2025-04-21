import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from "node:path";

export async function GET() {
    const events = await prisma.event.findMany({ include: { images: true } });
    return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const event_type = formData.get('event_type') as string;
        const date = formData.get('date') as string;
        const start_time = formData.get('start_time') as string;
        const end_time = formData.get('end_time') as string;
        const location = formData.get('location') as string;
        const capacity = parseInt(formData.get('capacity') as string);
        const status = formData.get('status') as string;
        const description = formData.get('description') as string;

        const images = formData.getAll('images') as File[];

        const savedImagePaths: { image_name: string }[] = [];
        console.log(images,"Forntend to backend coming data");

        for (const image of images) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${image.name}`;
            const filePath = path.join(process.cwd(), 'public/assets/eventImages', fileName);

            await writeFile(filePath, buffer);

            savedImagePaths.push({ image_name: `/assets/eventImages/${fileName}` });
        }

        const newEvent = await prisma.event.create({
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
                images: {
                    create: savedImagePaths,
                },
            },
            include: { images: true },
        });

        return NextResponse.json(newEvent);
    } catch (error) {
        console.error('FormData POST error:', error);
        return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
}

