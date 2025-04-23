/*
  # Update Stock Data

  1. Changes
    - Update stock prices with latest market data
    - Add any missing stocks
    
  2. Details
    - Uses ON CONFLICT to handle existing records
    - Updates prices and timestamps for existing stocks
*/

-- Insert/update real stock data
INSERT INTO stocks (symbol, name, current_price) VALUES
  ('AAPL', 'Apple Inc.', 169.30),
  ('MSFT', 'Microsoft Corporation', 399.12),
  ('GOOGL', 'Alphabet Inc.', 147.60),
  ('AMZN', 'Amazon.com Inc.', 178.15),
  ('NVDA', 'NVIDIA Corporation', 881.86),
  ('META', 'Meta Platforms Inc.', 509.58),
  ('TSLA', 'Tesla Inc.', 172.82),
  ('BRK.B', 'Berkshire Hathaway Inc.', 408.89),
  ('JPM', 'JPMorgan Chase & Co.', 196.62),
  ('V', 'Visa Inc.', 279.87)
ON CONFLICT (symbol) DO UPDATE
SET 
  current_price = EXCLUDED.current_price,
  name = EXCLUDED.name,
  updated_at = now();