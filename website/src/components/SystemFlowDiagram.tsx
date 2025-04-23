import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
}

interface Edge {
  source: string;
  target: string;
}

const SystemFlowDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  // Define nodes based on the system architecture
  const nodes: Node[] = [
    { id: 'market_data', label: 'Market & Alternative Data', description: 'Real-time and historical financial data from various sources including market feeds, news, social sentiment, and alternative data.', x: 50, y: 50 },
    { id: 'data_ingestion', label: 'Data Ingestion Agent', description: 'Processes and normalizes incoming data streams from multiple sources for storage and analysis.', x: 250, y: 50 },
    { id: 'raw_data', label: 'Raw Data Store', description: 'Highly scalable storage solution for unprocessed market data and signals.', x: 450, y: 50 },
    { id: 'feature_agent', label: 'Feature Agent', description: 'Transforms raw data into feature vectors suitable for quantitative analysis and machine learning models.', x: 175, y: 150 },
    { id: 'feature_store', label: 'Feature Store', description: 'Centralized repository for storing and accessing computed features for model training and inference.', x: 375, y: 150 },
    { id: 'quantum_agent', label: 'Quantum Optimization Agent', description: 'Leverages quantum computing to solve complex portfolio optimization problems with superior performance.', x: 650, y: 150 },
    { id: 'portfolio_weights', label: 'Portfolio Weights', description: 'Optimized asset allocation percentages computed by quantum algorithms.', x: 825, y: 150 },
    { id: 'strategy_agents', label: 'Strategy Agents', description: 'Multiple trading algorithms specialized in different market conditions and asset classes.', x: 650, y: 225 },
    { id: 'trade_signals', label: 'Trade Signals', description: 'Actionable buy/sell recommendations based on strategy outputs.', x: 825, y: 225 },
    { id: 'risk_agent', label: 'Risk Agent', description: 'Analyzes exposure and adjusts orders to maintain risk parameters within defined limits.', x: 650, y: 300 },
    { id: 'adjusted_orders', label: 'Adjusted Orders', description: 'Risk-managed trade instructions ready for execution.', x: 825, y: 300 },
    { id: 'orchestration', label: 'Orchestration Agent', description: 'Coordinates the entire trading system workflow and monitors performance.', x: 175, y: 400 },
    { id: 'execution_agent', label: 'Execution Agent', description: 'Optimizes trade execution timing and routing to minimize slippage and market impact.', x: 375, y: 400 },
    { id: 'broker_api', label: 'Broker API', description: 'Secure interface with brokerages for executing trades in the market.', x: 575, y: 400 },
    { id: 'compliance_agent', label: 'Compliance Agent', description: 'Ensures all trading activity adheres to regulatory requirements and internal policies.', x: 475, y: 475 },
    { id: 'feedback_agent', label: 'Feedback Agent', description: 'Captures execution performance metrics and updates the system performance database.', x: 175, y: 600 },
    { id: 'retraining', label: 'Retraining Triggers', description: 'Signals when strategies or models need updating based on performance metrics.', x: 375, y: 600 },
    { id: 'update_agents', label: 'Strategy / Quantum Agents', description: 'Target agents for model retraining and strategy parameter adjustment.', x: 575, y: 600 },
  ];

  // Define edges (connections between nodes)
  const edges: Edge[] = [
    { source: 'market_data', target: 'data_ingestion' },
    { source: 'data_ingestion', target: 'raw_data' },
    { source: 'market_data', target: 'feature_agent' },
    { source: 'feature_agent', target: 'feature_store' },
    { source: 'feature_store', target: 'quantum_agent' },
    { source: 'quantum_agent', target: 'portfolio_weights' },
    { source: 'feature_store', target: 'strategy_agents' },
    { source: 'strategy_agents', target: 'trade_signals' },
    { source: 'feature_store', target: 'risk_agent' },
    { source: 'risk_agent', target: 'adjusted_orders' },
    { source: 'orchestration', target: 'execution_agent' },
    { source: 'execution_agent', target: 'broker_api' },
    { source: 'execution_agent', target: 'compliance_agent' },
    { source: 'orchestration', target: 'feedback_agent' },
    { source: 'feedback_agent', target: 'retraining' },
    { source: 'retraining', target: 'update_agents' },
  ];

  // Calculate diagram dimensions
  const width = 900;
  const height = 650;
  const scale = 0.9; // Scale factor for responsiveness

  // Handle node selection
  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId === selectedNode ? null : nodeId);
  };

  // Find selected node details
  const selectedNodeDetails = nodes.find(node => node.id === selectedNode);

  return (
    <div className="system-flow-diagram-container relative w-full overflow-x-auto pb-6">
      <div className="min-w-[900px]">
        <svg 
          width={width} 
          height={height} 
          viewBox={`0 0 ${width} ${height}`} 
          className="mx-auto"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Draw edges */}
          {edges.map((edge, index) => {
            const source = nodes.find(n => n.id === edge.source);
            const target = nodes.find(n => n.id === edge.target);
            
            if (!source || !target) return null;
            
            return (
              <line
                key={`edge-${index}`}
                x1={source.x + 75} // Add offset for node center
                y1={source.y + 20}
                x2={target.x + 75}
                y2={target.y + 20}
                stroke={selectedNode && (selectedNode === source.id || selectedNode === target.id) 
                  ? "#6366f1" // Highlight connected edges
                  : "#4b5563"}
                strokeWidth={2}
                strokeOpacity={selectedNode ? (selectedNode === source.id || selectedNode === target.id ? 1 : 0.3) : 0.7}
              />
            );
          })}
          
          {/* Draw nodes */}
          {nodes.map((node) => (
            <g key={node.id} onClick={() => handleNodeClick(node.id)}>
              <motion.rect
                x={node.x}
                y={node.y}
                width={150}
                height={40}
                rx={6}
                fill={selectedNode === node.id ? "#6366f1" : "#2d3748"}
                stroke={selectedNode === node.id ? "#818cf8" : "transparent"}
                strokeWidth={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedNode ? (selectedNode === node.id ? 1 : 0.7) : 1 }}
                whileHover={{ scale: 1.05 }}
                cursor="pointer"
              />
              <text
                x={node.x + 75}
                y={node.y + 25}
                textAnchor="middle"
                fill="white"
                fontSize={12}
                fontWeight="medium"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      {/* Node details panel */}
      {selectedNodeDetails && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-md mx-auto mt-4"
        >
          <h3 className="text-lg font-semibold text-indigo-400 mb-2">{selectedNodeDetails.label}</h3>
          <p className="text-gray-300">{selectedNodeDetails.description}</p>
        </motion.div>
      )}
    </div>
  );
};

export default SystemFlowDiagram;