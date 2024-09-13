import { Icon } from '@iconify/react/dist/iconify.js';
import { KeyboardEvent, useState } from 'react';
import { StyledButton, StyledInput, StyledWrapper } from './styles';

// Define types for the props
interface InputSearchProps {
  placeholder: string;
  disabled?: boolean
  onSearch: (query: string) => void;
}

function InputSearch({ placeholder, onSearch, className, disabled }: InputSearchProps & { className?: string }) {
  const [searchTerm, setSearchTerm] = useState(''),

   handleSearch = () => {
    onSearch(searchTerm);
  },

   handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  }

  return (
    <StyledWrapper className={`${className}`}>
      <StyledInput
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
      />

      <StyledButton
        onClick={handleSearch}
        data-testid="search-cta"
        disabled={disabled}
      >
        <Icon icon="ic:outline-search"/>
      </StyledButton>
    </StyledWrapper>
  );
};

export default InputSearch;
