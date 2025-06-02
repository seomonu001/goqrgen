import React from 'react';
import { FileText, AlertTriangle, Shield, Scale } from 'lucide-react';
import SEOHead from '../../components/SEOHead';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Terms of Service | Free QR Code Generator"
        description="Read our terms of service to understand the rules and guidelines for using our QR code generator. Learn about user rights, responsibilities, and acceptable use of our service."
        keywords="terms of service, user agreement, QR code terms, legal terms, service conditions, usage terms"
        canonical="https://qrcodegen.com/legal/terms-of-service"
      />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-gray-50">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Please read these terms carefully before using our service
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <div className="prose max-w-none">
              <div className="mb-12">
                <div className="bg-primary-50 p-6 rounded-lg mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-primary-600" />
                    <h2 className="text-xl font-bold m-0">Agreement to Terms</h2>
                  </div>
                  <p className="text-gray-700 mb-0">
                    By accessing or using our service, you agree to be bound by these Terms. If you disagree 
                    with any part of the terms, then you may not access the service.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <FileText className="w-6 h-6" />,
                      title: "License to Use",
                      description: "Terms for using our QR code generation service"
                    },
                    {
                      icon: <Shield className="w-6 h-6" />,
                      title: "User Obligations",
                      description: "Your responsibilities while using our service"
                    },
                    {
                      icon: <Scale className="w-6 h-6" />,
                      title: "Legal Compliance",
                      description: "Adherence to applicable laws and regulations"
                    },
                    {
                      icon: <AlertTriangle className="w-6 h-6" />,
                      title: "Restrictions",
                      description: "Prohibited uses of our service"
                    }
                  ].map((section, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white rounded-lg text-primary-600">
                          {section.icon}
                        </div>
                        <h3 className="font-semibold">{section.title}</h3>
                      </div>
                      <p className="text-gray-600">{section.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Account Creation",
                      content: "You must provide accurate information when creating an account."
                    },
                    {
                      title: "Account Security",
                      content: "You are responsible for maintaining the security of your account."
                    },
                    {
                      title: "Account Termination",
                      content: "We reserve the right to terminate accounts for violations of these terms."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Ownership and Rights</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      The service and its original content are owned by us
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      Generated QR codes belong to the respective users
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      Users retain rights to their uploaded content
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Prohibited Uses</h2>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-4">You may not use the service for:</h3>
                  <ul className="space-y-3 text-red-700">
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Illegal or unauthorized purposes
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Violating any applicable laws
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Distributing malware or harmful content
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Infringing on others' intellectual property
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    We shall not be liable for any indirect, incidental, special, consequential, or punitive 
                    damages, including without limitation, loss of profits, data, use, goodwill, or other 
                    intangible losses.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">Limitations include:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Service interruptions</li>
                      <li>• Data loss or theft</li>
                      <li>• Unauthorized access</li>
                      <li>• Third-party conduct</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Modifications to Service</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    We reserve the right to:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Modify or discontinue the service",
                      "Change fees or charges",
                      "Update these terms at any time",
                      "Limit feature availability"
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <div className="bg-primary-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Scale className="w-6 h-6 text-primary-600" />
                    <h3 className="font-semibold">Legal Jurisdiction</h3>
                  </div>
                  <p className="text-gray-700">
                    These Terms shall be governed by and construed in accordance with the laws of 
                    [Jurisdiction], without regard to its conflict of law provisions.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    For any questions about these Terms, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-700">Email: legal@qrcodegen.com</p>
                    <p className="text-gray-700">Address: 123 Legal Street, Terms City, 12345</p>
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

export default TermsOfService;