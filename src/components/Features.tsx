import React from 'react';
import { 
  Palette, Download, History, Scan, Smartphone, 
  ShieldCheck, Zap, LayoutGrid 
} from 'lucide-react';

const features = [
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Customizable Design',
    description: 'Personalize your QR codes with custom colors, sizes, and error correction levels.'
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: 'Multiple Download Formats',
    description: 'Download your QR codes in PNG, JPEG, or SVG formats for any use case.'
  },
  {
    icon: <History className="h-6 w-6" />,
    title: 'History Tracking',
    description: 'Access your previously generated QR codes anytime without recreating them.'
  },
  {
    icon: <Scan className="h-6 w-6" />,
    title: 'QR Code Scanner',
    description: 'Scan QR codes using your device camera directly within the application.'
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'Mobile Friendly',
    description: 'Create and scan QR codes on any device with our responsive interface.'
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Secure & Private',
    description: 'Your data never leaves your device - all processing happens locally in your browser.'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Instant Generation',
    description: 'Generate QR codes instantly as you type with real-time preview.'
  },
  {
    icon: <LayoutGrid className="h-6 w-6" />,
    title: 'Batch Creation',
    description: 'Generate multiple QR codes at once for efficient workflow.'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features\" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our QR code generator offers powerful features to create customized QR codes for any purpose.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card p-6 hover:translate-y-[-4px] hover:border-primary-200"
            >
              <div className="bg-primary-100 text-primary-600 p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;