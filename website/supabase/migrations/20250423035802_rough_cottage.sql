/*
  # Create portfolio and market tables

  1. New Tables
    - `portfolios`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `cash_balance` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `stocks`
      - `id` (uuid, primary key)
      - `symbol` (text)
      - `name` (text)
      - `current_price` (numeric)
      - `updated_at` (timestamp)
    
    - `portfolio_stocks`
      - `id` (uuid, primary key)
      - `portfolio_id` (uuid, references portfolios)
      - `stock_id` (uuid, references stocks)
      - `quantity` (numeric)
      - `average_price` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own portfolios
*/

-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  cash_balance numeric NOT NULL DEFAULT 100000,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create stocks table
CREATE TABLE IF NOT EXISTS stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text NOT NULL UNIQUE,
  name text NOT NULL,
  current_price numeric NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Create portfolio_stocks table
CREATE TABLE IF NOT EXISTS portfolio_stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid REFERENCES portfolios NOT NULL,
  stock_id uuid REFERENCES stocks NOT NULL,
  quantity numeric NOT NULL CHECK (quantity >= 0),
  average_price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_stocks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own portfolio"
  ON portfolios
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio"
  ON portfolios
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Everyone can view stocks"
  ON stocks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their portfolio stocks"
  ON portfolio_stocks
  FOR SELECT
  TO authenticated
  USING (
    portfolio_id IN (
      SELECT id FROM portfolios WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their portfolio stocks"
  ON portfolio_stocks
  FOR ALL
  TO authenticated
  USING (
    portfolio_id IN (
      SELECT id FROM portfolios WHERE user_id = auth.uid()
    )
  );

-- Create function to create portfolio on user signup
CREATE OR REPLACE FUNCTION create_portfolio_for_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO portfolios (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Create trigger to create portfolio on user signup
CREATE TRIGGER create_portfolio_after_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_portfolio_for_new_user();

-- Insert some sample stocks
INSERT INTO stocks (symbol, name, current_price) VALUES
  ('AAPL', 'Apple Inc.', 182.52),
  ('MSFT', 'Microsoft Corporation', 415.32),
  ('GOOGL', 'Alphabet Inc.', 143.96),
  ('AMZN', 'Amazon.com Inc.', 175.35),
  ('NVDA', 'NVIDIA Corporation', 788.17),
  ('META', 'Meta Platforms Inc.', 484.03),
  ('TSLA', 'Tesla Inc.', 193.57),
  ('BRK.B', 'Berkshire Hathaway Inc.', 411.47),
  ('JPM', 'JPMorgan Chase & Co.', 183.99),
  ('V', 'Visa Inc.', 283.04)
ON CONFLICT (symbol) DO UPDATE
SET current_price = EXCLUDED.current_price,
    updated_at = now();