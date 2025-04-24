import React from 'react'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import AboutPreview from '@/components/home/AboutPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CtaSection from '@/components/home/CtaSection'
import NewsPreviewSection from '@/components/home/NewsPreviewSection'
import EventsPreviewSection from '@/components/home/EventsPreviewSection'
export const metadata = {
  title: '3G Consultants | Engineering Excellence',
  description:
    "Engineering Excellence for Tomorrow's World. 3G Consultants delivers innovative engineering solutions with precision, expertise, and sustainable practices.",
}
export default function HomePage() {
  return (
    <div className="w-full">
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <AboutPreview />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="projects">
        <FeaturedProjects />
      </div>
      <div id="news">
        <NewsPreviewSection />
      </div>
      <div id="events">
        <EventsPreviewSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="contact">
        <CtaSection />
      </div>
    </div>
  )
}
