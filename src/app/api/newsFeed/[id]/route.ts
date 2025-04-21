import { PrismaClient, NewsFeedStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {writeFile} from "fs/promises";
import path from "node:path";

const prisma = new PrismaClient();

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
    const feed = await prisma.newsFeed.findUnique({
        where: { id: Number(params.id) },
        include: { images: true },
    });
    return NextResponse.json(feed);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        const numericId = Number(id);

        if (isNaN(numericId)) {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
        }

        const formData = await req.formData();

        const title = formData.get('title') as string;
        const summary = formData.get('summary') as string;
        const status = formData.get('status') as string;

        if (!Object.values(NewsFeedStatus).includes(status as NewsFeedStatus)) {
            return NextResponse.json({ message: 'Invalid status value' }, { status: 400 });
        }

        let imagePath: string | undefined;

        const image = formData.get('image') as File | null;
        if (image && typeof image === 'object') {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${image.name}`;
            const filePath = path.join(process.cwd(), 'public/assets/newsFeedImages', fileName);

            await writeFile(filePath, buffer);
            imagePath = `/assets/newsFeedImages/${fileName}`;
        }

        const updated = await prisma.newsFeed.update({
            where: { id: numericId },
            data: {
                title,
                summary,
                status: status as NewsFeedStatus,
                ...(imagePath && { images: imagePath }), // update image only if new image is uploaded
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('FormData PUT error:', error);
        return NextResponse.json({ message: 'Failed to update news feed' }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    await prisma.newsFeed.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: 'Deleted successfully' });
}
