import type { ThemeOptions } from '@mui/material/styles';

// Retro shadows - bolder, more defined shadows for that vintage computer look
const shadows = [
  'none',
  '2px 2px 0px rgba(0, 0, 0, 0.25)', // Retro hard shadow
  '4px 4px 0px rgba(0, 0, 0, 0.25)', // Medium retro shadow
  '6px 6px 0px rgba(0, 0, 0, 0.25)', // Large retro shadow
  '8px 8px 0px rgba(0, 0, 0, 0.25)', // Extra large retro shadow
  ...Array.from({ length: 20 }, () => '4px 4px 0px rgba(0, 0, 0, 0.25)'),
] as ThemeOptions['shadows'];

export { shadows };
