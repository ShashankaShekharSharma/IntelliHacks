import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-black dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300 mb-8"
            >
              Get in touch to learn more about our quantum trading platform and how it can transform your investment strategy.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Get In Touch</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mt-1 mr-4">
                    <MapPin size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Visit Us</h3>
                    <address className="not-italic text-gray-600 dark:text-gray-300">
                      <p>DhanYaantra Headquarters</p>
                      <p>Financial District</p>
                      <p>New York, NY 10004</p>
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mt-1 mr-4">
                    <Mail size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">info@dhanyaantra.com</p>
                    <p className="text-gray-600 dark:text-gray-300">support@dhanyaantra.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mt-1 mr-4">
                    <Phone size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">+1 (212) 555-0123</p>
                    <p className="text-gray-600 dark:text-gray-300">+1 (800) 555-0100</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mt-1 mr-4">
                    <Clock size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Business Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM ET</p>
                    <p className="text-gray-600 dark:text-gray-300">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Global Offices</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { city: "London", country: "United Kingdom" },
                    { city: "Singapore", country: "Singapore" },
                    { city: "Tokyo", country: "Japan" },
                    { city: "Zurich", country: "Switzerland" },
                  ].map((office, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded">
                      <h4 className="font-medium text-gray-900 dark:text-white">{office.city}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{office.country}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Find answers to common questions about our platform and services.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "What makes quantum trading different from traditional algorithmic trading?",
                answer: "Quantum trading leverages quantum computing principles to solve complex optimization problems exponentially faster than classical methods. This allows for more efficient portfolio optimization, better risk management, and identification of market opportunities that would be missed by traditional algorithms.",
                delay: 0.1
              },
              {
                question: "Do I need to understand quantum computing to use your platform?",
                answer: "No, our platform is designed with an intuitive interface that doesn't require knowledge of quantum computing. Our team handles the complex technical aspects while providing you with actionable insights and optimized trading strategies.",
                delay: 0.2
              },
              {
                question: "What types of assets does your platform support?",
                answer: "Our platform supports a wide range of asset classes including equities, fixed income, commodities, cryptocurrencies, and forex. The quantum optimization engine can work across multiple asset classes simultaneously to find optimal allocation strategies.",
                delay: 0.3
              },
              {
                question: "How quickly can I get started with your platform?",
                answer: "After an initial consultation, we typically have clients up and running within 2-4 weeks. This includes system integration, strategy customization, and training for your team on how to best utilize the platform's capabilities.",
                delay: 0.4
              },
              {
                question: "Is my data secure on your platform?",
                answer: "Absolutely. We implement multiple layers of security including end-to-end encryption, secure multi-factor authentication, and regular security audits. We also offer private deployments for clients with heightened security requirements.",
                delay: 0.5
              },
              {
                question: "What kind of performance improvements can I expect?",
                answer: "While results vary depending on market conditions and specific use cases, our clients typically see 15-30% improvement in risk-adjusted returns compared to traditional algorithmic approaches, with particularly strong outperformance during volatile market periods.",
                delay: 0.6
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: faq.delay }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900 z-10"></div>
        <div className="bg-gray-300 dark:bg-gray-600 w-full h-96"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Transform Your Trading Strategy?</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Schedule a personalized demo to see how our quantum-powered platform can give you the competitive edge in today's complex markets.
            </p>
            <a
              href="#"
              className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;