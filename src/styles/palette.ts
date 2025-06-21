import type { PaletteOptions } from '@mui/material';

// Retro color palette inspired by 80s/90s computer interfaces
const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#FF6B35', // Retro orange
    contrastText: '#FFFBF0',
  },
  secondary: {
    main: '#00D4AA', // Retro teal
    contrastText: '#1A1A1A',
  },
  background: {
    default: '#FFFBF0', // Warm cream
    paper: '#FFF8E7', // Light cream
  },
  text: {
    primary: '#2D2D2D', // Dark charcoal
    secondary: '#8B4513', // Retro brown
  },
  success: {
    main: '#32CD32', // Retro lime green
  },
  error: {
    main: '#FF4757', // Retro red
  },
  info: {
    main: '#3742FA', // Retro blue
  },
  warning: {
    main: '#FFA502', // Retro amber
  },
  // Custom retro colors
  retro: {
    amber: '#FFA502',
    pink: '#FF3838',
    cyan: '#00D4AA',
    purple: '#8E44AD',
    green: '#32CD32',
    blue: '#3742FA',
    cream: '#FFFBF0',
    beige: '#F5F5DC',
    brown: '#8B4513',
    shadow: 'rgba(0, 0, 0, 0.15)',
  },
  border: '#E8E8E8',
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#FF6B35', // Retro orange
    contrastText: '#1A1A1A',
  },
  secondary: {
    main: '#00D4AA', // Retro teal
    contrastText: '#1A1A1A',
  },
  background: {
    default: '#1A1A1A', // Dark charcoal
    paper: '#2D2D2D', // Medium charcoal
  },
  text: {
    primary: '#FFFBF0', // Warm cream
    secondary: '#FFA502', // Retro amber
  },
  success: {
    main: '#32CD32', // Retro lime green
  },
  error: {
    main: '#FF4757', // Retro red
  },
  info: {
    main: '#3742FA', // Retro blue
  },
  warning: {
    main: '#FFA502', // Retro amber
  },
  // Custom retro colors for dark mode
  retro: {
    amber: '#FFA502',
    pink: '#FF3838',
    cyan: '#00D4AA',
    purple: '#8E44AD',
    green: '#32CD32',
    blue: '#3742FA',
    cream: '#FFFBF0',
    beige: '#F5F5DC',
    brown: '#8B4513',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },
  border: '#404040',
};

export default palette;
export { darkPalette };
