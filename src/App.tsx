import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CssBaseline,
  ThemeProvider,
  Card,
  CardContent,
  CardActions,
  TextField,
} from '@mui/material';
import { theme } from './styles';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='sm' sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
        <Box
          sx={{
            marginTop: { xs: 4, sm: 8 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 2, sm: 4 },
          }}>
          <Typography variant='h2' component='h1' gutterBottom>
            Markdown Note
          </Typography>
          <Card sx={{ width: '100%', mb: 2 }}>
            <CardContent>
              <Typography variant='h5' gutterBottom>
                Hello!
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                Card balance
              </Typography>
              <Typography variant='h4' color='primary' sx={{ fontFamily: 'IBM Plex Mono, Courier, monospace' }}>
                $4,023.20
              </Typography>
              <Button variant='outlined' sx={{ mt: 2 }}>
                Top up
              </Button>
            </CardContent>
            <CardActions>
              <Button variant='contained' fullWidth>
                Book now
              </Button>
            </CardActions>
          </Card>
          <Box sx={{ width: '100%' }}>
            <TextField label='Search' variant='outlined' fullWidth sx={{ mb: 2 }} />
            <Button variant='contained' onClick={() => setCount((count) => count + 1)} fullWidth>
              count is {count}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
