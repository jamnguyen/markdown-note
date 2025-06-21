export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemePickerProps {
  mode: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}
