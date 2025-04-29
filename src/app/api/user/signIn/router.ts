import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userName, password } = body;

        if (!userName || !password) {
            return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { userName },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Signed in', user: { id: user.id, userName: user.userName } });
    } catch (error) {
        console.error('Signin error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
