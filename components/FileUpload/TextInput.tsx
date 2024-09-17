import { useState } from 'react';

interface TextInputProps {
  onUrlsSet: (urls: string[]) => void;
}

export default function TextInput({ onUrlsSet }: TextInputProps) {
  const [textInput, setTextInput] = useState('');
  const [textInputError, setTextInputError] = useState('');

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    setTextInputError('');
  };

  const validateAndSetUrls = () => {
    const lines = textInput.split('\n').map(line => line.trim()).filter(line => line !== '');
    const invalidLines = lines.filter(line => !line.startsWith('http://') && !line.startsWith('https://'));
    
    if (invalidLines.length > 0) {
      setTextInputError(`Nieprawidłowe linki w liniach: ${invalidLines.map((_, index) => index + 1).join(', ')}`);
    } else {
      onUrlsSet(lines);
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={textInput}
        onChange={handleTextInputChange}
        placeholder="Dodaj linki tutaj, każdy w nowej linii"
        className="w-full h-32 p-2 border rounded"
      />
      {textInputError && <p className="text-red-500 mt-2">{textInputError}</p>}
      <button 
        onClick={validateAndSetUrls}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Sprawdź linki
      </button>
    </div>
  );
}