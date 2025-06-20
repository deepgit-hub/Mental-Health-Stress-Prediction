import * as XLSX from 'xlsx';
import { DatasetRow } from '../types';

// Function to process uploaded Excel file
export const processExcelFile = (file: File): Promise<DatasetRow[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as DatasetRow[];
        
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

// Function to validate dataset structure
export const validateDataset = (data: DatasetRow[]): boolean => {
  if (!data || data.length === 0) return false;

  const firstRow = data[0];
  const requiredColumns = ['Age', 'Gender'];

  return requiredColumns.every(col => col in firstRow);
};

// Function to calculate dataset statistics
export const calculateDatasetStats = (data: DatasetRow[]) => {
  if (!data || data.length === 0) return null;
  
  const stats = {
    totalRows: data.length,
    ageStats: {
      min: 0,
      max: 0,
      mean: 0
    },
    genderDistribution: {} as Record<string, number>,
    stressLevels: {} as Record<string, number>,
    missingValues: {} as Record<string, number>
  };
  
  // Calculate age statistics
  const ages = data.map(row => row.age).filter(age => age != null && !isNaN(age));
  if (ages.length > 0) {
    stats.ageStats.min = Math.min(...ages);
    stats.ageStats.max = Math.max(...ages);
    stats.ageStats.mean = ages.reduce((sum, age) => sum + age, 0) / ages.length;
  }
  
  // Calculate gender distribution
  data.forEach(row => {
    if (row.gender) {
      stats.genderDistribution[row.gender] = (stats.genderDistribution[row.gender] || 0) + 1;
    }
  });
  
  // Calculate missing values for each column
  const columns = Object.keys(data[0] || {});
  columns.forEach(col => {
    const missingCount = data.filter(row => row[col] == null || row[col] === '').length;
    if (missingCount > 0) {
      stats.missingValues[col] = missingCount;
    }
  });
  
  return stats;
};

// Function to simulate the Python data processing steps
export const simulateDataProcessing = (data: DatasetRow[]) => {
  const processedData = data.map(row => {
    // Calculate stress, anxiety, depression scores (simulated)
    const stressQuestions = [];
    const anxietyQuestions = [];
    const depressionQuestions = [];
    
    // Extract Q3.1 to Q3.21 if they exist
    for (let i = 1; i <= 7; i++) {
      const key = `Q3.${i}`;
      if (row[key] != null) stressQuestions.push(Number(row[key]) || 0);
    }
    
    for (let i = 8; i <= 14; i++) {
      const key = `Q3.${i}`;
      if (row[key] != null) anxietyQuestions.push(Number(row[key]) || 0);
    }
    
    for (let i = 15; i <= 21; i++) {
      const key = `Q3.${i}`;
      if (row[key] != null) depressionQuestions.push(Number(row[key]) || 0);
    }
    
    const stressScore = stressQuestions.reduce((sum, val) => sum + val, 0);
    const anxietyScore = anxietyQuestions.reduce((sum, val) => sum + val, 0);
    const depressionScore = depressionQuestions.reduce((sum, val) => sum + val, 0);
    
    return {
      ...row,
      Stress_Score: stressScore,
      Anxiety_Score: anxietyScore,
      Depression_Score: depressionScore,
      High_Stress: stressScore > 10 ? 1 : 0
    };
  });
  
  return processedData;
};