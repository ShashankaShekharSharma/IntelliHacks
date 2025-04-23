import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200 dark:border-gray-700 group"
    >
      <div className="rounded-full bg-indigo-100 dark:bg-indigo-900 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-indigo-500 transition-colors">
        <Icon className="text-indigo-600 dark:text-indigo-300 group-hover:text-white transition-colors" size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;