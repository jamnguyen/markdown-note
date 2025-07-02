import type { PaletteOptions } from '@mui/material';

// Modern pastel color palette with soft, contemporary colors
const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#7C3AED', // Soft purple
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#06B6D4', // Soft cyan
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F5F6F7', // Softer light gray
    paper: '#FBFBFB', // Off-white instead of pure white
  },
  text: {
    primary: '#1F2937', // Dark gray
    secondary: '#6B7280', // Medium gray
  },
  action: {
    hover: 'rgba(0, 0, 0, 0.06)', // Slightly more visible hover
  },
  success: {
    main: '#10B981', // Soft green
  },
  error: {
    main: '#EF4444', // Soft red
  },
  info: {
    main: '#3B82F6', // Soft blue
  },
  warning: {
    main: '#F59E0B', // Soft amber
  },
  // Custom modern colors
  retro: {
    amber: '#FDE68A', // Pastel amber
    pink: '#FBBF24', // Pastel pink
    cyan: '#A7F3D0', // Pastel cyan
    purple: '#C4B5FD', // Pastel purple
    green: '#BBF7D0', // Pastel green
    blue: '#BFDBFE', // Pastel blue
    cream: '#FEF3C7', // Pastel cream
    beige: '#F3F4F6', // Light beige
    brown: '#9CA3AF', // Soft brown
    shadow: 'rgba(0, 0, 0, 0.08)',
  },
  border: '#E0E2E5', // Softer border color
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#8B5CF6', // Lighter purple for dark mode
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#22D3EE', // Lighter cyan for dark mode
    contrastText: '#000000',
  },
  background: {
    default: '#1E1E1E', // VS Code dark background
    paper: '#252526', // VS Code sidebar/panel background
  },
  text: {
    primary: '#F9FAFB', // Light gray
    secondary: '#9CA3AF', // Medium gray
  },
  action: {
    hover: 'rgba(255, 255, 255, 0.08)', // Light grey for hover in dark mode
  },
  success: {
    main: '#34D399', // Lighter green for dark mode
  },
  error: {
    main: '#F87171', // Lighter red for dark mode
  },
  info: {
    main: '#60A5FA', // Lighter blue for dark mode
  },
  warning: {
    main: '#FBBF24', // Lighter amber for dark mode
  },
  // Custom modern colors for dark mode
  retro: {
    amber: '#FDE68A',
    pink: '#FBBF24',
    cyan: '#A7F3D0',
    purple: '#C4B5FD',
    green: '#BBF7D0',
    blue: '#BFDBFE',
    cream: '#FEF3C7',
    beige: '#3C3C3C',
    brown: '#6B7280',
    shadow: 'rgba(0, 0, 0, 0.25)',
  },
  border: '#3C3C3C',
};

export default palette;
export { darkPalette };
