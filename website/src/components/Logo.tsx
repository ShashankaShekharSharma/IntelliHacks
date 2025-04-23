import React from 'react';
import { Atom } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
      <Atom size={24} className="text-white" />
    </div>
  );
};

export default Logo;