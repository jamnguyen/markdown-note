import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';

export const EditorContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: 16,
  boxShadow: theme.shadows[2],
  minWidth: 0,
}));

export const TitleInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 700,
  fontSize: 22,
}));

export const MarkdownInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
  background: theme.palette.background.paper,
}));
