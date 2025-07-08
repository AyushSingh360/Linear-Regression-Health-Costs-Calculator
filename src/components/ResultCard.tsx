import React from 'react';
import { DollarSign, TrendingUp, Info, CheckCircle } from 'lucide-react';

interface ResultCardProps {
  prediction: number | null;
  isLoading: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ prediction, isLoading }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskLevel = (cost: number) => {
    if (cost < 5000) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
    if (cost < 15000) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-50' };
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl card-shadow p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Analyzing Your Data...
          </h3>
          <p className="text-gray-600">
            Our AI model is processing your information to provide an accurate prediction.
          </p>
        </div>
      </div>
    );
  }

  if (prediction === null) {
    return (
      <div className="bg-white rounded-2xl card-shadow p-8">
        <div className="text-center">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Ready to Predict
          </h3>
          <p className="text-gray-600 mb-6">
            Fill out the form to get your personalized health insurance cost prediction.
          </p>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-blue-800">AI-powered predictions</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-green-800">Based on real insurance data</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span className="text-sm text-purple-800">Instant results</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const risk = getRiskLevel(prediction);

  return (
    <div className="bg-white rounded-2xl card-shadow p-8">
      <div className="text-center mb-6">
        <DollarSign className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Predicted Annual Cost
        </h3>
        <div className="text-4xl font-bold text-green-600 mb-2">
          {formatCurrency(prediction)}
        </div>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${risk.bg} ${risk.color}`}>
          {risk.level} Risk Category
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-1">About this prediction:</p>
              <p>
                This estimate is based on machine learning analysis of historical insurance data. 
                Actual costs may vary based on specific insurance plans, deductibles, and coverage options.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {formatCurrency(prediction * 0.8)}
            </div>
            <div className="text-xs text-blue-800">Lower Estimate</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">
              {formatCurrency(prediction * 1.2)}
            </div>
            <div className="text-xs text-purple-800">Upper Estimate</div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Predictions are estimates and should not be considered as financial advice.
        </div>
      </div>
    </div>
  );
};

export default ResultCard;