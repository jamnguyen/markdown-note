import { useState } from 'react';
import { Container, Typography, Button, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography variant='h2' component='h1' gutterBottom>
            Markdown Note
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant='contained' onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </Button>
          </Box>
          <Typography variant='body1' sx={{ mt: 2 }}>
            Edit <code>src/App.tsx</code> and save to test HMR
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
