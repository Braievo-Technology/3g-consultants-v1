import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
    const application = await prisma.jobApplications.findUnique({
        where: { id: Number(params.id) },
        include: { skills: true }
    });
    return NextResponse.json(application);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const {
        name,
        email,
        contact,
        experience,
        expected_salary,
        cv_name,
        cover_letter
    } = await req.json();

    const updated = await prisma.jobApplications.update({
        where: { id: Number(params.id) },
        data: {
            name,
            email,
            contact,
            experience,
            expected_salary,
            cv_name,
            cover_letter
        }
    });

    return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    await prisma.jobApplications.delete({
        where: { id: Number(params.id) }
    });
    return NextResponse.json({ message: 'Job application deleted successfully' });
}
