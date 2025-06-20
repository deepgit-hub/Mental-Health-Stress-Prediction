import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Calendar, Heart, GraduationCap, Briefcase, Moon } from 'lucide-react';
import { DemographicData } from '../types';

interface DemographicFormProps {
  onSubmit: (data: DemographicData) => void;
  onBack: () => void;
}

const DemographicForm: React.FC<DemographicFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<DemographicData>({
    age: 25,
    gender: 'prefer-not-to-say',
    maritalStatus: 'single',
    education: 'bachelors',
    occupation: 'employed',
    sleepingProblem: 'none'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof DemographicData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
          <p className="text-gray-600">Help us personalize your mental health assessment</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step 1 of 2</span>
            <span>50% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full w-1/2 transition-all duration-300"></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/70 backdrop-blur rounded-2xl p-8 border border-gray-200 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                Age
              </label>
              <input
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 mr-2 text-blue-500" />
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="prefer-not-to-say">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Heart className="h-4 w-4 mr-2 text-emerald-500" />
                Marital Status
              </label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => handleChange('maritalStatus', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Education */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <GraduationCap className="h-4 w-4 mr-2 text-blue-500" />
                Education Level
              </label>
              <select
                value={formData.education}
                onChange={(e) => handleChange('education', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="high-school">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD/Doctorate</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="h-4 w-4 mr-2 text-emerald-500" />
                Employment Status
              </label>
              <select
                value={formData.occupation}
                onChange={(e) => handleChange('occupation', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="employed">Employed</option>
                <option value="student">Student</option>
                <option value="unemployed">Unemployed</option>
                <option value="self-employed">Self-employed</option>
                <option value="retired">Retired</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Sleeping Problems */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Moon className="h-4 w-4 mr-2 text-blue-500" />
                Sleep Quality Issues
              </label>
              <select
                value={formData.sleepingProblem}
                onChange={(e) => handleChange('sleepingProblem', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="none">No sleep problems</option>
                <option value="mild">Mild sleep issues</option>
                <option value="moderate">Moderate sleep problems</option>
                <option value="severe">Severe sleep problems</option>
              </select>
            </div>

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
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DemographicForm;