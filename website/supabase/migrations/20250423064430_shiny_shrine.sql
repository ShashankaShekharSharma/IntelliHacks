/*
  # Add AI Trading Agents

  1. New Tables
    - `ai_agents`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text) - 'conservative' or 'aggressive'
      - `portfolio_id` (uuid, references portfolios)
      - `cash_allocated` (numeric)
      - `risk_score` (numeric)
      - `max_position_size` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `agent_trades`
      - `id` (uuid, primary key)
      - `agent_id` (uuid, references ai_agents)
      - `stock_id` (uuid, references stocks)
      - `type` (text) - 'buy' or 'sell'
      - `quantity` (numeric)
      - `price` (numeric)
      - `reason` (text)
      - `executed_at` (timestamp)

  2. Functions
    - `create_ai_agents`: Creates both conservative and aggressive agents for a portfolio
    - `execute_ai_trade`: Executes trades on behalf of AI agents
    
  3. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create AI agents table
CREATE TABLE IF NOT EXISTS ai_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('conservative', 'aggressive')),
  portfolio_id uuid REFERENCES portfolios NOT NULL,
  cash_allocated numeric NOT NULL DEFAULT 50000,
  risk_score numeric NOT NULL,
  max_position_size numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create agent trades table
CREATE TABLE IF NOT EXISTS agent_trades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES ai_agents NOT NULL,
  stock_id uuid REFERENCES stocks NOT NULL,
  type text NOT NULL CHECK (type IN ('buy', 'sell')),
  quantity numeric NOT NULL,
  price numeric NOT NULL,
  reason text,
  executed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_trades ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their AI agents"
  ON ai_agents
  FOR SELECT
  TO authenticated
  USING (
    portfolio_id IN (
      SELECT id FROM portfolios WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their agent trades"
  ON agent_trades
  FOR SELECT
  TO authenticated
  USING (
    agent_id IN (
      SELECT id FROM ai_agents 
      WHERE portfolio_id IN (
        SELECT id FROM portfolios WHERE user_id = auth.uid()
      )
    )
  );

-- Function to create AI agents for a portfolio
CREATE OR REPLACE FUNCTION create_ai_agents(p_portfolio_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create conservative agent
  INSERT INTO ai_agents (
    name,
    type,
    portfolio_id,
    cash_allocated,
    risk_score,
    max_position_size
  ) VALUES (
    'Conservative AI Agent',
    'conservative',
    p_portfolio_id,
    50000,
    0.3,  -- Lower risk score
    0.1   -- Max 10% of cash in single position
  );

  -- Create aggressive agent
  INSERT INTO ai_agents (
    name,
    type,
    portfolio_id,
    cash_allocated,
    risk_score,
    max_position_size
  ) VALUES (
    'Aggressive AI Agent',
    'aggressive',
    p_portfolio_id,
    50000,
    0.8,  -- Higher risk score
    0.25  -- Max 25% of cash in single position
  );
END;
$$;