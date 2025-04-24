import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { CheckCircleIcon } from 'lucide-react'
import Button from '@/app/Components/ui/Button'
import SectionTitle from '@/app/Components/ui/SectionTitle'
const serviceData = {
  procurement: {
    title: 'Procurement Contract',
    hero: 'https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3',
    description:
      'Our procurement contract services optimize your construction supply chain, ensuring quality materials and services at competitive prices.',
    features: [
      'Vendor selection and management',
      'Contract negotiation and administration',
      'Quality assurance and compliance',
      'Cost optimization strategies',
      'Risk management and mitigation',
      'Sustainable procurement practices',
    ],
    process: [
      'Requirements analysis and planning',
      'Vendor sourcing and evaluation',
      'Contract negotiation and finalization',
      'Implementation and monitoring',
      'Performance evaluation',
    ],
  },
  // ... other services data
}
type Props = {
  params: {
    serviceId: string
  }
}
async function generateMetadata({ params }: Props) {
  const service = serviceData[params.serviceId as keyof typeof serviceData]
  if (!service) {
    return {
      title: 'Service Not Found | 3G Consultants',
      description: 'The requested service could not be found.',
    }
  }
  return {
    title: `${service.title} | 3G Consultants`,
    description: service.description,
  }
}
export default function ServicePage({ params }: Props) {
  const service = serviceData[params.serviceId as keyof typeof serviceData]
  if (!service) {
    notFound()
  }
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-24">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={service.hero}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {service.title}
          </h1>
          <p className="text-xl max-w-3xl">{service.description}</p>
        </div>
      </section>
      {/* Service Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <SectionTitle title="Key Features" />
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon
                      className="text-yellow-500 mr-3 mt-1 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Process */}
            <div>
              <SectionTitle title="Our Process" />
              <ol className="space-y-6">
                {service.process.map((step, index) => (
                  <li key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how our {service.title.toLowerCase()}{' '}
            services can benefit your next project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary">
              Request a Consultation
            </Button>
            <Button
              href="/projects"
              variant="outline"
              className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
            >
              View Related Projects
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
