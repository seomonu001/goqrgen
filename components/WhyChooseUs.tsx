import React from 'react';
import { Shield, Zap, Palette, Users, Lock, Globe, Clock, Gift } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Private",
    description: "Your data never leaves your device. All processing happens locally in your browser."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Generate QR codes instantly with real-time preview as you type."
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Fully Customizable",
    description: "Personalize your QR codes with custom colors, logos, and designs."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "User Friendly",
    description: "Intuitive interface designed for both beginners and professionals."
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "No Registration",
    description: "Start creating QR codes immediately - no sign-up required."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Works Everywhere",
    description: "Compatible with all devices and major QR code scanners."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "History Tracking",
    description: "Access your previously generated QR codes anytime."
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Always Free",
    description: "Create unlimited QR codes without any cost or hidden fees."
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-semibold mb-2 block">Why Choose Us</span>
          <h2 className="text-3xl font-bold mb-4">The Smart Choice for QR Generation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of simplicity and advanced features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="card p-6 bg-gradient-to-br from-white to-gray-50 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary-50 group-hover:to-white">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;