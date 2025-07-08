import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react';
import { predictHealthCost } from '../utils/model';
import InputField from './InputField';
import SelectField from './SelectField';
import ResultCard from './ResultCard';

interface FormData {
  age: string;
  sex: string;
  bmi: string;
  children: string;
  smoker: string;
  region: string;
}

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    sex: '',
    bmi: '',
    children: '',
    smoker: '',
    region: ''
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }

    if (!formData.bmi || parseFloat(formData.bmi) < 15 || parseFloat(formData.bmi) > 50) {
      newErrors.bmi = 'BMI must be between 15 and 50';
    }

    if (!formData.children || parseInt(formData.children) < 0 || parseInt(formData.children) > 10) {
      newErrors.children = 'Children must be between 0 and 10';
    }

    if (!formData.sex) newErrors.sex = 'Please select sex';
    if (!formData.smoker) newErrors.smoker = 'Please select smoking status';
    if (!formData.region) newErrors.region = 'Please select region';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const cost = predictHealthCost({
        age: parseInt(formData.age),
        sex: formData.sex,
        bmi: parseFloat(formData.bmi),
        children: parseInt(formData.children),
        smoker: formData.smoker,
        region: formData.region
      });
      
      setPrediction(cost);
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Predict Your Health Insurance Costs
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter your personal information below to get an AI-powered estimate of your annual health insurance costs.
          Our model uses machine learning to provide accurate predictions based on historical data.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl card-shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Age"
                type="number"
                value={formData.age}
                onChange={(value) => handleInputChange('age', value)}
                placeholder="e.g., 35"
                error={errors.age}
                min="18"
                max="100"
              />

              <InputField
                label="BMI (Body Mass Index)"
                type="number"
                value={formData.bmi}
                onChange={(value) => handleInputChange('bmi', value)}
                placeholder="e.g., 26.5"
                error={errors.bmi}
                step="0.1"
                min="15"
                max="50"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <SelectField
                label="Sex"
                value={formData.sex}
                onChange={(value) => handleInputChange('sex', value)}
                options={[
                  { value: '', label: 'Select sex' },
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' }
                ]}
                error={errors.sex}
              />

              <InputField
                label="Number of Children"
                type="number"
                value={formData.children}
                onChange={(value) => handleInputChange('children', value)}
                placeholder="e.g., 2"
                error={errors.children}
                min="0"
                max="10"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <SelectField
                label="Smoking Status"
                value={formData.smoker}
                onChange={(value) => handleInputChange('smoker', value)}
                options={[
                  { value: '', label: 'Select smoking status' },
                  { value: 'yes', label: 'Yes, I smoke' },
                  { value: 'no', label: 'No, I don\'t smoke' }
                ]}
                error={errors.smoker}
              />

              <SelectField
                label="Region"
                value={formData.region}
                onChange={(value) => handleInputChange('region', value)}
                options={[
                  { value: '', label: 'Select region' },
                  { value: 'northeast', label: 'Northeast' },
                  { value: 'northwest', label: 'Northwest' },
                  { value: 'southeast', label: 'Southeast' },
                  { value: 'southwest', label: 'Southwest' }
                ]}
                error={errors.region}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg button-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5" />
                  <span>Predict Health Costs</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">How it works:</p>
                <p>
                  Our AI model analyzes your personal data using advanced machine learning algorithms 
                  trained on thousands of insurance records to provide accurate cost predictions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8">
          <ResultCard prediction={prediction} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;