import React from 'react';
import { QrCode, Type, Settings, Download } from 'lucide-react';

const steps = [
  {
    icon: <QrCode className="w-6 h-6" />,
    title: "Select QR Type",
    description: "Choose from various QR code types including URL, text, email, WiFi, and more."
  },
  {
    icon: <Type className="w-6 h-6" />,
    title: "Enter Content",
    description: "Input your content in the provided fields. Our smart form adapts based on the QR type."
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Customize Design",
    description: "Personalize your QR code with custom colors, size, and add your logo if desired."
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Download & Share",
    description: "Download your QR code in multiple formats or share it directly with others."
  }
];

const HowToUse: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How To Use</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create your custom QR code in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="card p-6 h-full transition-all duration-300 group-hover:translate-y-[-4px]">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-lg inline-block mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                <div className="absolute top-6 right-6 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;