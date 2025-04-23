import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import PerformanceChart from '../components/PerformanceChart';
import { Cpu, Zap, Shield, TrendingUp, BarChart4, Lightbulb, Award, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
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
              Advanced Trading Intelligence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Our platform leverages quantum computing and artificial intelligence to deliver superior trading performance.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Quantum Computing"
              description="Harness the power of quantum algorithms to solve complex portfolio optimization problems exponentially faster than classical methods."
              icon={Cpu}
              delay={0.1}
            />
            <FeatureCard
              title="Real-time Processing"
              description="Process market data in real-time with our high-performance ingestion pipeline, enabling immediate response to market changes."
              icon={Zap}
              delay={0.2}
            />
            <FeatureCard
              title="Advanced Risk Management"
              description="Our risk agent continuously monitors portfolio exposure and adjusts positions to maintain your defined risk parameters."
              icon={Shield}
              delay={0.3}
            />
            <FeatureCard
              title="Multi-strategy Approach"
              description="Combine multiple trading strategies across different timeframes and asset classes for diversified returns."
              icon={BarChart4}
              delay={0.4}
            />
            <FeatureCard
              title="Continuous Learning"
              description="Feedback loops and adaptive algorithms ensure our system evolves with changing market conditions."
              icon={Lightbulb}
              delay={0.5}
            />
            <FeatureCard
              title="Performance Analytics"
              description="Comprehensive dashboards provide detailed insights into strategy performance, attribution, and risk metrics."
              icon={TrendingUp}
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      {/* Performance Preview Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Quantum-Enhanced Performance
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Our quantum-powered strategies have consistently outperformed traditional algorithms and market benchmarks in backtesting and live trading environments.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Annual Return</p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">+32.4%</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sharpe Ratio</p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">1.92</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Max Drawdown</p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">-7.3%</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">68.5%</p>
                  </div>
                </div>
                
                <Link 
                  to="/performance" 
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  View detailed performance metrics
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PerformanceChart 
                title="12-Month Performance Comparison" 
                subtitle="Quantum Strategy vs Traditional Strategy vs Market Benchmark" 
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                See why top financial institutions and professional traders choose our platform.
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The quantum optimization capabilities have revolutionized our portfolio management approach. We've seen significant alpha generation since implementation.",
                author: "Sarah Chen",
                title: "CIO, Quantum Capital Partners",
                delay: 0.1
              },
              {
                quote: "This platform's ability to process alternative data sets and extract actionable signals gives us a clear edge in today's competitive markets.",
                author: "Michael Rodriguez",
                title: "Head of Algorithmic Trading, GTS Securities",
                delay: 0.2
              },
              {
                quote: "The risk management system has proven invaluable during volatile market periods, systematically reducing our drawdowns while maintaining performance.",
                author: "Jennifer Park",
                title: "Risk Manager, Horizon Investments",
                delay: 0.3
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: testimonial.delay }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Trading Strategy?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join leading institutions already leveraging our quantum-powered trading platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Request a Demo
              </Link>
              <Link
                to="/technology"
                className="px-8 py-4 bg-transparent text-white border border-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Trusted By Industry Leaders
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 flex items-center justify-center">
                <div className="bg-gray-200 dark:bg-gray-700 h-6 w-32 rounded opacity-50"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;