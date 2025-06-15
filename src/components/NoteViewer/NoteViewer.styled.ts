import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ViewerContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: 0,
  boxShadow: 'none',
  overflowY: 'auto',
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: 8,
    background: 'transparent',
  },
  '&:hover::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
  },
}));
