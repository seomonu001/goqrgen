import React, { useState } from 'react';
import { QrCode, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <QrCode className="h-8 w-8 text-primary-600" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">QR Code Generator</h1>
              <p className="text-sm text-gray-500 hidden md:block">Create custom QR codes for anything</p>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              Features
            </a>
            <a href="#generator" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              Generator
            </a>
            <a href="#history" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              History
            </a>
            <a href="#scanner" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              Scanner
            </a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="#generator" 
              className="btn-primary animate-fade-in"
            >
              Create QR Code
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-200 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#generator" 
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Generator
              </a>
              <a 
                href="#history" 
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                History
              </a>
              <a 
                href="#scanner" 
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Scanner
              </a>
              <a 
                href="#generator" 
                className="btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Create QR Code
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;