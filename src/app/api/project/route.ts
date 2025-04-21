import {PrismaClient, ProjectStatus} from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdirSync, existsSync } from 'fs';

const prisma = new PrismaClient();

export async function GET() {
    const projects = await prisma.project.findMany({ include: { images: true } });
    return NextResponse.json(projects);
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const project_name = formData.get('project_name') as string;
        const location = formData.get('location') as string;
        const start_date = formData.get('start_date') as string;
        const end_date = formData.get('end_date') as string;
        const budget = formData.get('budget') as string;
        const status = formData.get('status') as string;
        const description = formData.get('description') as string;

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

        const newProject = await prisma.project.create({
            data: {
                project_name,
                location,
                start_date: start_date ? new Date(start_date) : null,
                end_date: end_date ? new Date(end_date) : null,
                budget: budget ? parseFloat(budget) : null,
                status: status as ProjectStatus,
                description,
                images: {
                    create: savedImagePaths,
                },
            },
            include: { images: true },
        });

        return NextResponse.json(newProject);
    } catch (error) {
        console.error('Project FormData POST error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

