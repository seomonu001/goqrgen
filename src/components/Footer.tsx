import React from 'react';
import { QrCode, Github, Twitter, Linkedin, Mail, MapPin, Phone, Globe2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">Stay Updated</h3>
              <p className="text-gray-300">
                Get the latest updates about new features and QR code best practices.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-white bg-opacity-10 rounded-lg">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">QR Code Generator</h2>
                <p className="text-primary-400">Create • Customize • Share</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Create custom QR codes for URLs, text, contact information, WiFi networks, and more. 
              Our advanced features help you generate professional QR codes for any purpose.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="social-link">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="social-link">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="social-link">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="footer-heading">Features</h3>
            <ul className="footer-list">
              <li><a href="#generator">QR Generator</a></li>
              <li><a href="#batch">Batch Creation</a></li>
              <li><a href="#history">History</a></li>
              <li><a href="#scanner">QR Scanner</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-list">
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-list">
              <li><Link to="/legal/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/legal/terms-of-service">Terms of Service</Link></li>
              <li><Link to="/legal/cookie-policy">Cookie Policy</Link></li>
              <li><Link to="/legal/gdpr">GDPR</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="footer-heading">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <a href="mailto:goqrgen@gmail.com">goqrgen@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span>San Francisco, CA</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-primary-400" />
                <a href="https://goqrgen.com">goqrgen.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left">
              &copy; {currentYear} QR Code Generator. All rights reserved.
            </p>
            <p className="text-gray-400 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500" /> by QR Code Generator Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;