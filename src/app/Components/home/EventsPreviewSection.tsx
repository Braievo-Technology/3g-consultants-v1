"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
} from "lucide-react";
import SectionTitle from "@/app/Components/ui/SectionTitle";
import Button from "@/app/Components/ui/Button";
import { useEvents } from "@/app/hooks/useEvents";
const EventsPreviewSection = () => {
  const { events, loading, error } = useEvents();
  if (loading) {
    return (
      <section id="events" className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">Loading events...</div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section id="events" className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            Error loading events: {error.message}
          </div>
        </div>
      </section>
    );
  }
  const previewEvents = events.slice(0, 2);
  return (
    <section id="events" className="py-20 bg-black relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title="Upcoming Events"
          subtitle="Join us at our upcoming events and stay connected"
          centered={true}
          className="text-white [&>div>p]:text-white"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {previewEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -20 : 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/70 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative flex flex-col md:flex-row h-full">
                {event.images && event.images[0] && (
                  <div className="md:w-2/5 h-full">
                    <motion.img
                      whileHover={{
                        scale: 1.1,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      src={event.images[0].image_name}
                      alt={event.title || ""}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 md:w-3/5">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-blue-100">
                    <div className="flex items-center">
                      <CalendarIcon size={16} className="mr-2" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon size={16} className="mr-2" />
                      <span>
                        {new Date(event.start_time).toLocaleTimeString()} -
                        {new Date(event.end_time).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon size={16} className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.3,
                    }}
                    className="mt-6"
                  >
                    {/* <Link
                      href={`/events/${event.id}`}
                      className="inline-block px-6 py-2 bg-yellow-500 text-blue-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                    >
                      Learn More
                    </Link> */}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Button href="/events" variant="primary">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};
export default EventsPreviewSection;
