import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {existsSync, mkdirSync} from "fs";
import path from "node:path";
import {writeFile} from "fs/promises";

const prisma = new PrismaClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    const project = await prisma.project.findUnique({
        where: { id: Number(params.id) },
        include: { images: true }
    });

    return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formData = await req.formData();

        const project_name = formData.get('project_name') as string;
        const location = formData.get('location') as string;
        const start_date = formData.get('start_date') as string;
        const end_date = formData.get('end_date') as string;
        const budget = formData.get('budget') as string;
        const status = formData.get('status') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string; // <-- category added here

        const files = formData.getAll('images');
        const savedImagePaths: { image_name: string }[] = [];

        const uploadDir = path.join(process.cwd(), 'public/assets/projectImages');
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        for (const file of files) {
            if (typeof file === 'object' && 'arrayBuffer' in file) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const fileName = `${Date.now()}-${file.name}`;
                const filePath = path.join(uploadDir, fileName);

                await writeFile(filePath, buffer);

                savedImagePaths.push({
                    image_name: `/assets/projectImages/${fileName}`,
                });
            }
        }

        const updatedProject = await prisma.project.update({
            where: { id: Number(params.id) },
            data: {
                project_name,
                location,
                start_date: start_date ? new Date(start_date) : undefined,
                end_date: end_date ? new Date(end_date) : undefined,
                budget: budget ? parseFloat(budget) : undefined,
                status,
                description,
                category, // <-- pass category to update
                images: {
                    create: savedImagePaths,
                },
            },
            include: { images: true },
        });

        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error('Project FormData PUT error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}



export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    await prisma.project.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: 'Project deleted successfully' });
}
