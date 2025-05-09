// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function GET() {
  const applications = await prisma.jobApplications.findMany({
    include: {
      jobOpportunity: true, // include related job info if needed
    },
  });

  // Convert skills from comma-separated string to array
  const formatted = applications.map((app) => ({
    ...app,
    skills: app.skills ? app.skills.split(",").map((s) => s.trim()) : [],
  }));

  return NextResponse.json(formatted);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const contact = formData.get("contact") as string;
  const experience = formData.get("experience") as string;
  const expected_salary = formData.get("expected_salary") as string;
  const cover_letter = "dsdsdsd";
  const jobOpportunityId = parseInt(formData.get("jobOpportunityId") as string);
  // Convert the skills JSON (array) to comma-separated string
  const skillsArray = JSON.parse(formData.get("skills") as string) as string[];
  const skills = skillsArray.join(", ");

  // Get the uploaded CV file
  const cvFile = formData.get("cv") as File;

  // Generate random prefix for uniqueness
  const randomPrefix = crypto.randomBytes(6).toString("hex");
  const originalFileName = cvFile.name;
  const newFileName = `${randomPrefix}_${originalFileName}`;
  const filePath = path.join(process.cwd(), "public/assets/cv", newFileName);

  // Save the file to the designated directory
  const arrayBuffer = await cvFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(filePath, buffer);

  // Store application data in the database
  const newApplication = await prisma.jobApplications.create({
    data: {
      name,
      email,
      contact,
      experience,
      expected_salary: parseFloat(expected_salary),
      cv_name: newFileName, // Store the new file name for reference
      cover_letter,
      jobOpportunityId,
      skills,
    },
  });

  return NextResponse.json(newApplication);
}
