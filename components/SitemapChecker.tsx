import { useState } from 'react';
import axios from 'axios';
import * as xml2js from 'xml2js';
import * as XLSX from 'xlsx';

interface SitemapCheckerProps {
  urls: string[];
}

export default function SitemapChecker({ urls }: SitemapCheckerProps) {
  const [sitemapUrls, setSitemapUrls] = useState<string[]>([]);
  const [results, setResults] = useState<{ url: string; inSitemap: boolean }[]>([]);
  const [sitemapUrl, setSitemapUrl] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isUrlValid, setIsUrlValid] = useState<boolean | null>(null);

  const validateUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const fetchSitemap = async () => {
    if (!sitemapUrl) return;

    try {
      setIsChecking(true);
      const response = await axios.get('/api/fetch-sitemap', {
        params: { url: sitemapUrl }
      });
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(response.data);
      const newSitemapUrls = result.urlset.url.map((item: any) => item.loc[0]);
      setSitemapUrls(newSitemapUrls);
      checkUrls(newSitemapUrls);
    } catch (error) {
      console.error('Error fetching sitemap:', error);
      setResults([]);
    } finally {
      setIsChecking(false);
    }
  };

  const checkUrls = (sitemapUrlsToCheck: string[]) => {
    if (!urls || urls.length === 0 || !sitemapUrlsToCheck || sitemapUrlsToCheck.length === 0) {
      setResults([]);
      return;
    }

    const newResults = urls.map(url => ({
      url,
      inSitemap: sitemapUrlsToCheck.includes(url),
    }));
    setResults(newResults);
  };

  const handleSitemapUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setSitemapUrl(newUrl);
    setIsUrlValid(validateUrl(newUrl));
  };

  const handleCheckSitemap = () => {
    if (sitemapUrl && isUrlValid) {
      fetchSitemap();
    }
  };

  // Dodaj nową funkcję do generowania raportu
  const generateReport = () => {
    const foundUrls = results.filter(r => r.inSitemap).map(r => r.url);
    const notFoundUrls = results.filter(r => !r.inSitemap).map(r => r.url);
    const maxLength = Math.max(foundUrls.length, notFoundUrls.length);

    const data = Array(maxLength).fill(null).map((_, i) => ({
      "Found URLs": foundUrls[i] || "",
      "Not Found URLs": notFoundUrls[i] || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Ustawienie szerokości kolumn
    const colWidths = [{ wch: 50 }, { wch: 50 }];
    worksheet['!cols'] = colWidths;

    // Dodanie stylów
    const greenFill = { fgColor: { rgb: "90EE90" } }; // Jasny zielony
    const redFill = { fgColor: { rgb: "FFC0CB" } }; // Jasny czerwony

    for (let i = 0; i < maxLength + 1; i++) {
      const foundCell = XLSX.utils.encode_cell({ r: i, c: 0 });
      const notFoundCell = XLSX.utils.encode_cell({ r: i, c: 1 });

      if (!worksheet[foundCell]) worksheet[foundCell] = {};
      if (!worksheet[notFoundCell]) worksheet[notFoundCell] = {};

      worksheet[foundCell].s = { fill: greenFill };
      worksheet[notFoundCell].s = { fill: redFill };
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Raport");
    XLSX.writeFile(workbook, "raport_sitemap.xlsx");
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Check Sitemap</h2>
      <div className="mb-4">
        <label htmlFor="sitemapUrl" className="block mb-2 font-medium">Sitemap URL:</label>
        <input
          type="text"
          id="sitemapUrl"
          value={sitemapUrl}
          onChange={handleSitemapUrlChange}
          className={`w-full px-3 py-2 border rounded ${
            isUrlValid === false ? 'border-red-500' : isUrlValid ? 'border-green-500' : ''
          }`}
        />
        {isUrlValid === false && (
          <p className="mt-1 text-red-500">Please enter a valid URL</p>
        )}
      </div>
      <button 
        onClick={handleCheckSitemap} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 mb-4"
        disabled={isChecking || !sitemapUrl || !isUrlValid}
      >
        {isChecking ? 'Checking...' : 'Check Sitemap'}
      </button>
      {results.length > 0 && (
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
                Not found URLs ({results.filter(r => !r.inSitemap).length})
              </h4>
              <ul className="bg-white rounded-lg p-2 max-h-60 overflow-y-auto">
                {results.filter(r => !r.inSitemap).map((result, index) => (
                  <li key={index} className="text-sm mb-1">{result.url}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Dodaj nowy przycisk do pobrania raportu */}
          <button 
            onClick={generateReport} 
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Download report XLSX
          </button>
        </div>
      )}
    </div>
  );
}