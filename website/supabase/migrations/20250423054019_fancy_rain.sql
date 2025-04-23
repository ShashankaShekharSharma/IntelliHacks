/*
  # Add Stock Price History Functionality

  1. New Tables
    - `stock_price_history`
      - `id` (uuid, primary key)
      - `stock_id` (uuid, foreign key to stocks)
      - `price` (numeric)
      - `recorded_at` (timestamptz)

  2. New Functions
    - `add_stock_price_history`: Adds a new price history record
    - `get_stock_price_history`: Retrieves price history for a stock

  3. Security
    - Enable RLS on `stock_price_history` table
    - Add policy for authenticated users to read price history
*/

-- Create stock price history table
CREATE TABLE IF NOT EXISTS stock_price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_id uuid NOT NULL REFERENCES stocks(id),
  price numeric NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE stock_price_history ENABLE ROW LEVEL SECURITY;

-- Add RLS policy for reading price history
CREATE POLICY "Anyone can read stock price history"
  ON stock_price_history
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to add price history
CREATE OR REPLACE FUNCTION public.add_stock_price_history(
  p_stock_id UUID,
  p_price NUMERIC
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO stock_price_history (stock_id, price)
  VALUES (p_stock_id, p_price);
END;
$$;

-- Function to get price history
CREATE OR REPLACE FUNCTION public.get_stock_price_history(
  p_stock_id UUID
)
RETURNS TABLE (
  price numeric,
  recorded_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT price, recorded_at
  FROM stock_price_history
  WHERE stock_id = p_stock_id
  ORDER BY recorded_at DESC
  LIMIT 100;
$$;