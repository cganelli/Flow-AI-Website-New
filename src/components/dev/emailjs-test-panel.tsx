"use client";

import { useState } from 'react';
import { EmailJSTestUtility } from '@/lib/emailjs-test';

// This component is for development testing only
// Remove or comment out in production

interface TestResult {
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

export default function EmailJSTestPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [quickCheck, setQuickCheck] = useState(EmailJSTestUtility.quickCheck());

  const runFullTest = async () => {
    setIsRunning(true);
    try {
      const { results } = await EmailJSTestUtility.runFullTest();
      setTestResults(results);
      setQuickCheck(EmailJSTestUtility.quickCheck());
    } catch (error) {
      console.error('Test error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const refreshQuickCheck = () => {
    setQuickCheck(EmailJSTestUtility.quickCheck());
  };

  const downloadReport = () => {
    const report = EmailJSTestUtility.generateReport();
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emailjs-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">
            📧 EmailJS Test Panel
          </h3>
          <div className={`w-3 h-3 rounded-full ${
            quickCheck.isReady ? 'bg-green-500' : 'bg-red-500'
          }`} />
        </div>

        {/* Quick Status */}
        <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
          <div className="font-medium mb-1">
            Status: {quickCheck.isReady ? '✅ Ready' : '❌ Not Ready'}
          </div>
          {quickCheck.issues.length > 0 && (
            <div className="text-red-600">
              Issues: {quickCheck.issues.length}
            </div>
          )}
        </div>

        {/* Issues */}
        {quickCheck.issues.length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-medium text-red-600 mb-1">Issues:</div>
            {quickCheck.issues.slice(0, 2).map((issue, index) => (
              <div key={index} className="text-xs text-red-600">
                • {issue}
              </div>
            ))}
            {quickCheck.issues.length > 2 && (
              <div className="text-xs text-red-600">
                ... and {quickCheck.issues.length - 2} more
              </div>
            )}
          </div>
        )}

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-medium text-gray-700 mb-1">Last Test Results:</div>
            <div className="space-y-1">
              {testResults.map((result, index) => (
                <div key={index} className="text-xs flex items-center">
                  <span className="mr-2">
                    {result.status === 'pass' ? '✅' : 
                     result.status === 'warning' ? '⚠️' : '❌'}
                  </span>
                  <span className="truncate">{result.test}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={refreshQuickCheck}
            className="w-full text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
          >
            Refresh Status
          </button>
          
          <button
            onClick={runFullTest}
            disabled={isRunning}
            className="w-full text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded disabled:opacity-50"
          >
            {isRunning ? 'Running Tests...' : 'Run Full Test'}
          </button>

          <button
            onClick={downloadReport}
            className="w-full text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
          >
            Download Report
          </button>
        </div>

        {/* Warning */}
        <div className="mt-2 text-xs text-gray-500 border-t pt-2">
          ⚠️ Development only - This panel will not appear in production
        </div>
      </div>
    </div>
  );
}