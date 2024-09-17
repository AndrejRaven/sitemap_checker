import { useState } from 'react';

interface TextInputProps {
  onSubmit: (urls: string[]) => void;
}

export default function TextInput({ onSubmit }: TextInputProps) {
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
      setTextInputError(`Invalid links in lines: ${invalidLines.map((_, index) => index + 1).join(', ')}`);
    } else {
      onSubmit(lines);
    }
  };

  return (
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
  );
}