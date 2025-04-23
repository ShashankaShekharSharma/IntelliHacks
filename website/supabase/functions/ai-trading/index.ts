import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface Stock {
  id: string;
  symbol: string;
  current_price: number;
  volatility?: number;
}

interface AIAgent {
  id: string;
  type: 'conservative' | 'aggressive';
  cash_allocated: number;
  risk_score: number;
  max_position_size: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all stocks
    const { data: stocks, error: stocksError } = await supabaseClient
      .from('stocks')
      .select('*');

    if (stocksError) throw stocksError;

    // Get all AI agents
    const { data: agents, error: agentsError } = await supabaseClient
      .from('ai_agents')
      .select('*');

    if (agentsError) throw agentsError;

    // Calculate volatility for each stock
    const stocksWithVolatility = await calculateStockVolatility(supabaseClient, stocks);

    // Process each agent
    for (const agent of agents) {
      const recommendations = analyzeStocks(stocksWithVolatility, agent);
      await executeRecommendations(supabaseClient, agent, recommendations);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function calculateStockVolatility(supabase: any, stocks: Stock[]) {
  const stocksWithVolatility = [];

  for (const stock of stocks) {
    const { data: history } = await supabase
      .from('stock_price_history')
      .select('price')
      .eq('stock_id', stock.id)
      .order('recorded_at', { ascending: false })
      .limit(20);

    if (history && history.length > 0) {
      const prices = history.map(h => h.price);
      const returns = [];
      for (let i = 1; i < prices.length; i++) {
        returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
      }

      const volatility = calculateStandardDeviation(returns);
      stocksWithVolatility.push({ ...stock, volatility });
    }
  }

  return stocksWithVolatility;
}

function calculateStandardDeviation(values: number[]) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

function analyzeStocks(stocks: Stock[], agent: AIAgent) {
  const recommendations = [];

  for (const stock of stocks) {
    if (!stock.volatility) continue;

    const score = calculateStockScore(stock, agent);
    const maxInvestment = agent.cash_allocated * agent.max_position_size;
    const suggestedQuantity = Math.floor(maxInvestment / stock.current_price);

    if (score > 0.7) {
      recommendations.push({
        stock,
        action: 'buy',
        quantity: suggestedQuantity,
        reason: `High score (${score.toFixed(2)}) based on ${agent.type} strategy`
      });
    } else if (score < 0.3) {
      recommendations.push({
        stock,
        action: 'sell',
        quantity: suggestedQuantity,
        reason: `Low score (${score.toFixed(2)}) based on ${agent.type} strategy`
      });
    }
  }

  return recommendations;
}

function calculateStockScore(stock: Stock, agent: AIAgent) {
  if (agent.type === 'conservative') {
    // Conservative agent prefers low volatility stocks
    return 1 - (stock.volatility || 0);
  } else {
    // Aggressive agent prefers high volatility stocks
    return stock.volatility || 0;
  }
}

async function executeRecommendations(supabase: any, agent: AIAgent, recommendations: any[]) {
  for (const rec of recommendations) {
    try {
      if (rec.action === 'buy') {
        await supabase.rpc('buy_stock', {
          p_stock_id: rec.stock.id,
          p_quantity: rec.quantity,
          p_price: rec.stock.current_price
        });
      } else {
        await supabase.rpc('sell_stock', {
          p_stock_id: rec.stock.id,
          p_quantity: rec.quantity,
          p_price: rec.stock.current_price
        });
      }

      // Record the trade
      await supabase
        .from('agent_trades')
        .insert({
          agent_id: agent.id,
          stock_id: rec.stock.id,
          type: rec.action,
          quantity: rec.quantity,
          price: rec.stock.current_price,
          reason: rec.reason
        });
    } catch (error) {
      console.error(`Failed to execute ${rec.action} for ${rec.stock.symbol}:`, error);
    }
  }
}