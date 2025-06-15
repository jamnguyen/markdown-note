import { createTheme } from '@mui/material/styles';
import palette, { darkPalette } from './palette';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { typography } from './typography';
import components from './components';
import { breakpoints } from './breakpoints';

export function createAppTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: mode === 'dark' ? darkPalette : palette,
    shadows,
    spacing,
    typography,
    components,
    breakpoints,
  });
}

const theme = createAppTheme('light');
export { theme };
