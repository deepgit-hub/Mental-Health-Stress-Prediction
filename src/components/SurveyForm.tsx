import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Activity, Brain, Heart, Scale, Users, Dumbbell, Apple, Shield } from 'lucide-react';
import { SurveyData } from '../types';

interface SurveyFormProps {
  onSubmit: (data: SurveyData) => void;
  onBack: () => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<SurveyData>({
    stressLevel: 3,
    anxietyFrequency: 3,
    depressionSymptoms: 3,
    workLifeBalance: 3,
    socialSupport: 3,
    physicalActivity: 3,
    healthHabits: 3,
    copingMechanisms: 3
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSliderChange = (field: keyof SurveyData, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const SliderField = ({ 
    field, 
    label, 
    icon: Icon, 
    leftLabel, 
    rightLabel, 
    color = 'blue' 
  }: {
    field: keyof SurveyData;
    label: string;
    icon: any;
    leftLabel: string;
    rightLabel: string;
    color?: 'blue' | 'emerald' | 'indigo';
  }) => {
    const colorClasses = {
      blue: 'text-blue-500',
      emerald: 'text-emerald-500',
      indigo: 'text-indigo-500'
    };

    return (
      <div className="space-y-3">
        <label className={`flex items-center text-sm font-medium text-gray-700`}>
          <Icon className={`h-4 w-4 mr-2 ${colorClasses[color]}`} />
          {label}
        </label>
        <div className="px-3">
          <input
            type="range"
            min="1"
            max="5"
            value={formData[field]}
            onChange={(e) => handleSliderChange(field, parseInt(e.target.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider-${color}`}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{leftLabel}</span>
            <span className="font-medium text-gray-700">{formData[field]}/5</span>
            <span>{rightLabel}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Wellness Assessment</h2>
          <p className="text-gray-600">Rate each area on a scale of 1 to 5 based on your recent experiences</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step 2 of 2</span>
            <span>100% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full w-full transition-all duration-300"></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/70 backdrop-blur rounded-2xl p-8 border border-gray-200 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <SliderField
              field="stressLevel"
              label="Overall Stress Level"
              icon={Activity}
              leftLabel="Very Low"
              rightLabel="Very High"
              color="blue"
            />

            <SliderField
              field="anxietyFrequency"
              label="Anxiety Frequency"
              icon={Heart}
              leftLabel="Rarely"
              rightLabel="Very Often"
              color="indigo"
            />

            <SliderField
              field="depressionSymptoms"
              label="Depression Symptoms"
              icon={Brain}
              leftLabel="None"
              rightLabel="Severe"
              color="blue"
            />

            <SliderField
              field="workLifeBalance"
              label="Work-Life Balance"
              icon={Scale}
              leftLabel="Poor"
              rightLabel="Excellent"
              color="emerald"
            />

            <SliderField
              field="socialSupport"
              label="Social Support System"
              icon={Users}
              leftLabel="Very Weak"
              rightLabel="Very Strong"
              color="blue"
            />

            <SliderField
              field="physicalActivity"
              label="Physical Activity Level"
              icon={Dumbbell}
              leftLabel="Sedentary"
              rightLabel="Very Active"
              color="emerald"
            />

            <SliderField
              field="healthHabits"
              label="Healthy Lifestyle Habits"
              icon={Apple}
              leftLabel="Poor"
              rightLabel="Excellent"
              color="emerald"
            />

            <SliderField
              field="copingMechanisms"
              label="Stress Coping Abilities"
              icon={Shield}
              leftLabel="Poor"
              rightLabel="Excellent"
              color="indigo"
            />

            {/* Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Get Results
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .slider-blue::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider-emerald::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10B981;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider-indigo::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #6366F1;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider-blue::-webkit-slider-track {
          background: linear-gradient(to right, #DBEAFE, #3B82F6);
          border-radius: 10px;
        }
        .slider-emerald::-webkit-slider-track {
          background: linear-gradient(to right, #D1FAE5, #10B981);
          border-radius: 10px;
        }
        .slider-indigo::-webkit-slider-track {
          background: linear-gradient(to right, #E0E7FF, #6366F1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default SurveyForm;