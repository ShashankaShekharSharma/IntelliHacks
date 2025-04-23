import React from 'react';
import { motion } from 'framer-motion';
import PerformanceChart from '../components/PerformanceChart';
import { BarChart, PieChart, Calendar, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const PerformanceMetric: React.FC<{
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ElementType;
  delay?: number;
}> = ({ title, value, change, isPositive = true, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
          {change && (
            <div className="flex items-center mt-2">
              {isPositive ? (
                <ArrowUpRight size={16} className="text-green-500 mr-1" />
              ) : (
                <ArrowDownRight size={16} className="text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
          <Icon size={20} className="text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
    </motion.div>
  );
};

const PerformancePage: React.FC = () => {
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
              Performance Metrics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300 mb-8"
            >
              Detailed analysis of our quantum trading strategy performance across different market conditions and timeframes.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Key Metrics Grid */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Key Performance Metrics
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PerformanceMetric
              title="Annual Return"
              value="32.4%"
              change="↑ 8.7% YoY"
              isPositive={true}
              icon={BarChart}
              delay={0.1}
            />
            <PerformanceMetric
              title="Sharpe Ratio"
              value="1.92"
              change="↑ 0.24 YoY"
              isPositive={true}
              icon={Activity}
              delay={0.2}
            />
            <PerformanceMetric
              title="Max Drawdown"
              value="-7.3%"
              change="↓ 2.1% YoY"
              isPositive={true}
              icon={ArrowDownRight}
              delay={0.3}
            />
            <PerformanceMetric
              title="Win Rate"
              value="68.5%"
              change="↑ 3.2% YoY"
              isPositive={true}
              icon={PieChart}
              delay={0.4}
            />
          </div>
        </div>
      </section>
      
      {/* Performance Charts */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Performance History
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PerformanceChart 
                title="12-Month Performance Comparison" 
                subtitle="Quantum Strategy vs Traditional Strategy vs Market Benchmark" 
              />
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Monthly Returns (%)</h3>
                <div className="grid grid-cols-4 gap-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                    <div key={index} className="p-2 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{month}</p>
                      <p className={`font-semibold ${index % 3 === 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {index % 3 === 0 ? '-' : '+'}
                        {(Math.random() * 5 + 1).toFixed(1)}%
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Performance by Asset Class</h3>
                <div className="space-y-4">
                  {[
                    { asset: 'Equities', return: '+28.4%', allocation: '40%' },
                    { asset: 'Fixed Income', return: '+12.2%', allocation: '25%' },
                    { asset: 'Commodities', return: '+18.7%', allocation: '15%' },
                    { asset: 'Crypto', return: '+47.3%', allocation: '10%' },
                    { asset: 'Forex', return: '+22.1%', allocation: '10%' },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">{item.asset}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Allocation: {item.allocation}</p>
                      </div>
                      <div className="text-green-500 font-semibold">{item.return}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benchmarking */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Benchmark Comparison
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Metric</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Quantum Strategy</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Traditional Algo</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">S&P 500</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'Annual Return', quantum: '32.4%', traditional: '18.7%', sp500: '12.3%', advantage: '+14.7%' },
                    { metric: 'Sharpe Ratio', quantum: '1.92', traditional: '1.41', sp500: '0.87', advantage: '+0.51' },
                    { metric: 'Max Drawdown', quantum: '-7.3%', traditional: '-12.8%', sp500: '-18.2%', advantage: '+5.5%' },
                    { metric: 'Volatility', quantum: '16.8%', traditional: '19.4%', sp500: '22.7%', advantage: '+2.6%' },
                    { metric: 'Beta', quantum: '0.68', traditional: '0.83', sp500: '1.00', advantage: '+0.15' },
                    { metric: 'Alpha', quantum: '18.2%', traditional: '8.9%', sp500: '0.0%', advantage: '+9.3%' },
                    { metric: 'Win Rate', quantum: '68.5%', traditional: '58.3%', sp500: 'N/A', advantage: '+10.2%' },
                    { metric: 'Sortino Ratio', quantum: '2.34', traditional: '1.67', sp500: '1.12', advantage: '+0.67' },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">{row.metric}</td>
                      <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{row.quantum}</td>
                      <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{row.traditional}</td>
                      <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{row.sp500}</td>
                      <td className="py-4 px-4 text-sm font-medium text-green-500">{row.advantage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Market Conditions */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Performance Across Market Conditions
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                condition: 'Bull Market', 
                performance: '+38.2%', 
                description: 'Outperformed benchmark by +12.4%',
                color: 'from-green-400 to-green-600'
              },
              { 
                condition: 'Bear Market', 
                performance: '+8.7%', 
                description: 'Outperformed benchmark by +21.5%',
                color: 'from-indigo-400 to-indigo-600'
              },
              { 
                condition: 'High Volatility', 
                performance: '+22.3%', 
                description: 'Outperformed benchmark by +15.8%',
                color: 'from-purple-400 to-purple-600'
              },
              { 
                condition: 'Low Volatility', 
                performance: '+18.9%', 
                description: 'Outperformed benchmark by +7.3%',
                color: 'from-blue-400 to-blue-600'
              },
              { 
                condition: 'Rising Rates', 
                performance: '+20.4%', 
                description: 'Outperformed benchmark by +16.2%',
                color: 'from-yellow-400 to-yellow-600'
              },
              { 
                condition: 'Falling Rates', 
                performance: '+27.8%', 
                description: 'Outperformed benchmark by +9.1%',
                color: 'from-red-400 to-red-600'
              },
            ].map((condition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <div className={`bg-gradient-to-r ${condition.color} px-6 py-4 text-white`}>
                  <h3 className="text-xl font-semibold mb-1">{condition.condition}</h3>
                  <p className="text-2xl font-bold">{condition.performance}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                  <p className="text-gray-700 dark:text-gray-300">{condition.description}</p>
                </div>
              </motion.div>
            ))}
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
              Ready to Experience Quantum-Enhanced Returns?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Schedule a personalized demo to see how our platform can transform your trading performance.
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

export default PerformancePage;