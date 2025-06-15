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
  width: 800,
  minWidth: 0,
  maxWidth: 800,
  display: 'flex',
  borderRight: `1.5px solid ${theme.palette.border}`,
  flexDirection: 'column',
  flexShrink: 0,
  flexGrow: 0,
  overflow: 'hidden',
  '& .cm-content': {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
}));

export const ViewerColumn = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
  display: 'flex',
}));

export const EmptyState = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  textAlign: 'center',
  width: '100%',
}));
