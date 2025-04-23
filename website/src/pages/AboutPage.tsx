import React from 'react';
import { motion } from 'framer-motion';
import { Award, BrainCircuit, Users, Globe, ChevronRight } from 'lucide-react';

const AboutPage: React.FC = () => {
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
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300 mb-8"
            >
              We're a team of quantum physicists, financial engineers, and machine learning experts dedicated to revolutionizing financial trading.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  QuantumFlow Trading was founded in 2022 by a team of researchers from leading quantum computing labs and financial institutions who recognized the transformative potential of quantum algorithms for financial markets.
                </p>
                <p>
                  What began as theoretical research quickly evolved into a practical system for optimizing trading strategies and portfolio construction using quantum computing principles.
                </p>
                <p>
                  Today, our platform harnesses the power of quantum computing to provide institutional investors and professional traders with a significant edge in increasingly complex and competitive markets.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-lg"
            >
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mt-1 mr-4">
                    <BrainCircuit size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Origins in Research</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Founded by PhDs from top quantum physics and financial engineering programs who sought to apply quantum principles to financial markets.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mt-1 mr-4">
                    <Award size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Breakthrough Platform</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      After three years of development, we launched our quantum-enhanced trading platform, showing significant outperformance compared to classical approaches.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mt-1 mr-4">
                    <Users size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Growing Team</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Now with over 50 team members across quantum physics, financial mathematics, machine learning, and software engineering.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mt-1 mr-4">
                    <Globe size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Reach</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Now serving clients across North America, Europe, and Asia with offices in New York, London, and Singapore.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Leadership Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Meet the experts driving our quantum trading revolution.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Elena Zhao",
                title: "CEO & Co-Founder",
                bio: "Former quantum physics researcher at MIT with 15+ years in financial markets. Led quantitative trading teams at top hedge funds before founding QuantumFlow.",
                delay: 0.1
              },
              {
                name: "Dr. Marcus Chen",
                title: "CTO & Co-Founder",
                bio: "PhD in quantum computing from Caltech. Previously led quantum algorithm development at a major tech company before co-founding QuantumFlow.",
                delay: 0.2
              },
              {
                name: "Sarah Johnson",
                title: "Chief Investment Officer",
                bio: "20+ years of experience in algorithmic trading. Previously head of systematic strategies at a leading global investment bank.",
                delay: 0.3
              },
              {
                name: "Dr. Robert Kim",
                title: "Chief Research Officer",
                bio: "Former professor of financial mathematics with expertise in stochastic processes and optimization theory applied to financial markets.",
                delay: 0.4
              },
              {
                name: "Michael Rodriguez",
                title: "Chief Operating Officer",
                bio: "Experienced operations executive with background scaling fintech startups from early stage to successful acquisition.",
                delay: 0.5
              },
              {
                name: "Dr. Alisha Patel",
                title: "Head of Quantum Algorithms",
                bio: "PhD in quantum information theory. Leading our team developing novel quantum approaches to portfolio optimization and signal processing.",
                delay: 0.6
              }
            ].map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: person.delay }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-24"></div>
                <div className="px-6 py-8 relative">
                  <div className="absolute -top-12 left-6 bg-gray-200 dark:bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="pt-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{person.name}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">{person.title}</p>
                    <p className="text-gray-600 dark:text-gray-300">{person.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Values */}
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
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              The principles that guide our work and shape our culture.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Scientific Rigor",
                description: "We apply the same methodical approach and empirical validation to our financial strategies that we use in scientific research.",
                delay: 0.1
              },
              {
                title: "Technological Innovation",
                description: "We continuously push the boundaries of what's possible with quantum computing and financial technology.",
                delay: 0.2
              },
              {
                title: "Integrity & Transparency",
                description: "We believe in clear, honest communication with our clients and complete transparency about our methods and results.",
                delay: 0.3
              },
              {
                title: "Client Partnership",
                description: "We view our relationships with clients as long-term partnerships built on trust, collaboration, and shared success.",
                delay: 0.4
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: value.delay }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-l-4 border-indigo-500"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Investors & Partners */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Backed By The Best
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Our investors and partners who believe in our vision.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="flex items-center justify-center h-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div className="bg-gray-200 dark:bg-gray-700 h-8 w-32 rounded"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Career Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Join Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We're always looking for exceptional talent to join our mission of revolutionizing financial markets with quantum computing.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                If you're passionate about quantum computing, financial markets, or building cutting-edge technology, we'd love to hear from you.
              </p>
              <a
                href="/careers"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                View Open Positions
                <ChevronRight size={18} className="ml-2" />
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Openings</h3>
              <ul className="space-y-4">
                {[
                  "Quantum Algorithm Researcher",
                  "Senior Machine Learning Engineer",
                  "Financial Data Scientist",
                  "Distributed Systems Engineer",
                  "Product Manager, Trading Solutions",
                  "Client Success Manager"
                ].map((position, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronRight size={16} className="text-indigo-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{position}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Discover the Quantum Advantage?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Schedule a consultation with our team to learn how our quantum trading platform can transform your investment strategies.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;