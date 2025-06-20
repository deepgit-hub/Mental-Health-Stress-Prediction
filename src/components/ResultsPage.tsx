import React from 'react';
import { ArrowLeft, RefreshCw, TrendingDown, TrendingUp, AlertTriangle, CheckCircle, Brain, Heart, Activity, Shield, Users, Target } from 'lucide-react';
import { DemographicData, SurveyData, StressResult } from '../types';
import { calculateStressLevel } from '../utils/stressCalculator';
import MLResultsDisplay from './MLResultsDisplay';

interface ResultsPageProps {
  demographicData: DemographicData;
  surveyData: SurveyData;
  onRestart: () => void;
  onBack: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  demographicData,
  surveyData,
  onRestart,
  onBack
}) => {
  const result = calculateStressLevel(demographicData, surveyData);

  const getStressColorClasses = (level: string) => {
    switch (level) {
      case 'low':
        return {
          bg: 'from-emerald-500 to-green-400',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          bgLight: 'bg-emerald-50'
        };
      case 'moderate':
        return {
          bg: 'from-yellow-500 to-orange-400',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          bgLight: 'bg-yellow-50'
        };
      case 'high':
        return {
          bg: 'from-orange-500 to-red-400',
          text: 'text-orange-700',
          border: 'border-orange-200',
          bgLight: 'bg-orange-50'
        };
      case 'severe':
        return {
          bg: 'from-red-500 to-red-600',
          text: 'text-red-700',
          border: 'border-red-200',
          bgLight: 'bg-red-50'
        };
      default:
        return {
          bg: 'from-gray-500 to-gray-400',
          text: 'text-gray-700',
          border: 'border-gray-200',
          bgLight: 'bg-gray-50'
        };
    }
  };

  const getStressIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <CheckCircle className="h-8 w-8 text-emerald-600" />;
      case 'moderate':
        return <TrendingUp className="h-8 w-8 text-yellow-600" />;
      case 'high':
        return <AlertTriangle className="h-8 w-8 text-orange-600" />;
      case 'severe':
        return <AlertTriangle className="h-8 w-8 text-red-600" />;
      default:
        return <Activity className="h-8 w-8 text-gray-600" />;
    }
  };

  const colors = getStressColorClasses(result.level);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-full mb-4`}>
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Mental Health Assessment</h2>
          <p className="text-gray-600">Comprehensive analysis using traditional assessment and AI prediction</p>
        </div>

        {/* Main Results Card */}
        <div className={`bg-white/70 backdrop-blur rounded-2xl p-8 border ${colors.border} shadow-lg mb-8`}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              {getStressIcon(result.level)}
            </div>
            <h3 className="text-2xl font-bold capitalize mb-2" style={{color: colors.text.replace('text-', '')}}>
              {result.level} Stress Level
            </h3>
            <div className="flex items-center justify-center space-x-4">
              <div className={`${colors.bgLight} ${colors.border} border rounded-full px-4 py-2`}>
                <span className={`${colors.text} font-semibold`}>Traditional Score: {result.score}/100</span>
              </div>
            </div>
          </div>

          {/* Score Visualization */}
          <div className="mb-8">
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`bg-gradient-to-r ${colors.bg} h-4 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Low (0-25)</span>
                <span>Moderate (26-50)</span>
                <span>High (51-75)</span>
                <span>Severe (76-100)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ML Results */}
        {result.mlPrediction && (
          <MLResultsDisplay mlResult={result.mlPrediction} />
        )}

        {/* Risk Factors and Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 mt-8">
          <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-red-100 shadow-lg">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Risk Factors</h4>
            </div>
            <ul className="space-y-2">
              {result.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-emerald-100 shadow-lg">
            <div className="flex items-center mb-4">
              <Target className="h-6 w-6 text-emerald-500 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Recommendations</h4>
            </div>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-blue-100 text-center">
            <Activity className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{surveyData.stressLevel}/5</div>
            <div className="text-xs text-gray-600">Stress Level</div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-indigo-100 text-center">
            <Heart className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{surveyData.anxietyFrequency}/5</div>
            <div className="text-xs text-gray-600">Anxiety</div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-emerald-100 text-center">
            <Users className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{surveyData.socialSupport}/5</div>
            <div className="text-xs text-gray-600">Support</div>
          </div>
          <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-blue-100 text-center">
            <Shield className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{surveyData.copingMechanisms}/5</div>
            <div className="text-xs text-gray-600">Coping</div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <Brain className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Important Notice</h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                This assessment combines traditional psychological evaluation methods with AI-powered prediction models. 
                While our machine learning model has been trained on mental health survey data and shows high accuracy, 
                it should not be used as a substitute for professional mental health diagnosis or treatment. 
                If you're experiencing severe symptoms or thoughts of self-harm, please seek immediate help from a qualified mental health professional or contact a crisis helpline.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Survey
          </button>
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Take New Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;