import { useState } from 'react';
import FileInput from './FileInput';
import TextInput from './TextInput';

interface FileUploadProps {
  setUrls: (urls: string[]) => void;
  foundUrls?: string[];
  notFoundUrls?: string[];
}

export default function FileUpload({ setUrls, foundUrls = [], notFoundUrls = [] }: FileUploadProps) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);

  const handleAddAsText = () => {
    setShowTextInput(true);
    setIsUploaded(false);
  };

  const handleUrlsSet = (urls: string[]) => {
    setUrls(urls);
    setIsUploaded(true);
    setShowTextInput(false);
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Proszę wgrać plik Excel lub dodać linki jako tekst</h2>
      <div className="flex items-center space-x-4 mb-4">
        <FileInput onUrlsSet={handleUrlsSet} />
        <button 
          onClick={handleAddAsText}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Dodaj jako tekst
        </button>
      </div>
      {showTextInput && <TextInput onUrlsSet={handleUrlsSet} />}
      {isUploaded && (
        <p className="mt-2 text-green-600">Linki zostały pomyślnie dodane!</p>
      )}
    </div>
  );
}