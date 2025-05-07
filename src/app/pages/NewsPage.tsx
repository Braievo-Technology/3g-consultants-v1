import React from "react";
import { Link } from "react-router-dom";

import {  ArrowRightIcon } from "lucide-react";
import { useNews } from "../hooks/useNews";
import SectionTitle from "@/app/Components/ui/SectionTitle";
const NewsPage = () => {
  const { news, loading, error } = useNews();
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading news...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error loading news: {error.message}
        </div>
      </div>
    );
  }
  // Filter only published news
  const publishedNews = news.filter((item) => item.status === "published");
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            News & Updates
          </h1>
          <p className="text-xl max-w-3xl">
            Stay informed about our latest projects, achievements, and industry
            insights.
          </p>
        </div>
      </section>
      {/* News Articles */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Latest News"
            subtitle="Keep up with our recent developments and industry insights."
            centered={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedNews.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`http://localhost:3000${article.images}`}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#f1c235] mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.summary}</p>
                  <Link
                    to={`/news/${article.id}`}
                    className="flex items-center text-yellow-500 font-medium hover:text-yellow-600"
                  >
                    Read More <ArrowRightIcon size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default NewsPage;
