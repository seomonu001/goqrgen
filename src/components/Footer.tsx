import React from 'react';
import { QrCode, Github, Twitter, Linkedin, Mail, MapPin, Phone, Globe2, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-700/50 backdrop-blur-sm">
        <div className="container-custom py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Stay Updated
              </h3>
              <p className="text-lg text-gray-300">
                Get the latest updates about new features and QR code best practices.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
                <button className="group px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                  Subscribe
                  <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-white/10 to-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">QR Code Generator</h2>
                <p className="text-primary-400">Create • Customize • Share</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Create custom QR codes for URLs, text, contact information, WiFi networks, and more. 
              Our advanced features help you generate professional QR codes for any purpose.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="social-link group">
                <Github className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </a>
              <a href="#" className="social-link group">
                <Twitter className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </a>
              <a href="#" className="social-link group">
                <Linkedin className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="footer-heading">Features</h3>
            <ul className="footer-list">
              <li>
                <a href="#generator" className="hover:translate-x-1 inline-block">
                  QR Generator
                </a>
              </li>
              <li>
                <a href="#batch" className="hover:translate-x-1 inline-block">
                  Batch Creation
                </a>
              </li>
              <li>
                <a href="#history" className="hover:translate-x-1 inline-block">
                  History
                </a>
              </li>
              <li>
                <a href="#scanner" className="hover:translate-x-1 inline-block">
                  QR Scanner
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-list">
              <li>
                <Link to="/about" className="hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:translate-x-1 inline-block">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-list">
              <li>
                <Link to="/legal/privacy-policy" className="hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/terms-of-service" className="hover:translate-x-1 inline-block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/cookie-policy" className="hover:translate-x-1 inline-block">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/gdpr" className="hover:translate-x-1 inline-block">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="footer-heading">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Mail className="h-4 w-4 text-primary-400" />
                </div>
                <a href="mailto:goqrgen@gmail.com">goqrgen@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Phone className="h-4 w-4 text-primary-400" />
                </div>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200">
                <div className="p-2 bg-white/5 rounded-lg">
                  <MapPin className="h-4 w-4 text-primary-400" />
                </div>
                <span>San Francisco, CA</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Globe2 className="h-4 w-4 text-primary-400" />
                </div>
                <a href="https://goqrgen.com">goqrgen.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left">
              &copy; {currentYear} QR Code Generator. All rights reserved.
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by 
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent font-medium">
                QR Code Generator Team
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;