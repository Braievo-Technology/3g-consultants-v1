import React from 'react';
import Button from '@/app/Components/ui/Button';
const CtaSection = () => {
  return <section className="py-16 bg-yellow-500">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Your Next Project?
        </h2>
        <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
          Contact us today to discuss how BuildConstruct can bring your vision
          to life with our expertise in construction and engineering.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="primary">
            Get In Touch
          </Button>
          <Button href="/projects" variant="outline" className="border-black text-vlack hover:bg-black hover:text-white">
            View Our Work
          </Button>
        </div>
      </div>
    </section>;
};
export default CtaSection;