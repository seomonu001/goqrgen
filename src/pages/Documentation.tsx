import React from 'react';
import { Book, Code, Terminal, FileText, Zap, Settings, Shield, HelpCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Documentation | QR Code Generator"
        description="Comprehensive documentation for using our QR code generator. Learn about features, API integration, best practices, and troubleshooting."
        keywords="QR code documentation, API reference, guides, tutorials, QR code generator"
        canonical="https://qrcodegen.com/documentation"
      />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-gray-50">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about using our QR Code Generator
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <nav className="space-y-1">
                    {[
                      { icon: <Book className="w-5 h-5" />, label: "Getting Started" },
                      { icon: <Code className="w-5 h-5" />, label: "API Reference" },
                      { icon: <Terminal className="w-5 h-5" />, label: "CLI Tools" },
                      { icon: <FileText className="w-5 h-5" />, label: "Guides" },
                      { icon: <Zap className="w-5 h-5" />, label: "Best Practices" },
                      { icon: <Settings className="w-5 h-5" />, label: "Configuration" },
                      { icon: <Shield className="w-5 h-5" />, label: "Security" },
                      { icon: <HelpCircle className="w-5 h-5" />, label: "Troubleshooting" }
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Documentation Content */}
              <div className="lg:col-span-3">
                <div className="prose max-w-none">
                  <section id="getting-started" className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                    <p className="text-gray-600 mb-4">
                      Welcome to the QR Code Generator documentation. This guide will help you get started
                      with generating QR codes quickly and efficiently.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Choose your QR code type (URL, text, email, etc.)</li>
                        <li>Enter your content in the provided fields</li>
                        <li>Customize the appearance if desired</li>
                        <li>Download or share your QR code</li>
                      </ol>
                    </div>
                  </section>

                  <section id="api-reference" className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">API Reference</h2>
                    <p className="text-gray-600 mb-4">
                      Our API allows you to generate QR codes programmatically. Here's what you need to know:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                        <code>{`
POST /api/generate
{
  "type": "url",
  "content": "https://example.com",
  "options": {
    "size": 200,
    "color": "#000000"
  }
}
                        `}</code>
                      </pre>
                    </div>
                  </section>

                  <section id="guides" className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Guides</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Creating Dynamic QR Codes",
                          description: "Learn how to create QR codes that can be updated later."
                        },
                        {
                          title: "Customizing Design",
                          description: "Customize colors, patterns, and add logos to your QR codes."
                        },
                        {
                          title: "Batch Generation",
                          description: "Generate multiple QR codes efficiently."
                        },
                        {
                          title: "Analytics & Tracking",
                          description: "Track scans and analyze QR code performance."
                        }
                      ].map((guide, index) => (
                        <div key={index} className="card p-4">
                          <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                          <p className="text-gray-600">{guide.description}</p>
                          <a href="#" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
                            Read more →
                          </a>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="best-practices" className="mb-12">
                    <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Recommended</h3>
                        <ul className="list-disc list-inside text-green-700">
                          <li>Use appropriate error correction levels</li>
                          <li>Test QR codes before deployment</li>
                          <li>Maintain adequate contrast ratios</li>
                          <li>Consider mobile device compatibility</li>
                        </ul>
                      </div>
                      
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Avoid</h3>
                        <ul className="list-disc list-inside text-red-700">
                          <li>Extremely small QR code sizes</li>
                          <li>Low contrast color combinations</li>
                          <li>Excessive customization that affects scannability</li>
                          <li>Placing QR codes on curved surfaces</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Documentation;