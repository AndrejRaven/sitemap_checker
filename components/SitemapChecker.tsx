import { useState } from 'react';
import SitemapUrlInput from './SitemapChecker/SitemapUrlInput';
import ActionButtons from './SitemapChecker/ActionButtons';
import ResultsDisplay from './SitemapChecker/ResultsDisplay';
import { fetchSitemapUrls, checkUrls } from '../utils/sitemapUtils';
import { generateReport, downloadSitemapUrls } from '../utils/reportUtils';

interface SitemapCheckerProps {
  urls: string[];
}

export default function SitemapChecker({ urls }: SitemapCheckerProps) {
  const [sitemapUrls, setSitemapUrls] = useState<string[]>([]);
  const [results, setResults] = useState<{ url: string; inSitemap: boolean }[]>([]);
  const [sitemapUrl, setSitemapUrl] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isUrlValid, setIsUrlValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSitemapUrlChange = (newUrl: string, isValid: boolean) => {
    setSitemapUrl(newUrl);
    setIsUrlValid(isValid);
  };

  const handleCheckSitemap = async () => {
    if (urls.length === 0) {
      setErrorMessage("Please upload a file or add URLs before checking the sitemap.");
      return;
    }

    setErrorMessage(null);

    if (sitemapUrl && isUrlValid) {
      setIsChecking(true);
      try {
        const newSitemapUrls = await fetchSitemapUrls(sitemapUrl);
        setSitemapUrls(newSitemapUrls);
        const newResults = checkUrls(urls, newSitemapUrls);
        setResults(newResults);
      } catch (error) {
        console.error('Error checking sitemap:', error);
        setResults([]);
      } finally {
        setIsChecking(false);
      }
    }
  };

  const handleDownloadSitemapUrls = async () => {
    if (sitemapUrl && isUrlValid) {
      setIsChecking(true);
      try {
        await downloadSitemapUrls(sitemapUrl);
      } catch (error) {
        console.error('Error downloading sitemap:', error);
        alert('An error occurred while downloading the sitemap. Check the console for more information.');
      } finally {
        setIsChecking(false);
      }
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Check Sitemap</h2>
      <SitemapUrlInput
        sitemapUrl={sitemapUrl}
        isUrlValid={isUrlValid}
        onChange={handleSitemapUrlChange}
      />
      <ActionButtons
        isChecking={isChecking}
        isUrlValid={isUrlValid}
        sitemapUrl={sitemapUrl}
        onCheckSitemap={handleCheckSitemap}
        onDownloadSitemapUrls={handleDownloadSitemapUrls}
      />
      {errorMessage && (
        <p className="text-red-500 mt-2">{errorMessage}</p>
      )}
      <ResultsDisplay
        results={results}
        onGenerateReport={() => generateReport(results)}
      />
    </div>
  );
}