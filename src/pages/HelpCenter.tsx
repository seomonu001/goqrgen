import React, { useState } from 'react';
import { Search, HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="QR Code Generator Help Center & Support | Free QR Code Generator"
        description="Get help with our QR code generator. Find answers to common questions, troubleshooting guides, and contact our support team for assistance with QR code creation."
        keywords="QR code help, QR code support, QR code FAQ, QR code troubleshooting, QR code assistance, QR code customer service"
        canonical="https://qrcodegen.com/help"
      />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-gray-50">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Find answers, tutorials, and support for all your QR code needs
              </p>
              
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Book className="w-6 h-6" />,
                  title: "Getting Started",
                  description: "New to QR Code Generator? Start here for the basics."
                },
                {
                  icon: <HelpCircle className="w-6 h-6" />,
                  title: "FAQs",
                  description: "Find answers to commonly asked questions."
                },
                {
                  icon: <MessageCircle className="w-6 h-6" />,
                  title: "Community",
                  description: "Join our community forum for discussions and tips."
                }
              ].map((item, index) => (
                <div key={index} className="card p-6 text-center hover:scale-105 transition-transform">
                  <div className="inline-block p-3 bg-primary-50 rounded-lg mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <a href="#" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
                    Learn more →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">Popular Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Creating Your First QR Code",
                  topics: [
                    "Choosing the right QR code type",
                    "Customizing your QR code",
                    "Testing and downloading",
                    "Best practices for sharing"
                  ]
                },
                {
                  title: "Advanced Features",
                  topics: [
                    "Batch generation",
                    "Dynamic QR codes",
                    "Analytics and tracking",
                    "API integration"
                  ]
                },
                {
                  title: "Troubleshooting",
                  topics: [
                    "Scanning issues",
                    "Error correction",
                    "Size optimization",
                    "Color contrast"
                  ]
                },
                {
                  title: "Account & Settings",
                  topics: [
                    "Managing your account",
                    "Subscription options",
                    "Security settings",
                    "Data privacy"
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="card p-6">
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>
                        <a
                          href="#"
                          className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                        >
                          <span className="mr-2">•</span>
                          {topic}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
              <p className="text-gray-600">
                Our support team is here to help you with any questions or issues
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="card p-6 text-center">
                <Mail className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Get help via email within 24 hours
                </p>
                <a href="mailto:support@qrcodegen.com" className="text-primary-600 hover:text-primary-700">
                  support@qrcodegen.com
                </a>
              </div>
              
              <div className="card p-6 text-center">
                <MessageCircle className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Chat with our support team
                </p>
                <button className="btn-primary">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HelpCenter;