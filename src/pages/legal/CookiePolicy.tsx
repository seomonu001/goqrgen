import React from 'react';
import { Cookie, Shield, Clock, Settings } from 'lucide-react';
import SEOHead from '../../components/SEOHead';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Cookie Policy | QR Code Generator"
        description="Learn how we use cookies to improve your experience with our QR code generator. Read our detailed cookie policy and understand your privacy rights."
        keywords="cookie policy, privacy, cookies, QR code generator, data privacy"
        canonical="https://qrcodegen.com/legal/cookie-policy"
      />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-gray-50">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding how we use cookies to improve your experience
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <div className="prose max-w-none">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                  They help us make our website work better and provide you with a more personalized experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {[
                    {
                      icon: <Shield className="w-6 h-6" />,
                      title: "Essential Cookies",
                      description: "Required for basic website functionality"
                    },
                    {
                      icon: <Settings className="w-6 h-6" />,
                      title: "Preference Cookies",
                      description: "Remember your settings and choices"
                    },
                    {
                      icon: <Clock className="w-6 h-6" />,
                      title: "Analytics Cookies",
                      description: "Help us understand how you use our site"
                    },
                    {
                      icon: <Cookie className="w-6 h-6" />,
                      title: "Marketing Cookies",
                      description: "Track your activity across websites"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white rounded-lg">
                          {item.icon}
                        </div>
                        <h3 className="font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies for various purposes, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Ensuring our website works properly</li>
                  <li>Remembering your preferences and settings</li>
                  <li>Understanding how you use our website</li>
                  <li>Improving our services and user experience</li>
                  <li>Providing personalized content and advertisements</li>
                </ul>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Your Cookie Choices</h2>
                <p className="text-gray-600 mb-4">
                  You have control over how cookies are used when you visit our website:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Essential Cookies</h3>
                      <p className="text-sm text-gray-600">Required for website functionality</p>
                    </div>
                    <div className="bg-gray-200 px-3 py-1 rounded text-sm">Always Active</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Analytics Cookies</h3>
                      <p className="text-sm text-gray-600">Help us improve our website</p>
                    </div>
                    <button className="btn-secondary text-sm">Manage</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Marketing Cookies</h3>
                      <p className="text-sm text-gray-600">Used for targeted advertising</p>
                    </div>
                    <button className="btn-secondary text-sm">Manage</button>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
                <p className="text-gray-600 mb-4">
                  You can manage or delete cookies based on your preferences. You can delete all cookies 
                  that are already on your computer and you can set most browsers to prevent them from 
                  being placed.
                </p>
                <div className="bg-primary-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Browser Settings</h3>
                  <p className="text-gray-700 mb-4">
                    You can control cookies through your browser settings. Here's how to do it in popular browsers:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Chrome: Settings → Privacy and Security → Cookies</li>
                    <li>Firefox: Options → Privacy & Security → Cookies</li>
                    <li>Safari: Preferences → Privacy → Cookies</li>
                    <li>Edge: Settings → Privacy & Security → Cookies</li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page 
                  with an updated revision date. We encourage you to review this policy periodically.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Last updated: March 15, 2024
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about our Cookie Policy, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600">Email: privacy@qrcodegen.com</p>
                  <p className="text-gray-600">Phone: +1 (234) 567-890</p>
                  <p className="text-gray-600">Address: 123 Privacy Street, Security City, 12345</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CookiePolicy;