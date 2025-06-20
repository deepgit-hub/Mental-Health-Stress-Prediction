import React from 'react';
import { Brain, TrendingUp, BarChart3, Target, AlertTriangle, CheckCircle } from 'lucide-react';
import { MLPredictionResult, ModelMetrics } from '../types';
import { getModelMetrics, getCrossValidationResults } from '../utils/mlModel';

interface MLResultsDisplayProps {
  mlResult: MLPredictionResult;
}

const MLResultsDisplay: React.FC<MLResultsDisplayProps> = ({ mlResult }) => {
  const modelMetrics = getModelMetrics();
  const cvResults = getCrossValidationResults();

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.7) return 'from-red-500 to-red-600';
    if (probability >= 0.5) return 'from-orange-500 to-red-400';
    if (probability >= 0.3) return 'from-yellow-500 to-orange-400';
    return 'from-emerald-500 to-green-400';
  };

  return (
    <div className="space-y-6">
      {/* ML Prediction Header */}
      <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-blue-100 shadow-lg">
        <div className="flex items-center mb-4">
          <Brain className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-xl font-bold text-gray-900">AI-Powered Prediction</h3>
          <div className={`ml-auto px-3 py-1 rounded-full border text-sm font-medium ${getConfidenceColor(mlResult.confidenceLevel)}`}>
            {mlResult.confidenceLevel.toUpperCase()} CONFIDENCE
          </div>
        </div>

        {/* High Stress Probability */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">High Stress Probability</span>
            <span className="text-2xl font-bold text-gray-900">
              {Math.round(mlResult.highStressProbability * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`bg-gradient-to-r ${getProbabilityColor(mlResult.highStressProbability)} h-4 rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${mlResult.highStressProbability * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low Risk</span>
            <span>High Risk</span>
          </div>
        </div>

        {/* Individual Scores */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="text-2xl font-bold text-red-600">{mlResult.stressScore}</div>
            <div className="text-sm text-red-700">Stress Score</div>
            <div className="text-xs text-red-500">0-21 scale</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="text-2xl font-bold text-yellow-600">{mlResult.anxietyScore}</div>
            <div className="text-sm text-yellow-700">Anxiety Score</div>
            <div className="text-xs text-yellow-500">0-21 scale</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{mlResult.depressionScore}</div>
            <div className="text-sm text-blue-700">Depression Score</div>
            <div className="text-xs text-blue-500">0-21 scale</div>
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-emerald-100 shadow-lg">
        <div className="flex items-center mb-4">
          <BarChart3 className="h-6 w-6 text-emerald-600 mr-2" />
          <h4 className="text-lg font-bold text-gray-900">Model Performance</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {Math.round(modelMetrics.accuracy * 100)}%
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(modelMetrics.precision * 100)}%
            </div>
            <div className="text-sm text-gray-600">Precision</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {Math.round(modelMetrics.recall * 100)}%
            </div>
            <div className="text-sm text-gray-600">Recall</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(modelMetrics.f1Score * 100)}%
            </div>
            <div className="text-sm text-gray-600">F1 Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">
              {Math.round(modelMetrics.rocAuc * 100)}%
            </div>
            <div className="text-sm text-gray-600">ROC-AUC</div>
          </div>
        </div>

        {/* Cross-Validation Results */}
        <div>
          <h5 className="font-semibold text-gray-900 mb-3">5-Fold Cross-Validation Results</h5>
          <div className="space-y-2">
            {Object.entries(cvResults).map(([model, results]) => (
              <div key={model} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{model}</span>
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    {Math.round(results.mean * 100)}% ± {Math.round(results.std * 1000)/10}%
                  </div>
                  <div className="text-xs text-gray-500">Mean ± Std</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Interpretation */}
      <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center mb-4">
          <Target className="h-6 w-6 text-gray-600 mr-2" />
          <h4 className="text-lg font-bold text-gray-900">AI Interpretation</h4>
        </div>

        <div className="space-y-3">
          {mlResult.highStressProbability >= 0.7 && (
            <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
              <div>
                <div className="font-medium text-red-900">High Risk Detected</div>
                <div className="text-sm text-red-700">
                  The model indicates a high probability of significant stress levels. Consider seeking professional support.
                </div>
              </div>
            </div>
          )}

          {mlResult.highStressProbability >= 0.4 && mlResult.highStressProbability < 0.7 && (
            <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <TrendingUp className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-900">Moderate Risk</div>
                <div className="text-sm text-yellow-700">
                  Some stress indicators are present. Monitor your wellbeing and consider preventive measures.
                </div>
              </div>
            </div>
          )}

          {mlResult.highStressProbability < 0.4 && (
            <div className="flex items-start p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
              <div>
                <div className="font-medium text-emerald-900">Low Risk</div>
                <div className="text-sm text-emerald-700">
                  The model suggests relatively low stress levels. Continue maintaining healthy habits.
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
            <strong>Note:</strong> This AI prediction is based on a logistic regression model trained on mental health survey data. 
            It should be used as a supplementary tool alongside professional medical advice, not as a replacement for clinical diagnosis.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLResultsDisplay;