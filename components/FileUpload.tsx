import { useState, useRef } from 'react';
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
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textInputError, setTextInputError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setIsUploaded(false);
    }
    if (showTextInput) {
      setShowTextInput(false);
      setTextInput('');  // Opcjonalnie: wyczyść zawartość pola tekstowego
      setTextInputError('');  // Opcjonalnie: wyczyść błędy pola tekstowego
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

  const handleAddAsText = () => {
    setShowTextInput(true);
    if (file) {
      setFile(null);
      setIsUploaded(false);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    setTextInputError('');
  };

  const validateAndSetUrls = () => {
    const lines = textInput.split('\n').map(line => line.trim()).filter(line => line !== '');
    const invalidLines = lines.filter(line => !line.startsWith('http://') && !line.startsWith('https://'));
    
    if (invalidLines.length > 0) {
      setTextInputError(`Wrong links in lines: ${invalidLines.map((_, index) => index + 1).join(', ')}`);
    } else {
      setUrls(lines);
      setShowTextInput(false);
      setTextInput('');
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
      <h2 className="text-xl font-semibold mb-4">Please upload your excel file or add links as text</h2>
      <div className="flex items-center space-x-4 mb-4">
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept=".xlsx,.xls"
          data-text="Choose file"
          className="file-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          ref={fileInputRef}
        />
        <button 
          onClick={handleUpload} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          disabled={!file}
        >
          Check file
        </button>
        <button 
          onClick={handleAddAsText}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Add as text
        </button>
      </div>
      {showTextInput && (
        <div className="mt-4">
          <textarea
            value={textInput}
            onChange={handleTextInputChange}
            placeholder="Add links here, each on a new line"
            className="w-full h-32 p-2 border rounded"
          />
          {textInputError && <p className="text-red-500 mt-2">{textInputError}</p>}
          <button 
            onClick={validateAndSetUrls}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Check links
          </button>
        </div>
      )}
      {isUploaded && (
        <p className="mt-2 text-green-600">Linki zostały pomyślnie dodane!</p>
      )}
      {((foundUrls && foundUrls.length > 0) || (notFoundUrls && notFoundUrls.length > 0)) && (
        <button 
          onClick={handleDownloadReport}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Download raport
        </button>
      )}
    </div>
  );
}