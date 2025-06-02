import React from 'react';
import { Shield, Lock, Eye, Database, Share2, AlertTriangle } from 'lucide-react';
import SEOHead from '../../components/SEOHead';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Privacy Policy | QR Code Generator"
        description="Read our privacy policy to understand how we collect, use, and protect your personal information when using our QR code generator."
        keywords="privacy policy, data protection, personal information, QR code generator"
        canonical="https://qrcodegen.com/legal/privacy-policy"
      />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-gray-50">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                How we collect, use, and protect your personal information
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <div className="prose max-w-none">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Database className="w-6 h-6" />,
                      title: "Account Information",
                      items: ["Name", "Email address", "Password", "Usage preferences"]
                    },
                    {
                      icon: <Eye className="w-6 h-6" />,
                      title: "Usage Data",
                      items: ["QR codes generated", "Features used", "Access times", "Device information"]
                    },
                    {
                      icon: <Share2 className="w-6 h-6" />,
                      title: "Communication Data",
                      items: ["Support requests", "Feedback", "Survey responses"]
                    },
                    {
                      icon: <Lock className="w-6 h-6" />,
                      title: "Technical Data",
                      items: ["IP address", "Browser type", "Device ID", "Cookies"]
                    }
                  ].map((category, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-white rounded-lg text-primary-600">
                          {category.icon}
                        </div>
                        <h3 className="font-semibold">{category.title}</h3>
                      </div>
                      <ul className="text-gray-600 space-y-1">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Service Provision",
                      description: "To provide and maintain our QR code generation service"
                    },
                    {
                      title: "Service Improvement",
                      description: "To analyze usage patterns and improve our features"
                    },
                    {
                      title: "Communication",
                      description: "To respond to your inquiries and send service updates"
                    },
                    {
                      title: "Security",
                      description: "To detect and prevent fraud and abuse"
                    }
                  ].map((use, index) => (
                    <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">{use.title}</h3>
                      <p className="text-gray-600">{use.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <div className="bg-primary-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-primary-600" />
                    <h3 className="font-semibold">Security Measures</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      Encryption of data in transit and at rest
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      Regular security assessments and penetration testing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      Access controls and authentication mechanisms
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      24/7 monitoring and incident response
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Data Sharing</h2>
                <p className="text-gray-600 mb-6">
                  We may share your information with:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Service Providers",
                      description: "Third-party vendors who assist in operating our service"
                    },
                    {
                      title: "Legal Requirements",
                      description: "When required by law or to protect our rights"
                    },
                    {
                      title: "Business Transfers",
                      description: "In connection with a merger, acquisition, or sale of assets"
                    }
                  ].map((sharing, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">{sharing.title}</h3>
                      <p className="text-gray-600">{sharing.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      You have the following rights regarding your personal information:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Access your personal data",
                        "Correct inaccurate data",
                        "Request deletion of your data",
                        "Object to data processing",
                        "Data portability",
                        "Withdraw consent"
                      ].map((right, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-primary-600" />
                          <span className="text-gray-700">{right}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h3 className="font-semibold text-red-800">Important Notice</h3>
                  </div>
                  <p className="text-red-700 mb-4">
                    Our service is not intended for children under 13 years of age. We do not knowingly 
                    collect personal information from children under 13.
                  </p>
                  <p className="text-red-700">
                    If you believe we have collected information from a child under 13, please contact us 
                    immediately.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Posting the new policy on this page</li>
                  <li>Updating the "Last updated" date at the bottom of this policy</li>
                  <li>Sending an email notification to users</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-700">Email: privacy@qrcodegen.com</p>
                    <p className="text-gray-700">Phone: +1 (234) 567-890</p>
                    <p className="text-gray-700">Address: 123 Privacy Street, Security City, 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;