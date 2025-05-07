"use client"
import React, { useState } from 'react'

import SectionTitle from '@/app/Components/ui/SectionTitle'
import Button from '@/app/Components/ui/Button'
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react'
import { useEvents } from '../hooks/useEvents'
const EventsPage = () => {
  const { events, loading, error } = useEvents()
  const [activeCategory, setActiveCategory] = useState('All')
  const filteredEvents =
    activeCategory === 'All'
      ? events
      : events.filter(
          (event) => event.event_type === activeCategory.toLowerCase(),
        )
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading events...</div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error loading events: {error.message}
        </div>
      </div>
    )
  }
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
            Events & Updates
          </h1>
          <p className="text-xl max-w-3xl">
            Stay connected with us through our industry events, workshops, and
            community gatherings.
          </p>
        </div>
      </section>
      {/* Events Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Upcoming Events"
            subtitle="Join us at these upcoming events to learn, connect, and grow."
            centered={true}
          />
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {['All', 'Conference', 'Workshop'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors duration-200 ${activeCategory === category ? 'bg-[#f1c235] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="space-y-6 mt-12">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {event.images && event.images[0] && (
                    <div className="md:w-1/3 h-[200px] md:h-auto relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={event.images[0].image_name}
                        alt={event.title || ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#f1c235] mb-2 sm:mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                        {event.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div className="flex items-center">
                          <CalendarIcon
                            size={20}
                            className="text-yellow-500 mr-2"
                          />
                          <span className="text-gray-700 text-sm sm:text-base">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon
                            size={20}
                            className="text-yellow-500 mr-2"
                          />
                          <span className="text-gray-700 text-sm sm:text-base">
                            {new Date(event.start_time).toLocaleTimeString()} -
                            {new Date(event.end_time).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon
                            size={20}
                            className="text-yellow-500 mr-2"
                          />
                          <span className="text-gray-700 text-sm sm:text-base">
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button href={`/events/${event.id}`} variant="secondary">
                        Event Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="py-16 bg-yellow-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive invitations to upcoming
            events and the latest news.
          </p>
          <div className="max-w-lg mx-auto">
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
export default EventsPage
