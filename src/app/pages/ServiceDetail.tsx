import React from "react";
import { useParams } from "react-router-dom";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import { CheckCircleIcon } from "lucide-react";
const serviceData = {
  procurement: {
    title: "Procurement Contract",
    hero: "https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description:
      "Our procurement contract services optimize your construction supply chain, ensuring quality materials and services at competitive prices.",
    features: [
      "Vendor selection and management",
      "Contract negotiation and administration",
      "Quality assurance and compliance",
      "Cost optimization strategies",
      "Risk management and mitigation",
      "Sustainable procurement practices",
    ],
    process: [
      "Requirements analysis and planning",
      "Vendor sourcing and evaluation",
      "Contract negotiation and finalization",
      "Implementation and monitoring",
      "Performance evaluation",
    ],
  },
  highways: {
    title: "Highways & Transportation Engineering",
    hero: "https://images.unsplash.com/photo-1545126634-40e8a2a3141a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    description:
      "Our highways and transportation engineering services deliver safe, efficient, and sustainable transportation infrastructure.",
    features: [
      "Highway design and construction",
      "Bridge engineering",
      "Traffic management systems",
      "Transportation planning",
      "Safety analysis and improvements",
      "Sustainable transportation solutions",
    ],
    process: [
      "Feasibility studies and planning",
      "Environmental impact assessment",
      "Detailed design and engineering",
      "Construction management",
      "Quality assurance and testing",
    ],
  },
  water: {
    title: "Water Resources Engineering",
    hero: "https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description:
      "Our water resources engineering services provide sustainable solutions for water management challenges.",
    features: [
      "Water supply and distribution systems",
      "Wastewater treatment facilities",
      "Flood control and management",
      "Hydraulic modeling and analysis",
      "Dam and reservoir design",
      "Irrigation systems",
    ],
    process: [
      "Water resource assessment",
      "Hydrological and hydraulic analysis",
      "System design and engineering",
      "Construction oversight",
      "Operational support and maintenance planning",
    ],
  },
  environmental: {
    title: "Environmental & Climate Resilience Engineering",
    hero: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    description:
      "Our environmental engineering services protect natural resources while supporting sustainable development.",
    features: [
      "Environmental impact assessments",
      "Climate resilience planning",
      "Contamination assessment and remediation",
      "Waste management systems",
      "Air and water quality management",
      "Sustainable design and green infrastructure",
    ],
    process: [
      "Environmental site assessment",
      "Risk analysis and mitigation planning",
      "Regulatory compliance strategy",
      "Sustainable design implementation",
      "Monitoring and reporting",
    ],
  },
  urban: {
    title: "Urban, Rural, and Regional Development",
    hero: "https://images.unsplash.com/photo-1486744328743-c1151100a95a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    description:
      "Our urban and regional development services create sustainable, livable communities through thoughtful planning and design.",
    features: [
      "Master planning and urban design",
      "Infrastructure planning and development",
      "Public space and landscape design",
      "Transit-oriented development",
      "Smart city solutions",
      "Community engagement and participatory planning",
    ],
    process: [
      "Site analysis and context evaluation",
      "Visioning and concept development",
      "Master planning and detailed design",
      "Implementation strategy",
      "Project management and delivery",
    ],
  },
  housing: {
    title: "Commercial and Housing Development",
    hero: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    description:
      "Our commercial and housing development services deliver functional, attractive, and sustainable built environments.",
    features: [
      "Residential development",
      "Commercial building construction",
      "Mixed-use development",
      "Renovation and retrofitting",
      "Green building and LEED certification",
      "Building information modeling (BIM)",
    ],
    process: [
      "Project feasibility and planning",
      "Architectural and engineering design",
      "Permitting and approvals",
      "Construction management",
      "Quality control and commissioning",
    ],
  },
};
const ServiceDetail = () => {
  const { serviceId } = useParams<{
    serviceId: string;
  }>();
  const service = serviceId
    ? serviceData[serviceId as keyof typeof serviceData]
    : null;
  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Service Not Found
        </h1>
        <p className="mb-8">
          The service you're looking for doesn't exist or has been moved.
        </p>
        <Button to="/services" variant="secondary">
          View All Services
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('${service.hero}')`,
          }}
        ></div>
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
            Contact our team to discuss how our {service.title.toLowerCase()}{" "}
            services can benefit your next project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="primary">
              Request a Consultation
            </Button>
            <Button
              to="/projects"
              variant="outline"
              className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
            >
              View Related Projects
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ServiceDetail;
