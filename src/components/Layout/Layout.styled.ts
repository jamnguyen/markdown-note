import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  background: theme.palette.background.default,
}));

export const Main = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(0),
  padding: 0,
  minWidth: 0,
  height: '100vh',
  overflow: 'hidden',
}));

// Add global scrollbar style for hover effect
const globalScrollbar = `
  ::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.1);
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  :hover::-webkit-scrollbar-thumb {
    opacity: 1;
    background: rgba(0,0,0,0.2);
  }
`;

document.body.insertAdjacentHTML('beforeend', `<style>${globalScrollbar}</style>`);
