import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 dark:from-black dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
              <span className="block">Quantum-Powered</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                Trading Platform
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Harness the power of quantum computing to optimize your trading strategies and achieve superior returns.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/technology" 
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-indigo-500/20"
              >
                Explore Technology
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/performance" 
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 rounded-lg font-medium transition-colors duration-200"
              >
                View Performance
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[400px] bg-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-indigo-500/30 shadow-lg z-20 max-w-xs">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-400">quantum_terminal</div>
                </div>
                <div className="text-gray-300 font-mono text-xs space-y-2">
                  <div className="flex">
                    <span className="text-purple-400 mr-2">$</span>
                    <span>initialize quantum_optimization</span>
                  </div>
                  <div className="text-gray-500">Processing market data...</div>
                  <div className="text-gray-500">Generating features...</div>
                  <div className="text-gray-500">Optimizing portfolio weights...</div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Optimization complete</span>
                  </div>
                  <div className="flex">
                    <span className="text-purple-400 mr-2">$</span>
                    <span>generate_trade_signals</span>
                  </div>
                  <div className="text-gray-500">Analyzing patterns...</div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Signals generated</span>
                  </div>
                  <div className="flex">
                    <span className="text-purple-400 mr-2">$</span>
                    <span className="relative">
                      execute_trades<span className="animate-blink">_</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;