import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ViewerContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: 16,
  boxShadow: theme.shadows[2],
  minWidth: 0,
  overflowY: 'auto',
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
}));
