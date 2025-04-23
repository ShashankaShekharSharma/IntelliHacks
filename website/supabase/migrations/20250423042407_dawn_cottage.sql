/*
  # Create trading functions for stock transactions

  1. Functions
    - buy_stock: Handles stock purchase transactions
    - sell_stock: Handles stock sale transactions

  2. Security
    - Functions are security definer to access RLS-protected tables
    - Input validation and error handling
*/

-- Function to buy stocks
CREATE OR REPLACE FUNCTION buy_stock(
  p_stock_id uuid,
  p_quantity numeric,
  p_price numeric
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_portfolio_id uuid;
  v_cash_balance numeric;
  v_total_cost numeric;
BEGIN
  -- Get the user's portfolio
  SELECT id, cash_balance INTO v_portfolio_id, v_cash_balance
  FROM portfolios
  WHERE user_id = auth.uid()
  LIMIT 1;

  -- Calculate total cost
  v_total_cost := p_quantity * p_price;

  -- Check if user has enough cash
  IF v_cash_balance < v_total_cost THEN
    RAISE EXCEPTION 'Insufficient funds';
  END IF;

  -- Begin transaction
  BEGIN
    -- Update portfolio cash balance
    UPDATE portfolios
    SET cash_balance = cash_balance - v_total_cost
    WHERE id = v_portfolio_id;

    -- Insert or update portfolio_stocks
    INSERT INTO portfolio_stocks (
      portfolio_id,
      stock_id,
      quantity,
      average_price
    )
    VALUES (
      v_portfolio_id,
      p_stock_id,
      p_quantity,
      p_price
    )
    ON CONFLICT (portfolio_id, stock_id)
    DO UPDATE SET
      quantity = portfolio_stocks.quantity + EXCLUDED.quantity,
      average_price = (portfolio_stocks.quantity * portfolio_stocks.average_price + p_quantity * p_price) / (portfolio_stocks.quantity + p_quantity);
  END;
END;
$$;

-- Function to sell stocks
CREATE OR REPLACE FUNCTION sell_stock(
  p_stock_id uuid,
  p_quantity numeric,
  p_price numeric
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_portfolio_id uuid;
  v_current_quantity numeric;
  v_total_value numeric;
BEGIN
  -- Get the user's portfolio
  SELECT id INTO v_portfolio_id
  FROM portfolios
  WHERE user_id = auth.uid()
  LIMIT 1;

  -- Get current quantity
  SELECT quantity INTO v_current_quantity
  FROM portfolio_stocks
  WHERE portfolio_id = v_portfolio_id AND stock_id = p_stock_id;

  -- Check if user has enough shares
  IF v_current_quantity IS NULL OR v_current_quantity < p_quantity THEN
    RAISE EXCEPTION 'Insufficient shares';
  END IF;

  -- Calculate total value
  v_total_value := p_quantity * p_price;

  -- Begin transaction
  BEGIN
    -- Update portfolio cash balance
    UPDATE portfolios
    SET cash_balance = cash_balance + v_total_value
    WHERE id = v_portfolio_id;

    -- Update portfolio_stocks
    IF v_current_quantity = p_quantity THEN
      -- Delete the record if selling all shares
      DELETE FROM portfolio_stocks
      WHERE portfolio_id = v_portfolio_id AND stock_id = p_stock_id;
    ELSE
      -- Update quantity if selling partial position
      UPDATE portfolio_stocks
      SET quantity = quantity - p_quantity
      WHERE portfolio_id = v_portfolio_id AND stock_id = p_stock_id;
    END IF;
  END;
END;
$$;