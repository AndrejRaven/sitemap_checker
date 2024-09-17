import React from 'react';

interface ActionButtonsProps {
  isChecking: boolean;
  isUrlValid: boolean | null;
  sitemapUrl: string;
  onCheckSitemap: () => void;
  onDownloadSitemapUrls: () => void;
}

export default function ActionButtons({
  isChecking,
  isUrlValid,
  sitemapUrl,
  onCheckSitemap,
  onDownloadSitemapUrls
}: ActionButtonsProps) {
  return (
    <div className="flex space-x-4 mb-4">
      <button 
        onClick={onCheckSitemap} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        disabled={isChecking || !sitemapUrl || !isUrlValid}
      >
        {isChecking ? 'Checking...' : 'Check Sitemap'}
      </button>
      <button 
        onClick={onDownloadSitemapUrls} 
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        disabled={isChecking || !sitemapUrl || !isUrlValid}
      >
        Download whole sitemap as XLSX
      </button>
    </div>
  );
}