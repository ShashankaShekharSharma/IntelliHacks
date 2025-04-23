import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { fetchStockData, fetchIntradayData } from '../lib/alphavantage';

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

export const useStockStore = create<StockState>((set, get) => {
  let updateInterval: NodeJS.Timeout | null = null;

  const addPriceToHistory = (stock: StockData, newPrice: number) => {
    const now = new Date().toISOString();
    const lastPrice = stock.price_history[stock.price_history.length - 1]?.close || stock.current_price;
    
    return {
      time: now,
      open: lastPrice,
      high: Math.max(lastPrice, newPrice),
      low: Math.min(lastPrice, newPrice),
      close: newPrice,
    };
  };

  const updateStockPrices = async () => {
    const { stocks } = get();
    
    // Update stocks sequentially to avoid API rate limits
    for (const stock of stocks) {
      try {
        const data = await fetchStockData(stock.symbol, stock.id);
        if (data) {
          // Only update if price has changed
          if (data.price !== stock.current_price) {
            await get().updateStockPrice(stock.id, data.price);
          }
        }
      } catch (error) {
        console.error(`Error updating ${stock.symbol}:`, error);
      }
      
      // Wait 12 seconds between requests to stay within API limits
      await new Promise(resolve => setTimeout(resolve, 12000));
    }
  };

  return {
    stocks: [],
    setStocks: (stocks) => set({ stocks }),
    updateStockPrice: async (id, newPrice) => {
      try {
        // Add to price history in Supabase
        const { error: historyError } = await supabase
          .rpc('add_stock_price_history', {
            p_stock_id: id,
            p_price: newPrice
          });

        if (historyError) {
          console.error('Error saving price history:', historyError);
        }

        // Update local state
        set((state) => ({
          stocks: state.stocks.map((stock) => {
            if (stock.id === id) {
              // Only update if price has actually changed
              if (stock.current_price !== newPrice) {
                const newHistoryPoint = addPriceToHistory(stock, newPrice);
                return {
                  ...stock,
                  current_price: newPrice,
                  price_history: [...stock.price_history, newHistoryPoint].slice(-100), // Keep last 100 points
                };
              }
            }
            return stock;
          }),
        }));

        // Update stock price in Supabase
        const { error: updateError } = await supabase
          .from('stocks')
          .update({ 
            current_price: newPrice,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (updateError) {
          console.error('Error updating stock price:', updateError);
        }
      } catch (error) {
        console.error('Error in updateStockPrice:', error);
      }
    },
    startPriceUpdates: async () => {
      if (updateInterval) return;

      // Initial update
      await updateStockPrices();

      // Update every minute, but stagger requests to stay within API limits
      updateInterval = setInterval(updateStockPrices, 60000);
    },
    stopPriceUpdates: () => {
      if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
      }
    },
    fetchPriceHistory: async (stockId: string) => {
      try {
        const { data, error } = await supabase
          .rpc('get_stock_price_history', {
            p_stock_id: stockId
          });

        if (error) {
          console.error('Error fetching price history:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Error in fetchPriceHistory:', error);
        return [];
      }
    },
  };
});