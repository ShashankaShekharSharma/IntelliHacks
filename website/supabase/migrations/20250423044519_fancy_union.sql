/*
  # Fix buy_stock function and add unique constraint

  1. Changes
    - Add unique constraint on portfolio_stocks for portfolio_id and stock_id combination
    - Update buy_stock function to handle conflicts properly

  2. Details
    - This ensures we can't have duplicate stock entries for the same portfolio
    - The function will now properly update existing positions when buying more of the same stock
*/

-- Add unique constraint for portfolio_id and stock_id combination
ALTER TABLE portfolio_stocks 
ADD CONSTRAINT portfolio_stocks_portfolio_stock_unique 
UNIQUE (portfolio_id, stock_id);

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS buy_stock(p_portfolio_id uuid, p_stock_id uuid, p_quantity numeric, p_price numeric);

-- Create updated function with proper conflict handling
CREATE OR REPLACE FUNCTION buy_stock(
  p_portfolio_id uuid,
  p_stock_id uuid,
  p_quantity numeric,
  p_price numeric
) RETURNS void AS $$
DECLARE
  v_portfolio_cash numeric;
  v_total_cost numeric;
BEGIN
  -- Calculate total cost
  v_total_cost := p_quantity * p_price;
  
  -- Get current cash balance
  SELECT cash_balance INTO v_portfolio_cash
  FROM portfolios
  WHERE id = p_portfolio_id;
  
  -- Check if enough cash
  IF v_portfolio_cash < v_total_cost THEN
    RAISE EXCEPTION 'Insufficient funds';
  END IF;
  
  -- Update portfolio cash balance
  UPDATE portfolios
  SET cash_balance = cash_balance - v_total_cost
  WHERE id = p_portfolio_id;
  
  -- Insert or update portfolio stock position
  INSERT INTO portfolio_stocks (
    portfolio_id,
    stock_id,
    quantity,
    average_price
  )
  VALUES (
    p_portfolio_id,
    p_stock_id,
    p_quantity,
    p_price
  )
  ON CONFLICT (portfolio_id, stock_id) DO UPDATE
  SET 
    quantity = portfolio_stocks.quantity + EXCLUDED.quantity,
    average_price = (portfolio_stocks.quantity * portfolio_stocks.average_price + 
                    EXCLUDED.quantity * EXCLUDED.average_price) / 
                   (portfolio_stocks.quantity + EXCLUDED.quantity);
END;
$$ LANGUAGE plpgsql;