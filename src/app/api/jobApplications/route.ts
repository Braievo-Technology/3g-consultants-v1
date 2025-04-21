import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const applications = await prisma.jobApplications.findMany({
        include: { skills: true }
    });
    return NextResponse.json(applications);
}

export async function POST(req: NextRequest) {
    const {
        name,
        email,
        contact,
        experience,
        expected_salary,
        cv_name,
        cover_letter,
        skills
    } = await req.json();

    const newApplication = await prisma.jobApplications.create({
        data: {
            name,
            email,
            contact,
            experience,
            expected_salary,
            cv_name,
            cover_letter,
            skills: {
                create: skills?.map((skill: string) => ({ skill })) || []
            }
        },
        include: { skills: true }
    });

    return NextResponse.json(newApplication);
}
