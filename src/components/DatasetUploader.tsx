import React, { useState } from 'react';
import { Upload, FileText, BarChart3, AlertCircle, CheckCircle } from 'lucide-react';
import { processExcelFile, validateDataset, calculateDatasetStats, simulateDataProcessing } from '../utils/datasetProcessor';
import { DatasetRow } from '../types';

interface DatasetUploaderProps {
  onDatasetLoaded: (data: DatasetRow[]) => void;
}

const DatasetUploader: React.FC<DatasetUploaderProps> = ({ onDatasetLoaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [datasetStats, setDatasetStats] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setErrorMessage('Please upload an Excel file (.xlsx or .xls)');
      setUploadStatus('error');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      const data = await processExcelFile(file);
      
      if (!validateDataset(data)) {
        throw new Error('Invalid dataset format. Please ensure your file contains the required columns.');
      }

      // Process the data (simulate Python processing)
      const processedData = simulateDataProcessing(data);
      
      // Calculate statistics
      const stats = calculateDatasetStats(processedData);
      setDatasetStats(stats);
      
      // Notify parent component
      onDatasetLoaded(processedData);
      
      setUploadStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to process file');
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur rounded-2xl p-8 border border-gray-200 shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full mb-4">
          <Upload className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Dataset Upload</h3>
        <p className="text-gray-600">Upload your Mental_Health_Survey_Dataset.xlsx file to enhance predictions</p>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="hidden"
          id="dataset-upload"
          disabled={isUploading}
        />
        <label
          htmlFor="dataset-upload"
          className={`cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            {isUploading ? 'Processing...' : 'Click to upload Excel file'}
          </p>
          <p className="text-sm text-gray-500">
            Supports .xlsx and .xls files (Mental_Health_Survey_Dataset.xlsx)
          </p>
        </label>
      </div>

      {/* Status Messages */}
      {uploadStatus === 'success' && (
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
            <span className="text-emerald-800 font-medium">Dataset uploaded successfully!</span>
          </div>
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800 font-medium">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Dataset Statistics */}
      {datasetStats && (
        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
            <h4 className="font-semibold text-blue-900">Dataset Overview</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-600 font-medium">Total Records:</span>
              <div className="text-blue-900 font-bold text-lg">{datasetStats.totalRows}</div>
            </div>
            
            <div>
              <span className="text-blue-600 font-medium">Age Range:</span>
              <div className="text-blue-900 font-bold">
                {Math.round(datasetStats.ageStats.min)}-{Math.round(datasetStats.ageStats.max)}
              </div>
            </div>
            
            <div>
              <span className="text-blue-600 font-medium">Avg Age:</span>
              <div className="text-blue-900 font-bold">{Math.round(datasetStats.ageStats.mean)}</div>
            </div>
            
            <div>
              <span className="text-blue-600 font-medium">Missing Values:</span>
              <div className="text-blue-900 font-bold">
                {Object.keys(datasetStats.missingValues).length} columns
              </div>
            </div>
          </div>

          {Object.keys(datasetStats.genderDistribution).length > 0 && (
            <div className="mt-4">
              <span className="text-blue-600 font-medium text-sm">Gender Distribution:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {Object.entries(datasetStats.genderDistribution).map(([gender, count]) => (
                  <span key={gender} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {gender}: {count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">Expected File Format:</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Excel file (.xlsx or .xls)</li>
          <li>• Contains columns: age, gender, marital status, education, etc.</li>
          <li>• Survey questions Q3.1 to Q3.21 for stress/anxiety/depression assessment</li>
          <li>• File name: Mental_Health_Survey_Dataset.xlsx (recommended)</li>
        </ul>
      </div>
    </div>
  );
};

export default DatasetUploader;