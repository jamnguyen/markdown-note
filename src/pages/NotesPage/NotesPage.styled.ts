import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MainArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  gap: theme.spacing(2),
  minWidth: 0,
  alignSelf: 'stretch',
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

export const ContentArea = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  minHeight: 0,
}));

export const EditorViewerArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  gap: theme.spacing(2),
  minWidth: 0,
  minHeight: 0,
}));
