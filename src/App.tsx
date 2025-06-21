import React, { useState, useMemo, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { NotesPage } from './pages/NotesPage';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './styles/theme';

const THEME_KEY = 'markdown-note-theme-mode';

type ThemeMode = 'light' | 'dark' | 'system';

const getSystemTheme = (): 'light' | 'dark' => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const App: React.FC = () => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    return (stored as ThemeMode) || 'system';
  });

  const resolvedMode = useMemo(() => {
    return mode === 'system' ? getSystemTheme() : mode;
  }, [mode]);

  const theme = useMemo(() => createAppTheme(resolvedMode), [resolvedMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (mode === 'system') {
        // Force a re-render when system theme changes
        setModeState('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(THEME_KEY, newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <NotesPage mode={mode} setMode={setMode} />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
