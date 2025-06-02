import React from 'react';
import { Shield, Lock, FileText, Users, Clock, Settings } from 'lucide-react';
import SEOHead from '../../components/SEOHead';

const GDPR: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="GDPR Compliance & Data Protection | Free QR Code Generator"
        description="Learn how we protect your data and comply with GDPR regulations. Understand your rights and how we handle personal information when using our QR code generator."
        keywords="GDPR compliance, data protection, privacy rights, QR code privacy, personal data protection, EU privacy law"
        canonical="https://qrcodegen.com/legal/gdpr"
      />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-gray-50">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">GDPR Compliance</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                How we protect your data and comply with EU data protection law
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <div className="prose max-w-none">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Your Rights Under GDPR</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <FileText className="w-6 h-6" />,
                      title: "Right to Access",
                      description: "Request a copy of your personal data"
                    },
                    {
                      icon: <Settings className="w-6 h-6" />,
                      title: "Right to Rectification",
                      description: "Correct inaccurate personal data"
                    },
                    {
                      icon: <Users className="w-6 h-6" />,
                      title: "Right to Erasure",
                      description: "Request deletion of your data"
                    },
                    {
                      icon: <Lock className="w-6 h-6" />,
                      title: "Right to Restrict Processing",
                      description: "Limit how we use your data"
                    }
                  ].map((right, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white rounded-lg text-primary-600">
                          {right.icon}
                        </div>
                        <h3 className="font-semibold">{right.title}</h3>
                      </div>
                      <p className="text-gray-600">{right.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Data Processing Principles</h2>
                <p className="text-gray-600 mb-6">
                  We adhere to the following principles when processing your personal data:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Lawfulness, Fairness, and Transparency",
                      description: "We process data legally, fairly, and transparently."
                    },
                    {
                      title: "Purpose Limitation",
                      description: "We collect data for specified, explicit, and legitimate purposes."
                    },
                    {
                      title: "Data Minimization",
                      description: "We limit data collection to what's necessary for our purposes."
                    },
                    {
                      title: "Accuracy",
                      description: "We keep personal data accurate and up to date."
                    },
                    {
                      title: "Storage Limitation",
                      description: "We keep data only as long as necessary."
                    },
                    {
                      title: "Integrity and Confidentiality",
                      description: "We ensure appropriate security of personal data."
                    }
                  ].map((principle, index) => (
                    <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">{principle.title}</h3>
                      <p className="text-gray-600">{principle.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Data Protection Measures</h2>
                <div className="bg-primary-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Technical and Organizational Measures</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700">End-to-end encryption for data transmission</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700">Secure data storage with regular backups</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700">Access controls and authentication</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700">Regular security audits and updates</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Data Processing Activities</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Legal Basis</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Retention Period</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        {
                          purpose: "Account Management",
                          basis: "Contract Performance",
                          retention: "Duration of account + 30 days"
                        },
                        {
                          purpose: "Analytics",
                          basis: "Legitimate Interests",
                          retention: "26 months"
                        },
                        {
                          purpose: "Marketing",
                          basis: "Consent",
                          retention: "Until consent withdrawal"
                        }
                      ].map((activity, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm text-gray-900">{activity.purpose}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{activity.basis}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{activity.retention}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
                <p className="text-gray-600 mb-4">
                  When we transfer personal data outside the EEA, we ensure appropriate safeguards are in place:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Standard Contractual Clauses (SCCs)</li>
                  <li>Adequacy decisions by the European Commission</li>
                  <li>Binding Corporate Rules (BCRs)</li>
                  <li>Data Processing Agreements with third parties</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Our DPO</h2>
                <p className="text-gray-600 mb-4">
                  For any GDPR-related inquiries or to exercise your rights, contact our Data Protection Officer:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2">Email: dpo@qrcodegen.com</p>
                  <p className="text-gray-700">Address: 123 Privacy Street, Security City, 12345</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GDPR;