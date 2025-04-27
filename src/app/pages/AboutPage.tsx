"use client";
import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import WordCarousel from "@/components/animations/WordCarousel";
import { motion } from "framer-motion";
import {
  LinkedinIcon,
  TwitterIcon,
  GlobeIcon,
  FacebookIcon,
  CheckCircleIcon,
  UsersIcon,
  EyeIcon,
  TargetIcon,
} from "lucide-react";

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

const TeamMemberCard = ({ member }: { member: (typeof teamMembers)[0] }) => (
  <motion.div
    className="relative group bg-white overflow-hidden rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="relative">
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-black">{member.name}</h3>
        <p className="text-yellow-500 font-medium mt-1">{member.role}</p>
        <p className="text-gray-600 text-sm mt-3">{member.shortBio}</p>
      </div>
      <motion.div
        className="absolute inset-0 bg-white p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-black h-full flex flex-col justify-between">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
            <p className="text-black font-medium">{member.role}</p>
          </div>
          <div className="flex-grow overflow-y-auto scrollbar-hide">
            <div className="text-center">
              <p className="text-black text-sm leading-relaxed">
                {member.fullBio}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const StaffCard = ({ member }: { member: (typeof regularStaff)[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div className="relative">
      <div className="w-40 h-40 mx-auto mt-8 rounded-full overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-1">{member.name}</h3>
        <p className="text-yellow-500 text-sm font-medium mb-3">
          {member.position}
        </p>
        <p className="text-gray-600 text-sm">{member.description}</p>
      </div>
    </div>
  </motion.div>
);

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
