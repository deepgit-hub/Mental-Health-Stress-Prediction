export interface DemographicData {
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'other';
  education: 'high-school' | 'bachelors' | 'masters' | 'phd' | 'other';
  occupation: 'student' | 'employed' | 'unemployed' | 'retired' | 'self-employed' | 'other';
  sleepingProblem: 'none' | 'mild' | 'moderate' | 'severe';
}

export interface SurveyData {
  stressLevel: number;
  anxietyFrequency: number;
  depressionSymptoms: number;
  workLifeBalance: number;
  socialSupport: number;
  physicalActivity: number;
  healthHabits: number;
  copingMechanisms: number;
}

export interface StressResult {
  level: 'low' | 'moderate' | 'high' | 'severe';
  score: number;
  recommendations: string[];
  riskFactors: string[];
  mlPrediction?: MLPredictionResult;
}

export interface MLPredictionResult {
  highStressProbability: number;
  stressScore: number;
  anxietyScore: number;
  depressionScore: number;
  modelAccuracy: number;
  confidenceLevel: 'low' | 'medium' | 'high';
}

export interface DatasetRow {
  [key: string]: any;
  age?: number;
  gender?: string;
  maritalStatus?: string;
  education?: string;
  occupation?: string;
  sleepingProblem?: string;
  // Q3.1 to Q3.21 for stress, anxiety, depression questions
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
}