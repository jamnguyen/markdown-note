import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MainArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  gap: theme.spacing(2),
  minWidth: 0,
}));

export const EditorColumn = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
}));

export const ViewerColumn = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
}));

export const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  color: theme.palette.text.secondary,
}));
