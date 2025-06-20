import { DemographicData, SurveyData, MLPredictionResult, ModelMetrics } from '../types';

// Simulated ML model weights based on Logistic Regression
// These weights are approximated from typical mental health prediction models
const MODEL_WEIGHTS = {
  intercept: -1.2,
  age: 0.015,
  gender_male: 0.25,
  gender_female: -0.1,
  marital_married: -0.3,
  marital_divorced: 0.45,
  marital_widowed: 0.2,
  education_bachelors: -0.15,
  education_masters: -0.25,
  education_phd: -0.3,
  occupation_unemployed: 0.6,
  occupation_student: 0.2,
  occupation_retired: 0.1,
  sleeping_mild: 0.4,
  sleeping_moderate: 0.7,
  sleeping_severe: 1.1,
  stress_level: 0.8,
  anxiety_frequency: 0.6,
  depression_symptoms: 0.9,
  work_life_balance: -0.4,
  social_support: -0.5,
  physical_activity: -0.2,
  health_habits: -0.3,
  coping_mechanisms: -0.6
};

// Model performance metrics (simulated from your results)
const MODEL_METRICS: ModelMetrics = {
  accuracy: 0.87,
  precision: 0.84,
  recall: 0.82,
  f1Score: 0.83,
  rocAuc: 0.89
};

// Sigmoid function for logistic regression
const sigmoid = (x: number): number => {
  return 1 / (1 + Math.exp(-x));
};

// Feature encoding function
const encodeFeatures = (demographic: DemographicData, survey: SurveyData): number[] => {
  const features: number[] = [];
  
  // Age (normalized)
  features.push((demographic.age - 35) / 20); // Normalize around mean age
  
  // Gender encoding
  features.push(demographic.gender === 'male' ? 1 : 0);
  features.push(demographic.gender === 'female' ? 1 : 0);
  
  // Marital status encoding
  features.push(demographic.maritalStatus === 'married' ? 1 : 0);
  features.push(demographic.maritalStatus === 'divorced' ? 1 : 0);
  features.push(demographic.maritalStatus === 'widowed' ? 1 : 0);
  
  // Education encoding
  features.push(demographic.education === 'bachelors' ? 1 : 0);
  features.push(demographic.education === 'masters' ? 1 : 0);
  features.push(demographic.education === 'phd' ? 1 : 0);
  
  // Occupation encoding
  features.push(demographic.occupation === 'unemployed' ? 1 : 0);
  features.push(demographic.occupation === 'student' ? 1 : 0);
  features.push(demographic.occupation === 'retired' ? 1 : 0);
  
  // Sleeping problem encoding
  features.push(demographic.sleepingProblem === 'mild' ? 1 : 0);
  features.push(demographic.sleepingProblem === 'moderate' ? 1 : 0);
  features.push(demographic.sleepingProblem === 'severe' ? 1 : 0);
  
  // Survey data (normalized to 0-1 scale)
  features.push((survey.stressLevel - 1) / 4);
  features.push((survey.anxietyFrequency - 1) / 4);
  features.push((survey.depressionSymptoms - 1) / 4);
  features.push((survey.workLifeBalance - 1) / 4);
  features.push((survey.socialSupport - 1) / 4);
  features.push((survey.physicalActivity - 1) / 4);
  features.push((survey.healthHabits - 1) / 4);
  features.push((survey.copingMechanisms - 1) / 4);
  
  return features;
};

// Calculate stress, anxiety, and depression scores (similar to your Python code)
const calculateScores = (survey: SurveyData) => {
  // Simulate Q3.1-Q3.7 for stress (using stressLevel as proxy)
  const stressScore = survey.stressLevel * 1.4 + 
                     (5 - survey.workLifeBalance) * 0.8 + 
                     (5 - survey.copingMechanisms) * 0.6;
  
  // Simulate Q3.8-Q3.14 for anxiety (using anxietyFrequency as proxy)
  const anxietyScore = survey.anxietyFrequency * 1.5 + 
                      (5 - survey.socialSupport) * 0.7 + 
                      survey.stressLevel * 0.5;
  
  // Simulate Q3.15-Q3.21 for depression (using depressionSymptoms as proxy)
  const depressionScore = survey.depressionSymptoms * 1.6 + 
                         (5 - survey.physicalActivity) * 0.4 + 
                         (5 - survey.healthHabits) * 0.5;
  
  return {
    stressScore: Math.min(21, Math.max(0, stressScore)), // 0-21 scale (7 questions * 3 max)
    anxietyScore: Math.min(21, Math.max(0, anxietyScore)), // 0-21 scale
    depressionScore: Math.min(21, Math.max(0, depressionScore)) // 0-21 scale
  };
};

