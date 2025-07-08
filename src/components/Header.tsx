import React from 'react';
import { Heart, Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="gradient-bg text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-pink-300" />
            <Activity className="w-8 h-8 text-green-300" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Health Costs Predictor</h1>
            <p className="text-blue-100 text-lg">
              AI-powered medical insurance cost estimation
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;