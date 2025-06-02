import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import HowToUse from './components/HowToUse';
import WhyChooseUs from './components/WhyChooseUs';
import QRCodeGenerator from './components/QRCodeGenerator';
import BatchGenerator from './components/BatchGenerator';
import QRHistory from './components/QRHistory';
import QRScanner from './components/QRScanner';
import UserReviews from './components/UserReviews';
import FAQs from './components/FAQs';
import BackToTop from './components/BackToTop';

// Pages
import AboutUs from './pages/AboutUs';

// Legal Pages
import CookiePolicy from './pages/legal/CookiePolicy';
import GDPR from './pages/legal/GDPR';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          
          <Routes>
            <Route path="/" element={
              <main className="flex-grow">
                <Hero />
                <Features />
                <HowToUse />
                <QRCodeGenerator />
                <WhyChooseUs />
                <BatchGenerator />
                <QRHistory />
                <UserReviews />
                <QRScanner />
                <FAQs />
              </main>
            } />
            
            <Route path="/about" element={<AboutUs />} />
            
            {/* Legal Routes */}
            <Route path="/legal/cookie-policy" element={<CookiePolicy />} />
            <Route path="/legal/gdpr" element={<GDPR />} />
            <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms-of-service" element={<TermsOfService />} />
          </Routes>
          
          <Footer />
          <BackToTop />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;