import { useState } from 'react';
import FileInput from './FileUpload/FileInput';
import TextInput from './FileUpload/TextInput';
import UploadStatus from './FileUpload/UploadStatus';

interface FileUploadProps {
  setUrls: (urls: string[]) => void;
  foundUrls?: string[];
  notFoundUrls?: string[];
}

export default function FileUpload({ setUrls, foundUrls = [], notFoundUrls = [] }: FileUploadProps) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);

  const handleFileUpload = (urls: string[]) => {
    setUrls(urls);
    setIsUploaded(true);
    setShowTextInput(false);
  };

  const handleAddAsText = () => {
    setShowTextInput(true);
    setIsUploaded(false);
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Please upload an Excel file or add links as text</h2>
      <div className="flex items-center space-x-4 mb-4">
        <FileInput onUpload={handleFileUpload} />
        <button 
          onClick={handleAddAsText}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Add as text
        </button>
      </div>
      {showTextInput && (
        <TextInput onSubmit={handleFileUpload} />
      )}
      <UploadStatus isUploaded={isUploaded} />
    </div>
  );
}