import React from 'react';
import { motion } from 'framer-motion';
import SystemFlowDiagram from '../components/SystemFlowDiagram';
import { Cpu, Database, ArrowRight, Zap, BrainCircuit, Shield } from 'lucide-react';

const TechnologyPage: React.FC = () => {
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
              Our Technology
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300 mb-8"
            >
              Explore the innovative architecture that powers our quantum trading platform, delivering superior performance through advanced computational techniques.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Architecture Overview */}
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
              System Architecture
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Our platform combines specialized agents working together to deliver optimized trading performance through a sophisticated workflow.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SystemFlowDiagram />
          </motion.div>
        </div>
      </section>
      
      {/* Key Components */}
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
              Key System Components
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Each component in our architecture is purpose-built to handle specific aspects of the trading process.
            </motion.p>
          </div>
          
          {[
            {
              title: "Quantum Optimization Engine",
              description: "Our proprietary quantum algorithm solves complex portfolio optimization problems exponentially faster than classical methods, finding optimal asset allocations that maximize returns while minimizing risk.",
              icon: Cpu,
              alignment: "right",
              delay: 0.1
            },
            {
              title: "Data Ingestion Pipeline",
              description: "A high-throughput system for processing market data, news, and alternative data sources in real-time, normalizing and preparing it for feature extraction.",
              icon: Database,
              alignment: "left",
              delay: 0.2
            },
            {
              title: "Feature Store",
              description: "Centralized repository of computed features that are used by various agents for analysis, prediction, and optimization tasks.",
              icon: Zap,
              alignment: "right",
              delay: 0.3
            },
            {
              title: "Strategy Agents",
              description: "Multiple concurrent trading algorithms specialized for different market conditions, asset classes, and time frames, working in harmony to generate diversified signals.",
              icon: BrainCircuit,
              alignment: "left",
              delay: 0.4
            },
            {
              title: "Risk Management System",
              description: "Advanced risk controls that monitor portfolio exposure across multiple dimensions and automatically adjust positions to maintain risk parameters.",
              icon: Shield,
              alignment: "right",
              delay: 0.5
            }
          ].map((component, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: component.alignment === "left" ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: component.delay }}
              className={`flex flex-col ${component.alignment === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center mb-16 last:mb-0`}
            >
              <div className="flex-1 mb-8 md:mb-0">
                <div className={`max-w-md ${component.alignment === "left" ? "md:ml-auto md:mr-0" : "md:mr-auto md:ml-0"}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-6">
                    <component.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{component.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">{component.description}</p>
                </div>
              </div>
              <div className="flex-1 w-full max-w-lg">
                <div className="aspect-w-16 aspect-h-9 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-200 dark:border-indigo-800"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Technical Specifications */}
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
              Technical Specifications
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Built with cutting-edge technology to deliver unparalleled performance and reliability.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quantum Processing</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Hybrid quantum-classical architecture</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Quantum annealing for portfolio optimization</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Gate-based quantum circuits for cryptographic security</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Quantum-resistant encryption protocols</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Quantum Random Number Generator (QRNG) for simulations</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Data Processing</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Low-latency data ingestion (less than 1ms)</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Distributed processing across global data centers</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Real-time feature computation</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Petabyte-scale data storage</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>GPU-accelerated machine learning pipelines</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Execution & Reliability</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Smart-order routing across multiple venues</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>99.99% system uptime</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Multi-region failover capability</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Automated compliance verification</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Continuous system monitoring and alerting</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security & Compliance</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>End-to-end encryption for all data</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>SOC 2 Type II certified</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>GDPR and CCPA compliant</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Regular penetration testing</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight size={18} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Regulatory reporting engine with automatic filing</span>
                </li>
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
              Experience Our Technology Firsthand
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Schedule a demo to see how our quantum-powered platform can transform your trading operation.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Request a Demo
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;