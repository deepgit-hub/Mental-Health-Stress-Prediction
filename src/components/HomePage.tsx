import React, { useState } from 'react';
import { Brain, Heart, Shield, TrendingUp, Users, Clock, Database } from 'lucide-react';
import DatasetUploader from './DatasetUploader';
import { DatasetRow } from '../types';

interface HomePageProps {
  onStart: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  const [showDatasetUploader, setShowDatasetUploader] = useState(false);
  const [datasetLoaded, setDatasetLoaded] = useState(false);

  const handleDatasetLoaded = (data: DatasetRow[]) => {
    setDatasetLoaded(true);
    console.log('Dataset loaded:', data.length, 'records');
    // You can store this data in a global state or context if needed
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Build By KATHIR
              </h1>
            </div>
            <button
              onClick={() => setShowDatasetUploader(!showDatasetUploader)}
              className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                datasetLoaded 
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                  : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
              }`}
            >
              <Database className="h-4 w-4 mr-2" />
              {datasetLoaded ? 'Dataset Loaded' : 'Upload Dataset'}
            </button>
          </div>
        </div>
      </header>

      {/* Dataset Uploader */}
      {showDatasetUploader && (
        <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto">
            <DatasetUploader onDatasetLoaded={handleDatasetLoaded} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full mb-6">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Your Mental Health Prediction System
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
               using AI 
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Take a comprehensive assessment powered by machine learning to understand your stress levels and receive 
              personalized insights for better mental wellness.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <Shield className="h-8 w-8 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600 text-sm">Your data is processed securely and never stored or shared</p>
            </div>
            <div className="bg-white/70 backdrop-blur p-6 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
              <Brain className="h-8 w-8 text-emerald-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">Advanced machine learning models trained on mental health data</p>
            </div>
            <div className="bg-white/70 backdrop-blur p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Personalized</h3>
              <p className="text-gray-600 text-sm">Tailored recommendations based on your unique profile</p>
            </div>
          </div>

          {/* Assessment Info */}
          <div className="bg-white/70 backdrop-blur rounded-2xl p-8 border border-gray-200 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What to Expect</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Personal Information</h4>
                  <p className="text-gray-600 text-sm">Basic demographic data to personalize your assessment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 text-sm font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Wellness Survey</h4>
                  <p className="text-gray-600 text-sm">Questions about your current mental health and lifestyle</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">AI Analysis</h4>
                  <p className="text-gray-600 text-sm">Machine learning prediction with confidence levels</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 text-sm font-semibold">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Action Plan</h4>
                  <p className="text-gray-600 text-sm">Personalized recommendations for improving your wellbeing</p>
                </div>
              </div>
            </div>
          </div>

          {/* ML Model Info */}
          {datasetLoaded && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-3">
                <Database className="h-6 w-6 text-emerald-600 mr-2" />
                <h4 className="font-semibold text-emerald-900">Enhanced with Your Dataset</h4>
              </div>
              <p className="text-emerald-800 text-sm">
                Your uploaded Mental Health Survey Dataset has been processed and integrated into the prediction model 
                for more accurate and personalized results.
              </p>
            </div>
          )}

          {/* Time Estimate */}
          <div className="flex items-center justify-center space-x-2 text-gray-600 mb-8">
            <Clock className="h-5 w-5" />
            <span>Takes approximately 5-7 minutes to complete</span>
          </div>

          {/* CTA Button */}
          <button
            onClick={onStart}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your AI Assessment
            <TrendingUp className="ml-2 h-5 w-5" />
          </button>

          <p className="text-sm text-gray-500 mt-4">
            This assessment combines traditional psychological methods with AI prediction models. 
            Results are for informational purposes only and do not replace professional medical advice.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;