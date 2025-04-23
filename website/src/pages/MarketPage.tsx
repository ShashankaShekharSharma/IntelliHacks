import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useStockStore } from '../store/stockStore';
import StockChart from '../components/StockChart';
import { Line } from 'react-chartjs-2';

interface Stock {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

interface Portfolio {
  id: string;
  cash_balance: number;
}

const MarketPage: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const { stocks, setStocks, startPriceUpdates, stopPriceUpdates } = useStockStore();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
  const [transactionStatus, setTransactionStatus] = useState<{ [key: string]: string }>({});
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  useEffect(() => {
    fetchStocksAndPortfolio();
    return () => {
      // Don't stop price updates when unmounting
      // This allows updates to continue in the background
    };
  }, [user]);

  // Start price updates when the component mounts
  useEffect(() => {
    startPriceUpdates();
  }, []);

  const fetchStocksAndPortfolio = async () => {
    try {
      if (!user) {
        setError('Please sign in to access the market');
        setLoading(false);
        return;
      }

      const [stocksResponse, portfolioResponse] = await Promise.all([
        supabase.from('stocks').select('*').order('symbol'),
        supabase
          .from('portfolios')
          .select('id, cash_balance')
          .eq('user_id', user.id)
          .limit(1)
          .single()
      ]);

      if (stocksResponse.error) throw stocksResponse.error;
      if (portfolioResponse.error) {
        if (portfolioResponse.error.message.includes('JSON object requested, multiple (or no) rows returned')) {
          throw new Error('No portfolio found. Please contact support to create one.');
        }
        throw portfolioResponse.error;
      }

      const stocksWithHistory = stocksResponse.data.map(stock => ({
        ...stock,
        price_history: [{
          time: new Date().toISOString(),
          open: stock.current_price,
          high: stock.current_price,
          low: stock.current_price,
          close: stock.current_price,
        }],
      }));

      setStocks(stocksWithHistory);
      setPortfolio(portfolioResponse.data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Failed to load market data');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (stockId: string, value: string) => {
    const numValue = value === '' ? 0 : Math.max(0, parseInt(value));
    setQuantity({ ...quantity, [stockId]: numValue });
  };

  const handleTransaction = async (stockId: string, type: 'buy' | 'sell') => {
    if (!portfolio) return;
    
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return;

    const qty = quantity[stockId] || 0;
    if (qty <= 0) {
      setTransactionStatus({ ...transactionStatus, [stockId]: 'Please enter a valid quantity' });
      return;
    }

    const totalCost = qty * stock.current_price;

    try {
      if (type === 'buy') {
        if (totalCost > portfolio.cash_balance) {
          setTransactionStatus({ ...transactionStatus, [stockId]: 'Insufficient funds' });
          return;
        }

        const { error } = await supabase.rpc('buy_stock', {
          p_stock_id: stockId,
          p_quantity: qty,
          p_price: stock.current_price
        });

        if (error) throw error;
      } else {
        const { error } = await supabase.rpc('sell_stock', {
          p_stock_id: stockId,
          p_quantity: qty,
          p_price: stock.current_price
        });

        if (error) throw error;
      }

      setQuantity({ ...quantity, [stockId]: 0 });
      setTransactionStatus({ 
        ...transactionStatus, 
        [stockId]: `Successfully ${type === 'buy' ? 'bought' : 'sold'} ${qty} shares` 
      });

      fetchStocksAndPortfolio();

      setTimeout(() => {
        setTransactionStatus(prev => {
          const newStatus = { ...prev };
          delete newStatus[stockId];
          return newStatus;
        });
      }, 3000);

    } catch (error) {
      console.error('Transaction error:', error);
      setTransactionStatus({ 
        ...transactionStatus, 
        [stockId]: 'Transaction failed. Please try again.' 
      });
    }
  };

  const renderStockFluctuationChart = () => {
    const data = {
      labels: stocks[0]?.price_history.map(p => new Date(p.time).toLocaleTimeString()) || [],
      datasets: stocks.map(stock => ({
        label: stock.symbol,
        data: stock.price_history.map(p => p.close),
        borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
        tension: 0.4,
        fill: false,
      })),
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: 'rgba(209, 213, 219, 1)',
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(107, 114, 128, 0.1)',
          },
          ticks: {
            color: 'rgba(156, 163, 175, 1)',
          },
        },
        y: {
          grid: {
            color: 'rgba(107, 114, 128, 0.1)',
          },
          ticks: {
            color: 'rgba(156, 163, 175, 1)',
          },
        },
      },
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Stock Price Movements</h2>
        <div className="h-[400px]">
          <Line data={data} options={options} />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
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
              <AlertCircle className="text-red-500 mr-2" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            Market
          </motion.h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Cash Balance: </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              ${portfolio?.cash_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {renderStockFluctuationChart()}

        {selectedStock && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <StockChart
              symbol={stocks.find(s => s.id === selectedStock)?.symbol || ''}
              data={stocks.find(s => s.id === selectedStock)?.price_history || []}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {stocks.map((stock) => {
                  const priceHistory = stock.price_history;
                  const previousPrice = priceHistory.length > 1 
                    ? priceHistory[priceHistory.length - 2].close 
                    : stock.current_price;
                  const priceChange = stock.current_price - previousPrice;
                  const priceChangePercent = (priceChange / previousPrice) * 100;

                  return (
                    <tr 
                      key={stock.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                        selectedStock === stock.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                      }`}
                      onClick={() => setSelectedStock(stock.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {stock.symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {stock.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        ${stock.current_price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <span className={priceChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                          </span>
                          {priceChange >= 0 ? (
                            <TrendingUp size={16} className="ml-2 text-green-500" />
                          ) : (
                            <TrendingDown size={16} className="ml-2 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          value={quantity[stock.id] || ''}
                          onChange={(e) => handleQuantityChange(stock.id, e.target.value)}
                          className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Qty"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTransaction(stock.id, 'buy');
                            }}
                            className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                          >
                            Buy
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTransaction(stock.id, 'sell');
                            }}
                            className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
                          >
                            Sell
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {transactionStatus[stock.id] && (
                          <span className={`${
                            transactionStatus[stock.id].includes('Successfully')
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}>
                            {transactionStatus[stock.id]}
                          </span>
                        )}
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

export default MarketPage;