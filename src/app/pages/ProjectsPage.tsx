import React, { useState } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import { motion } from "framer-motion";
import { useProjects } from "../hooks/useProjects";
const projectCategories = ["All", "Planning", "Ongoing", "Completed"];
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="bg-white rounded-lg overflow-hidden border-2 border-gray-100 hover:border-gray-200 transition-all duration-300"
    >
      <div className="relative aspect-video">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`http://localhost:3000${project.images[0]?.image_name}`}
          alt={project.project_name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              project.status === "Planning"
                ? "bg-blue-500/90 text-white"
                : project.status === "Ongoing"
                ? "bg-yellow-500/90 text-blue-900"
                : "bg-green-500/90 text-white"
            }`}
          >
            {project.status}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(project.start_date).getFullYear()}
            {project.end_date &&
              ` - ${new Date(project.end_date).getFullYear()}`}
          </span>
        </div>
        <h3 className="text-xl font-bold text-blue-900 mb-3">
          {project.project_name}
        </h3>
        <p className="text-gray-600 text-sm">{project.location}</p>
      </div>
    </motion.div>
  );
};
const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();
  const [activeCategory, setActiveCategory] = useState("All");
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <div className="text-xl text-[#f1c235]">Loading projects...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <div className="text-xl text-red-500">
          Error loading projects: {error.message}
        </div>
      </div>
    );
  }
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.status === activeCategory);
  return (
    <div className="w-full">
      <section className="relative bg-black text-white py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl max-w-3xl">
            Explore our portfolio of completed and ongoing projects across
            various sectors.
          </p>
        </div>
      </section>
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Project Portfolio"
            subtitle="Browse our diverse range of projects showcasing our expertise and innovation."
            centered={true}
          />
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                  activeCategory === category
                    ? "bg-[#f1c235] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProjectsPage;
