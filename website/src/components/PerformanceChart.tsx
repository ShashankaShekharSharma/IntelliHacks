import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PerformanceChartProps {
  title?: string;
  subtitle?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ title = 'Performance', subtitle }) => {
  // Simulated performance data (would come from API in real application)
  const labels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const quantumStrategyData = [
    1000, 1025, 1080, 1120, 1190, 1230,
    1310, 1360, 1425, 1480, 1560, 1640
  ];
  
  const traditionalStrategyData = [
    1000, 1015, 1040, 1065, 1090, 1110,
    1140, 1160, 1190, 1210, 1240, 1270
  ];
  
  const marketBenchmarkData = [
    1000, 1010, 1030, 1020, 1050, 1070, 
    1060, 1080, 1100, 1110, 1130, 1150
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Quantum Strategy',
        data: quantumStrategyData,
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Traditional Strategy',
        data: traditionalStrategyData,
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Market Benchmark',
        data: marketBenchmarkData,
        borderColor: 'rgba(209, 213, 219, 1)',
        backgroundColor: 'rgba(209, 213, 219, 0.1)',
        fill: false,
        borderDash: [5, 5],
        tension: 0.4,
      }
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(209, 213, 219, 1)',
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: 'rgba(255, 255, 255, 1)',
        bodyColor: 'rgba(209, 213, 219, 1)',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: 'rgba(156, 163, 175, 1)',
        }
      },
      y: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: 'rgba(156, 163, 175, 1)',
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 5,
      }
    }
  };

  return (
    <div className="bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg p-4 md:p-6">
      {title && <h3 className="text-xl font-semibold text-gray-100 mb-1">{title}</h3>}
      {subtitle && <p className="text-gray-400 mb-4 text-sm">{subtitle}</p>}
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded bg-gray-700/30">
          <p className="text-xs text-gray-400">Total Return</p>
          <p className="text-lg font-semibold text-indigo-400">+64.0%</p>
        </div>
        <div className="p-2 rounded bg-gray-700/30">
          <p className="text-xs text-gray-400">Sharpe Ratio</p>
          <p className="text-lg font-semibold text-indigo-400">1.92</p>
        </div>
        <div className="p-2 rounded bg-gray-700/30">
          <p className="text-xs text-gray-400">Max Drawdown</p>
          <p className="text-lg font-semibold text-indigo-400">-7.3%</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;