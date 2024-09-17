import { useRef } from 'react';
import * as XLSX from 'xlsx';

interface FileInputProps {
  onUrlsSet: (urls: string[]) => void;
}

export default function FileInput({ onUrlsSet }: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      await handleUpload(selectedFile);
    }
  };

  const handleUpload = async (selectedFile: File) => {
    const data = await selectedFile.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const urls = jsonData.flat().filter((url): url is string => typeof url === 'string');
    onUrlsSet(urls);
  };

  return (
    <input 
      type="file" 
      onChange={handleFileChange} 
      accept=".xlsx,.xls"
      data-text="Wybierz plik"
      className="file-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      ref={fileInputRef}
    />
  );
}