import React from 'react';
import { ToggleButton } from '@mui/material';
import { Sun, Moon, Desktop } from 'phosphor-react';
import { ThemePickerContainer, StyledToggleButtonGroup } from './ThemePicker.styled';
import type { ThemePickerProps } from './ThemePicker.types';

export const ThemePicker: React.FC<ThemePickerProps> = ({ mode, onChange }) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (value) {
      onChange(value as 'light' | 'dark' | 'system');
    }
  };

  return (
    <ThemePickerContainer>
      <StyledToggleButtonGroup value={mode} exclusive onChange={handleChange} size='small'>
        <ToggleButton value='light'>
          <Sun size={16} />
        </ToggleButton>
        <ToggleButton value='dark'>
          <Moon size={16} />
        </ToggleButton>
        <ToggleButton value='system'>
          <Desktop size={16} />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </ThemePickerContainer>
  );
};
