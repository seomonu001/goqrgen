import React from 'react';
import { QrCode, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Create Custom <span className="text-primary-600">QR Codes</span> in Seconds
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-lg">
              Generate QR codes for URLs, text, contact information, WiFi networks, and more.
              Customize colors, size, and download in multiple formats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#generator" 
                className="btn-primary flex items-center justify-center"
              >
                Create QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="#scanner" 
                className="btn-secondary flex items-center justify-center"
              >
                Scan QR Code
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-slide-up">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-lg opacity-30 animate-pulse-slow"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                <QrCode className="w-64 h-64 text-primary-900" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;