// Main ML prediction function
export const predictStressML = (
  demographic: DemographicData, 
  survey: SurveyData
): MLPredictionResult => {
  // Calculate individual scores
  const scores = calculateScores(survey);
  
  // Encode features for the model
  const features = encodeFeatures(demographic, survey);
  
  // Calculate linear combination
  let linearCombination = MODEL_WEIGHTS.intercept;
  
  // Add weighted features
  linearCombination += features[0] * MODEL_WEIGHTS.age;
  linearCombination += features[1] * MODEL_WEIGHTS.gender_male;
  linearCombination += features[2] * MODEL_WEIGHTS.gender_female;
  linearCombination += features[3] * MODEL_WEIGHTS.marital_married;
  linearCombination += features[4] * MODEL_WEIGHTS.marital_divorced;
  linearCombination += features[5] * MODEL_WEIGHTS.marital_widowed;
  linearCombination += features[6] * MODEL_WEIGHTS.education_bachelors;
  linearCombination += features[7] * MODEL_WEIGHTS.education_masters;
  linearCombination += features[8] * MODEL_WEIGHTS.education_phd;
  linearCombination += features[9] * MODEL_WEIGHTS.occupation_unemployed;
  linearCombination += features[10] * MODEL_WEIGHTS.occupation_student;
  linearCombination += features[11] * MODEL_WEIGHTS.occupation_retired;
  linearCombination += features[12] * MODEL_WEIGHTS.sleeping_mild;
  linearCombination += features[13] * MODEL_WEIGHTS.sleeping_moderate;
  linearCombination += features[14] * MODEL_WEIGHTS.sleeping_severe;
  linearCombination += features[15] * MODEL_WEIGHTS.stress_level;
  linearCombination += features[16] * MODEL_WEIGHTS.anxiety_frequency;
  linearCombination += features[17] * MODEL_WEIGHTS.depression_symptoms;
  linearCombination += features[18] * MODEL_WEIGHTS.work_life_balance;
  linearCombination += features[19] * MODEL_WEIGHTS.social_support;
  linearCombination += features[20] * MODEL_WEIGHTS.physical_activity;
  linearCombination += features[21] * MODEL_WEIGHTS.health_habits;
  linearCombination += features[22] * MODEL_WEIGHTS.coping_mechanisms;
  
  // Apply sigmoid to get probability
  const highStressProbability = sigmoid(linearCombination);
  
  // Determine confidence level based on probability distance from 0.5
  const confidenceDistance = Math.abs(highStressProbability - 0.5);
  let confidenceLevel: 'low' | 'medium' | 'high';
  
  if (confidenceDistance < 0.2) {
    confidenceLevel = 'low';
  } else if (confidenceDistance < 0.35) {
    confidenceLevel = 'medium';
  } else {
    confidenceLevel = 'high';
  }
  
  return {
    highStressProbability: Math.round(highStressProbability * 100) / 100,
    stressScore: Math.round(scores.stressScore * 10) / 10,
    anxietyScore: Math.round(scores.anxietyScore * 10) / 10,
    depressionScore: Math.round(scores.depressionScore * 10) / 10,
    modelAccuracy: MODEL_METRICS.accuracy,
    confidenceLevel
  };
};

// Function to get model metrics
export const getModelMetrics = (): ModelMetrics => {
  return MODEL_METRICS;
};

// Function to simulate cross-validation results
export const getCrossValidationResults = () => {
  return {
    'Logistic Regression': {
      scores: [0.85, 0.87, 0.86, 0.88, 0.84],
      mean: 0.86,
      std: 0.015
    },
    'Random Forest': {
      scores: [0.83, 0.85, 0.84, 0.86, 0.82],
      mean: 0.84,
      std: 0.016
    },
    'K-Nearest Neighbors': {
      scores: [0.78, 0.80, 0.79, 0.81, 0.77],
      mean: 0.79,
      std: 0.016
    },
    'Support Vector Machine': {
      scores: [0.81, 0.83, 0.82, 0.84, 0.80],
      mean: 0.82,
      std: 0.016
    },
    'Naive Bayes': {
      scores: [0.75, 0.77, 0.76, 0.78, 0.74],
      mean: 0.76,
      std: 0.016
    }
  };
};