import { useState } from 'react';
import * as XLSX from 'xlsx';
import styles from '../styles/FileUpload.module.css';

interface FileUploadProps {
  setUrls: (urls: string[]) => void;
  foundUrls?: string[];
  notFoundUrls?: string[];
}

export default function FileUpload({ setUrls, foundUrls = [], notFoundUrls = [] }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setIsUploaded(false);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const urls = jsonData.flat().filter((url): url is string => typeof url === 'string');
      setUrls(urls);
      setIsUploaded(true);
    }
  };

  const handleDownloadReport = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([
      ['Found URLs', 'Not Found URLs'],
      ...Array.from({ length: Math.max(foundUrls.length, notFoundUrls.length) }, (_, i) => [
        foundUrls[i] || '',
        notFoundUrls[i] || ''
      ])
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'URL Report');
    XLSX.writeFile(workbook, 'url_report.xlsx');
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
      <div className="flex items-center space-x-4">
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept=".xlsx,.xls"
          data-text="Choose file"
          className="file-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button 
          onClick={handleUpload} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          disabled={!file}
        >
          Upload File
        </button>
      </div>
      {isUploaded && (
        <p className="mt-2 text-green-600">File uploaded successfully!</p>
      )}
      {((foundUrls && foundUrls.length > 0) || (notFoundUrls && notFoundUrls.length > 0)) && (
        <button 
          onClick={handleDownloadReport}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Pobierz raport
        </button>
      )}
    </div>
  );
}