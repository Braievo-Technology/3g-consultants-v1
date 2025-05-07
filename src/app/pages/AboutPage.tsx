"use client";
import React from "react";
import WordCarousel from "@/app/Components/animations/WorldCarousel";




// eslint-disable-next-line @typescript-eslint/no-unused-vars
const teamMembers = [
  {
    name: "Saman Gamage",
    role: "Director",
    shortBio:
      "Mr. Saman Gamage Co-founded 3G Consultants in year 2014 and successfully chaired as director.",
    fullBio:
      "Mr. Saman Gamage Co-founded 3G Consultants in year 2014 and successfully chaired as managing director. A Chartered Quantity Surveyor from the University of Moratuwa with over 23 years of experience and holds BSc. QS. (Hons) AIQSSL, M.Sc (Construction Law & Dispute Resolution),Dip. Arb.",
    image: "/saman.jpg",
    expertise: [
      "Strategic Leadership",
      "Sustainable Construction",
      "Project Management",
    ],
    education: "Ph.D. in Civil Engineering, Stanford University",
    social: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
    },
  },
  {
    name: "Prasad Jasinghe",
    role: "Managing Director",
    shortBio:
      "Mr. Prasad Jasinghe Co-founder is a Chartered Quantity Surveyor from the University of Moratuwa.",
    fullBio:
      "Mr. Prasad Jasinghe Co-founder is a Chartered Quantity Surveyor from the University of Moratuwa and holds a BSc. QS. (Hons), AIQSSL, Dip.Arb, with over 20 years of Project Management, Contract and Procurement experience both locally and internationally. He has continued to contribute greatly to the Company's success.",
    image: "/prasad.jpg",
    expertise: [
      "Structural Engineering",
      "Sustainable Design",
      "Technical Innovation",
    ],
    education: "M.S. in Structural Engineering, MIT",
    social: {
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com",
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const regularStaff = [
  {
    name: "Sarah Thompson",
    position: "Senior Project Engineer",
    description:
      "Specializes in structural engineering with 8 years of experience in commercial projects.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "David Chen",
    position: "Environmental Specialist",
    description:
      "Expert in environmental impact assessments and sustainable design practices.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=774&q=80",
  },
  // Other staff...
];
const AboutPage = () => (
  <div className="w-full">
    <section className="relative bg-black text-white py-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
      </div>
    </section>

    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2">
          <span className="text-[50px] font-bold text-[#f1c235]">We</span>
          <span className="text-[50px] font-bold text-[#f1c235]">
            <WordCarousel words={["Create", "Develop", "Build"]} />
          </span>
          <span className="text-[50px] font-bold text-[#f1c235]">
            Solutions
          </span>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
