import React from 'react';
import { Building, Users, Target, Award, Globe, Shield } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="About Our QR Code Generator Team | Free QR Code Generator"
        description="Meet the team behind our free QR code generator. Learn about our mission to make QR code technology accessible, secure, and user-friendly for everyone worldwide."
        keywords="QR code team, about us, QR code company, QR code mission, QR code experts, free QR generator team"
        canonical="https://qrcodegen.com/about"
      />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-gray-50">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About QR Code Generator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto px-4">
                We're on a mission to make QR code generation accessible, secure, and efficient for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container-custom px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  At QR Code Generator, we believe in making digital connections simpler and more accessible. 
                  Our platform is built on the principles of simplicity, security, and innovation.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <Target className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="text-gray-700">Making technology accessible to everyone</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <Shield className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="text-gray-700">Ensuring data privacy and security</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <Globe className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="text-gray-700">Connecting the physical and digital worlds</span>
                  </li>
                </ul>
              </div>
              <div className="relative order-first md:order-last mb-8 md:mb-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl transform rotate-3"></div>
                <img 
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                  alt="Team collaboration"
                  className="relative rounded-2xl shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the passionate individuals behind QR Code Generator
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "CEO & Founder",
                  image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"
                },
                {
                  name: "Michael Rodriguez",
                  role: "Head of Technology",
                  image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                },
                {
                  name: "Emily Taylor",
                  role: "Head of Design",
                  image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
                }
              ].map((member, index) => (
                <div key={index} className="card p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container-custom px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "1M+", label: "QR Codes Generated" },
                { number: "150+", label: "Countries Served" },
                { number: "99.9%", label: "Uptime" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;