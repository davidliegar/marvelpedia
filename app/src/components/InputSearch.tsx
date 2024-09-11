import { useState } from 'react';

// Define types for the props
interface InputSearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

function InputSearch({ placeholder, onSearch, className }: InputSearchProps & { className: string }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className={`${className} flex items-center`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
        placeholder={placeholder}
      />

      <button
        onClick={handleSearch}
        className="bg-red-500 text-white px-4 py-2 rounded-r hover:bg-red-600 focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default InputSearch;
