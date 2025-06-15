import React, { useState, useMemo, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import NotesPage from './pages/NotesPage';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './styles/theme';

const THEME_KEY = 'markdown-note-theme-mode';

const App: React.FC = () => {
  const [mode, setModeState] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === 'dark' ? 'dark' : 'light';
  });
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  const setMode = (m: 'light' | 'dark') => {
    setModeState(m);
    localStorage.setItem(THEME_KEY, m);
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
