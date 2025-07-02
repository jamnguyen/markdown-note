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
  // Style code blocks - target inner code background for light mode visibility
  pre: {
    '> div': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.15) !important' : 'rgba(0, 0, 0, 0.08) !important',
      code: {
        backgroundColor: 'transparent !important',
      },
    },
  },
}));

export const InlineCode = styled('code')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
  color: theme.palette.mode === 'dark' ? '#ff6b6b' : '#e63946',
  padding: theme.spacing(0.25, 0.5),
  borderRadius: theme.spacing(0.5),
  fontSize: '0.9em',
  fontFamily: '"Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
  fontWeight: 500,
}));
