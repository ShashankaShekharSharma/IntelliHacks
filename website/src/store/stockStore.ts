import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface StockData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_history: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
}

interface StockState {
  stocks: StockData[];
  setStocks: (stocks: StockData[]) => void;
  updateStockPrice: (id: string, newPrice: number) => void;
  startPriceUpdates: () => void;
  stopPriceUpdates: () => void;
  fetchPriceHistory: (stockId: string) => Promise<{ price: number; recorded_at: string; }[]>;
}

const getFluctuationRange = (symbol: string) => {
  // Lower fluctuation for stable stocks
  if (['AMZN', 'GOOGL', 'JPM'].includes(symbol)) {
    return 0.005; // 0.5% max change
  }
  // Higher fluctuation for other stocks
  return 0.02; // 2% max change
};

const generateRandomPriceChange = (currentPrice: number, symbol: string) => {
  const fluctuationRange = getFluctuationRange(symbol);
  const changePercent = (Math.random() - 0.5) * 2 * fluctuationRange;
  return currentPrice * (1 + changePercent);
};

export const useStockStore = create<StockState>((set, get) => {
  let updateInterval: NodeJS.Timeout | null = null;

  return {
    stocks: [],
    setStocks: (stocks) => set({ stocks }),
    updateStockPrice: async (id, newPrice) => {
      // Update price history in Supabase
      const { error: historyError } = await supabase
        .rpc('add_stock_price_history', {
          p_stock_id: id,
          p_price: newPrice
        });

      if (historyError) {
        console.error('Error saving price history:', historyError);
      }

      set((state) => ({
        stocks: state.stocks.map((stock) => {
          if (stock.id === id) {
            const now = new Date().toISOString();
            const lastPrice = stock.price_history[stock.price_history.length - 1]?.close || stock.current_price;
            const newHistoryPoint = {
              time: now,
              open: lastPrice,
              high: Math.max(lastPrice, newPrice),
              low: Math.min(lastPrice, newPrice),
              close: newPrice,
            };

            return {
              ...stock,
              current_price: newPrice,
              price_history: [...stock.price_history, newHistoryPoint].slice(-100),
            };
          }
          return stock;
        }),
      }));

      // Update the current price in Supabase
      const { error: updateError } = await supabase
        .from('stocks')
        .update({ current_price: newPrice })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating stock price:', updateError);
      }
    },
    startPriceUpdates: () => {
      if (updateInterval) return;

      // Initial update
      const { stocks, updateStockPrice } = get();
      stocks.forEach((stock) => {
        const newPrice = generateRandomPriceChange(stock.current_price, stock.symbol);
        updateStockPrice(stock.id, Number(newPrice.toFixed(2)));
      });

      updateInterval = setInterval(() => {
        const { stocks, updateStockPrice } = get();
        stocks.forEach((stock) => {
          const newPrice = generateRandomPriceChange(stock.current_price, stock.symbol);
          updateStockPrice(stock.id, Number(newPrice.toFixed(2)));
        });
      }, 5000);
    },
    stopPriceUpdates: () => {
      if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
      }
    },
    fetchPriceHistory: async (stockId: string) => {
      const { data, error } = await supabase
        .rpc('get_stock_price_history', {
          p_stock_id: stockId
        });

      if (error) {
        console.error('Error fetching price history:', error);
        return [];
      }

      return data || [];
    },
  };
});