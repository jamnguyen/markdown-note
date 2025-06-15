import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  background: theme.palette.background.default,
}));

export const Main = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  minWidth: 0,
}));
