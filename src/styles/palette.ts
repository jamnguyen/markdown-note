import type { PaletteOptions } from '@mui/material';

const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#6C63FF',
    contrastText: '#fff',
  },
  secondary: {
    main: '#FFD166',
    contrastText: '#222',
  },
  background: {
    default: '#F8F8F5',
    paper: '#FFFDF6',
  },
  text: {
    primary: '#222',
    secondary: '#6C63FF',
  },
  success: {
    main: '#A3E635',
  },
  error: {
    main: '#FF6B6B',
  },
  info: {
    main: '#56CCF2',
  },
  warning: {
    main: '#FFD166',
  },
  border: '#E0E0E0',
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#6C63FF',
    contrastText: '#fff',
  },
  secondary: {
    main: '#FFD166',
    contrastText: '#222',
  },
  background: {
    default: '#18181b',
    paper: '#232326',
  },
  text: {
    primary: '#f3f3f3',
    secondary: '#A3A3FF',
  },
  success: {
    main: '#A3E635',
  },
  error: {
    main: '#FF6B6B',
  },
  info: {
    main: '#56CCF2',
  },
  warning: {
    main: '#FFD166',
  },
  border: '#33343a',
};

export default palette;
export { darkPalette };
