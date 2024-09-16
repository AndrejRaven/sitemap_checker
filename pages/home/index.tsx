import { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import SitemapChecker from '../../components/SitemapChecker';

export default function Home() {
  const [urls, setUrls] = useState<string[]>([]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Sitemap Checker</h1>
      <div className="max-w-3xl mx-auto">
        <FileUpload setUrls={setUrls} />
        <SitemapChecker urls={urls} />
      </div>
    </div>
  );
}