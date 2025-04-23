import { supabase } from './supabase';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchStockData(symbol: string, stockId: string) {
  try {
    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();
    
    // Check for API limit or error messages
    if (data['Note'] || data['Information']) {
      console.warn('Alpha Vantage API limit or information:', data);
      return null;
    }
    
    if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
      const quote = data['Global Quote'];
      const price = parseFloat(quote['05. price']);
      
      // Update stock price in Supabase
      const { error } = await supabase
        .from('stocks')
        .update({ current_price: price })
        .eq('id', stockId);

      if (error) {
        console.error('Error updating stock price:', error);
      }

      // Add to price history
      await supabase.rpc('add_stock_price_history', {
        p_stock_id: stockId,
        p_price: price
      });

      return {
        price,
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: parseInt(quote['06. volume']),
        timestamp: quote['07. latest trading day']
      };
    }
    
    console.error('Invalid or empty response from Alpha Vantage for symbol:', symbol);
    return null;
  } catch (error) {
    console.error('Error fetching stock data for symbol:', symbol, error);
    return null;
  }
}

export async function fetchIntradayData(symbol: string) {
  try {
    const response = await fetch(
      `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${API_KEY}`
    );
    const data = await response.json();
    
    // Check for API limit or error messages
    if (data['Note'] || data['Information']) {
      console.warn('Alpha Vantage API limit or information:', data);
      return [];
    }
    
    if (data['Time Series (1min)']) {
      const timeSeries = data['Time Series (1min)'];
      return Object.entries(timeSeries).map(([time, values]: [string, any]) => ({
        time,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'])
      })).reverse();
    }
    
    console.error('Invalid or empty intraday data from Alpha Vantage for symbol:', symbol);
    return [];
  } catch (error) {
    console.error('Error fetching intraday data for symbol:', symbol, error);
    return [];
  }
}