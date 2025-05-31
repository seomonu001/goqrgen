import React from 'react';
import { Star, MessageSquare, Users, ThumbsUp, Layers } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    content: "This QR generator has streamlined our marketing campaigns. The customization options are fantastic, and the batch generation feature saves us hours of work.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Restaurant Owner",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    content: "Perfect for creating QR codes for our digital menu. The process is simple, and the codes scan perfectly every time. Highly recommended!",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Event Planner",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    content: "I use this tool for all my events. The ability to track QR code scans and customize designs has been invaluable for our business.",
    rating: 5
  },
  {
    name: "Michael Thompson",
    role: "Tech Entrepreneur",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    content: "The best QR generator I've found. Clean interface, powerful features, and excellent reliability. Plus, it's completely free!",
    rating: 5
  }
];

const UserReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-block">
            <span className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-2xl">
              <MessageSquare className="w-8 h-8 text-primary-600" />
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust our QR code generator
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary-600" />
                  <h3 className="text-xl font-semibold text-gray-900">User Reviews</h3>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700 font-medium">98% Satisfaction</span>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{review.name}</h4>
                            <p className="text-sm text-gray-500">{review.role}</p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-primary-400 text-primary-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600">
                          "{review.content}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900">Review Stats</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Overall Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary-400 text-primary-400" />
                      <span className="font-medium text-gray-900">5.0</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 w-[98%]"></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Key Highlights</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-600">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      Easy to use interface
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      Fast QR generation
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      Excellent customization
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      Reliable scanning
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserReviews;