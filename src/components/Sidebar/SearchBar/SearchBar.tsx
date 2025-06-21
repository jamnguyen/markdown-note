import React from 'react';
import { SearchContainer, StyledTextField } from './SearchBar.styled';
import type { SearchBarProps } from './SearchBar.types';

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search notes...' }) => {
  return (
    <SearchContainer>
      <StyledTextField
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant='standard'
        InputProps={{}}
      />
    </SearchContainer>
  );
};
