import React, { useState } from 'react';
import HomePage from './components/HomePage';
import DemographicForm from './components/DemographicForm';
import SurveyForm from './components/SurveyForm';
import ResultsPage from './components/ResultsPage';
import { DemographicData, SurveyData } from './types';

export type AppStep = 'home' | 'demographics' | 'survey' | 'results';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('home');
  const [demographicData, setDemographicData] = useState<DemographicData | null>(null);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  const nextStep = () => {
    switch (currentStep) {
      case 'home':
        setCurrentStep('demographics');
        break;
      case 'demographics':
        setCurrentStep('survey');
        break;
      case 'survey':
        setCurrentStep('results');
        break;
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case 'demographics':
        setCurrentStep('home');
        break;
      case 'survey':
        setCurrentStep('demographics');
        break;
      case 'results':
        setCurrentStep('survey');
        break;
    }
  };

  const handleDemographicSubmit = (data: DemographicData) => {
    setDemographicData(data);
    nextStep();
  };

  const handleSurveySubmit = (data: SurveyData) => {
    setSurveyData(data);
    nextStep();
  };

  const restart = () => {
    setCurrentStep('home');
    setDemographicData(null);
    setSurveyData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {currentStep === 'home' && (
        <HomePage onStart={nextStep} />
      )}
      
      {currentStep === 'demographics' && (
        <DemographicForm 
          onSubmit={handleDemographicSubmit}
          onBack={prevStep}
        />
      )}
      
      {currentStep === 'survey' && (
        <SurveyForm 
          onSubmit={handleSurveySubmit}
          onBack={prevStep}
        />
      )}
      
      {currentStep === 'results' && demographicData && surveyData && (
        <ResultsPage 
          demographicData={demographicData}
          surveyData={surveyData}
          onRestart={restart}
          onBack={prevStep}
        />
      )}
    </div>
  );
}

export default App;