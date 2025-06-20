import { DemographicData, SurveyData, StressResult } from '../types';
import { predictStressML } from './mlModel';

export const calculateStressLevel = (
  demographic: DemographicData,
  survey: SurveyData
): StressResult => {
  let score = 0;
  let riskFactors: string[] = [];
  let recommendations: string[] = [];

  // Survey-based scoring (primary factors)
  score += survey.stressLevel * 12; // 0-60 points
  score += survey.anxietyFrequency * 8; // 0-40 points
  score += survey.depressionSymptoms * 10; // 0-50 points

  // Protective factors (subtract from score)
  score -= (5 - survey.workLifeBalance) * 3;
  score -= (5 - survey.socialSupport) * 4;
  score -= (5 - survey.physicalActivity) * 2;
  score -= (5 - survey.healthHabits) * 3;
  score -= (5 - survey.copingMechanisms) * 4;

  // Demographic risk factors
  if (demographic.age < 25 || demographic.age > 60) {
    score += 5;
    riskFactors.push('Age-related stress vulnerability');
  }

  if (demographic.sleepingProblem !== 'none') {
    const sleepMultiplier = {
      'mild': 5,
      'moderate': 10,
      'severe': 15
    };
    score += sleepMultiplier[demographic.sleepingProblem];
    riskFactors.push(`${demographic.sleepingProblem.charAt(0).toUpperCase() + demographic.sleepingProblem.slice(1)} sleep problems`);
  }

  if (demographic.maritalStatus === 'divorced' || demographic.maritalStatus === 'widowed') {
    score += 8;
    riskFactors.push('Recent major life changes');
  }

  if (demographic.occupation === 'unemployed') {
    score += 12;
    riskFactors.push('Employment-related stress');
  }

  // Ensure score is within bounds
  score = Math.max(0, Math.min(100, score));

  // Determine stress level
  let level: 'low' | 'moderate' | 'high' | 'severe';
  if (score <= 25) {
    level = 'low';
  } else if (score <= 50) {
    level = 'moderate';
  } else if (score <= 75) {
    level = 'high';
  } else {
    level = 'severe';
  }

  // Generate recommendations based on assessment
  if (survey.stressLevel >= 4) {
    recommendations.push('Consider stress management techniques like deep breathing or meditation');
  }

  if (survey.anxietyFrequency >= 4) {
    recommendations.push('Practice anxiety reduction methods such as progressive muscle relaxation');
  }

  if (survey.depressionSymptoms >= 4) {
    recommendations.push('Seek support from a mental health professional');
  }

  if (survey.workLifeBalance <= 2) {
    recommendations.push('Work on establishing healthier work-life boundaries');
  }

  if (survey.socialSupport <= 2) {
    recommendations.push('Build stronger social connections and support networks');
  }

  if (survey.physicalActivity <= 2) {
    recommendations.push('Incorporate regular physical exercise into your routine');
  }

  if (survey.healthHabits <= 2) {
    recommendations.push('Focus on improving sleep, nutrition, and daily wellness habits');
  }

  if (survey.copingMechanisms <= 2) {
    recommendations.push('Develop healthy coping strategies for managing stress');
  }

  if (demographic.sleepingProblem !== 'none') {
    recommendations.push('Address sleep issues through better sleep hygiene or professional help');
  }

  // Add general recommendations based on stress level
  if (level === 'severe') {
    recommendations.unshift('Strongly consider speaking with a mental health professional immediately');
    riskFactors.push('High overall stress burden');
  } else if (level === 'high') {
    recommendations.unshift('Consider professional guidance for stress management');
    riskFactors.push('Elevated stress levels requiring attention');
  } else if (level === 'moderate') {
    recommendations.push('Maintain awareness of stress levels and continue healthy practices');
  } else {
    recommendations.push('Continue your current positive mental health practices');
  }

  // Ensure we have some risk factors for higher stress levels
  if (level !== 'low' && riskFactors.length === 0) {
    riskFactors.push('Multiple stress indicators present');
  }

  // Get ML prediction
  const mlPrediction = predictStressML(demographic, survey);

  return {
    level,
    score: Math.round(score),
    recommendations: recommendations.slice(0, 6), // Limit to 6 recommendations
    riskFactors: riskFactors.slice(0, 5), // Limit to 5 risk factors
    mlPrediction
  };
};