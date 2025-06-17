import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MainArea = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  minWidth: 0,
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
}));

export const EditorColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  borderRight: `1.5px solid ${theme.palette.border}`,
  flexDirection: 'column',
  overflow: 'hidden',
  '& .cm-content': {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
}));

export const ViewerColumn = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
}));

export const EmptyState = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  textAlign: 'center',
  width: '100%',
}));
