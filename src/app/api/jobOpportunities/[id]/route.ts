import { PrismaClient, EmploymentType, JobStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
    const job = await prisma.jobOpportunities.findUnique({
        where: { id: Number(params.id) }
    });
    return NextResponse.json(job);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const {
        job_title,
        employment_type,
        department,
        location,
        application_deadline,
        status,
        job_description,
        requirements
    } = await req.json();

    const updatedJob = await prisma.jobOpportunities.update({
        where: { id: Number(params.id) },
        data: {
            job_title,
            employment_type: employment_type as EmploymentType,
            department,
            location,
            application_deadline: application_deadline ? new Date(application_deadline) : null,
            status: status as JobStatus,
            job_description,
            requirements
        }
    });

    return NextResponse.json(updatedJob);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    await prisma.jobOpportunities.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: 'Job opportunity deleted successfully' });
}
