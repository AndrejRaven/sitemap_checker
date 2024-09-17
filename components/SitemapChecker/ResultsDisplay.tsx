import React from 'react';

interface ResultsDisplayProps {
  results: { url: string; inSitemap: boolean }[];
  onGenerateReport: () => void;
}

export default function ResultsDisplay({ results, onGenerateReport }: ResultsDisplayProps) {
  if (results.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Check Results:</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2 text-green-600">
            Found URLs ({results.filter(r => r.inSitemap).length})
          </h4>
          <ul className="bg-white rounded-lg p-2 max-h-60 overflow-y-auto">
            {results.filter(r => r.inSitemap).map((result, index) => (
              <li key={index} className="text-sm mb-1">{result.url}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2 text-red-600">
            Not Found URLs ({results.filter(r => !r.inSitemap).length})
          </h4>
          <ul className="bg-white rounded-lg p-2 max-h-60 overflow-y-auto">
            {results.filter(r => !r.inSitemap).map((result, index) => (
              <li key={index} className="text-sm mb-1">{result.url}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <button 
        onClick={onGenerateReport} 
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Download Report XLSX
      </button>
    </div>
  );
}