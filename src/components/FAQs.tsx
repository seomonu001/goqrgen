import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Search, ArrowRight, MessageCircle, CheckCircle2, XCircle } from 'lucide-react';

const faqs = [
  {
    category: "General",
    icon: <HelpCircle className="w-5 h-5" />,
    questions: [
      {
        question: "Is this QR code generator really free?",
        answer: "Yes! Our QR code generator is completely free to use with no hidden costs. You can create unlimited QR codes with all features available at no charge."
      },
      {
        question: "Are the QR codes permanent?",
        answer: "Yes, once generated, your QR codes will work forever. They are static codes that don't require any ongoing service or internet connection to function."
      }
    ]
  },
  {
    category: "Customization",
    icon: <MessageCircle className="w-5 h-5" />,
    questions: [
      {
        question: "Can I customize the design of my QR code?",
        answer: "Absolutely! You can customize colors, size, error correction levels, and even add your logo to the center of the QR code while maintaining scannability."
      },
      {
        question: "What types of QR codes can I create?",
        answer: "You can create QR codes for URLs, plain text, email addresses, phone numbers, SMS, WiFi networks, and vCard contact information."
      }
    ]
  },
  {
    category: "Security & Technical",
    icon: <CheckCircle2 className="w-5 h-5" />,
    questions: [
      {
        question: "Will my data be secure?",
        answer: "Yes, your data is completely secure. All QR code generation happens locally in your browser - we never store or transmit your data to any server."
      },
      {
        question: "What's the best format to download my QR code?",
        answer: "We recommend PNG for most uses, SVG for scalable graphics, and JPEG for smaller file sizes. All formats are supported by major scanning apps."
      }
    ]
  }
];

const FAQs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (category: string, questionIndex: number) => {
    const key = `${category}-${questionIndex}`;
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(key)) {
      newOpenQuestions.delete(key);
    } else {
      newOpenQuestions.add(key);
    }
    setOpenQuestions(newOpenQuestions);
  };

  const filteredFaqs = faqs.filter(category => {
    if (selectedCategory && category.category !== selectedCategory) return false;
    
    if (!searchTerm) return true;
    
    return category.questions.some(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-block">
            <span className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-2xl">
              <MessageCircle className="w-8 h-8 text-primary-600" />
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our QR code generator
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !selectedCategory
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Categories
            </button>
            {faqs.map((category) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.category
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredFaqs.map((category) => (
              <div
                key={category.category}
                className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq, questionIndex) => {
                    const isOpen = openQuestions.has(`${category.category}-${questionIndex}`);
                    return (
                      <div key={questionIndex} className="transition-all duration-200">
                        <button
                          className="w-full text-left p-6 focus:outline-none"
                          onClick={() => toggleQuestion(category.category, questionIndex)}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900 pr-8">{faq.question}</h4>
                            <div className={`transform transition-transform duration-200 ${
                              isOpen ? 'rotate-45' : 'rotate-0'
                            }`}>
                              <Plus className="w-5 h-5 text-gray-500" />
                            </div>
                          </div>
                          <div className={`mt-4 text-gray-600 transition-all duration-200 ${
                            isOpen ? 'block opacity-100' : 'hidden opacity-0'
                          }`}>
                            {faq.answer}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
              <XCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">No Results Found</h3>
              <p className="text-gray-600">
                Try adjusting your search or category selection
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl font-medium transition-all duration-200 group text-gray-700"
            >
              Contact Support
              <ArrowRight className="ml-2 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;