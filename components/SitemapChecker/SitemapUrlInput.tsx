import React from 'react';
import { validateUrl } from '../../utils/sitemapUtils';

interface SitemapUrlInputProps {
  sitemapUrl: string;
  isUrlValid: boolean | null;
  onChange: (url: string, isValid: boolean) => void;
}

export default function SitemapUrlInput({ sitemapUrl, isUrlValid, onChange }: SitemapUrlInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    onChange(newUrl, validateUrl(newUrl));
  };

  return (
    <div className="mb-4">
      <label htmlFor="sitemapUrl" className="block mb-2 font-medium">Sitemap URL:</label>
      <input
        type="text"
        id="sitemapUrl"
        value={sitemapUrl}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded ${
          isUrlValid === false ? 'border-red-500' : isUrlValid ? 'border-green-500' : ''
        }`}
      />
      {isUrlValid === false && (
        <p className="mt-1 text-red-500">Please enter a valid URL</p>
      )}
    </div>
  );
}