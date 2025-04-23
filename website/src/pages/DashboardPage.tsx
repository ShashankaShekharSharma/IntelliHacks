import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { TrendingUp, TrendingDown, DollarSign, BarChart } from 'lucide-react';

interface Portfolio {
  id: string;
  cash_balance: number;
  portfolio_stocks: PortfolioStock[];
}

interface PortfolioStock {
  id: string;
  quantity: number;
  average_price: number;
  stock: {
    symbol: string;
    name: string;
    current_price: number;
  };
}

const DashboardPage: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previousPrices, setPreviousPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchPortfolio();
    const subscription = supabase
      .channel('portfolio_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'stocks' 
      }, () => {
        fetchPortfolio();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data: portfolioData, error: portfolioError } = await supabase
        .from('portfolios')
        .select(`
          id,
          cash_balance,
          portfolio_stocks (
            id,
            quantity,
            average_price,
            stock:stocks (
              symbol,
              name,
              current_price
            )
          )
        `)
        .limit(1)
        .single();

      if (portfolioError) {
        if (portfolioError.message.includes('JSON object requested, multiple (or no) rows returned')) {
          throw new Error('No portfolio found. Please contact support to create one.');
        }
        throw portfolioError;
      }

      // Store previous prices before updating
      if (portfolio) {
        const newPreviousPrices = { ...previousPrices };
        portfolio.portfolio_stocks.forEach(position => {
          newPreviousPrices[position.stock.symbol] = position.stock.current_price;
        });
        setPreviousPrices(newPreviousPrices);
      }
      
      setPortfolio(portfolioData);
    } catch (error: any) {
      console.error('Error fetching portfolio:', error);
      setError(error.message || 'Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalValue = () => {
    if (!portfolio) return 0;
    const stocksValue = portfolio.portfolio_stocks.reduce((total, position) => {
      return total + (position.quantity * position.stock.current_price);
    }, 0);
    return stocksValue + portfolio.cash_balance;
  };

  const calculateTotalGainLoss = () => {
    if (!portfolio) return 0;
    return portfolio.portfolio_stocks.reduce((total, position) => {
      const currentValue = position.quantity * position.stock.current_price;
      const costBasis = position.quantity * position.average_price;
      return total + (currentValue - costBasis);
    }, 0);
  };

  const calculateDailyGainLoss = () => {
    if (!portfolio) return 0;
    return portfolio.portfolio_stocks.reduce((total, position) => {
      const previousPrice = previousPrices[position.stock.symbol] || position.stock.current_price;
      const priceChange = position.stock.current_price - previousPrice;
      return total + (position.quantity * priceChange);
    }, 0);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <BarChart className="text-red-500 mr-2" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalValue = calculateTotalValue();
  const totalGainLoss = calculateTotalGainLoss();
  const dailyGainLoss = calculateDailyGainLoss();
  const totalGainLossPercent = portfolio ? totalGainLoss / (totalValue - totalGainLoss) : 0;
  const dailyGainLossPercent = portfolio ? dailyGainLoss / (totalValue - dailyGainLoss) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Portfolio Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalValue)}
                </p>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                <BarChart className="text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cash Balance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(portfolio?.cash_balance || 0)}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <DollarSign className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totalGainLoss)}
                  <span className="text-sm ml-1">({formatPercentage(totalGainLossPercent)})</span>
                </p>
              </div>
              <div className={`${totalGainLoss >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'} p-3 rounded-lg`}>
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="text-green-600 dark:text-green-400" />
                ) : (
                  <TrendingDown className="text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Daily Gain/Loss</p>
                <p className={`text-2xl font-bold ${dailyGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(dailyGainLoss)}
                  <span className="text-sm ml-1">({formatPercentage(dailyGainLossPercent)})</span>
                </p>
              </div>
              <div className={`${dailyGainLoss >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'} p-3 rounded-lg`}>
                {dailyGainLoss >= 0 ? (
                  <TrendingUp className="text-green-600 dark:text-green-400" />
                ) : (
                  <TrendingDown className="text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio Positions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total G/L</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Daily G/L</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {portfolio?.portfolio_stocks.map((position) => {
                  const marketValue = position.quantity * position.stock.current_price;
                  const costBasis = position.quantity * position.average_price;
                  const totalGainLoss = marketValue - costBasis;
                  const totalGainLossPercent = (totalGainLoss / costBasis) * 100;
                  
                  const previousPrice = previousPrices[position.stock.symbol] || position.stock.current_price;
                  const dailyPriceChange = position.stock.current_price - previousPrice;
                  const dailyGainLoss = position.quantity * dailyPriceChange;
                  const dailyGainLossPercent = (dailyPriceChange / previousPrice) * 100;

                  return (
                    <tr key={position.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {position.stock.symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {position.stock.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {position.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(position.average_price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(position.stock.current_price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(marketValue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(totalGainLoss)} ({totalGainLossPercent.toFixed(2)}%)
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={dailyGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(dailyGainLoss)} ({dailyGainLossPercent.toFixed(2)}%)
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;