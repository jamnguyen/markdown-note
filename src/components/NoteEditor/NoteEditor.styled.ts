import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import SimpleBar from 'simplebar-react';

export const EditorContainer = styled(SimpleBar)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  height: '100%',
  background: theme.palette.background.paper,
  borderRadius: 0,
  boxShadow: 'none',
}));

export const TitleInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 700,
  fontSize: 22,
}));

export const MarkdownInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
  background: theme.palette.background.paper,
  margin: 0,
}));

export const EditorLines = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
  background: theme.palette.background.paper,
  minHeight: 0,
  overflowY: 'auto',
}));

export const EditorLine = styled('div')<{
  focused?: boolean;
}>(({ theme, focused }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: 24,
  background: focused ? theme.palette.action.selected : 'transparent',
  transition: 'background 0.1s',
}));

export const EditorLineNumber = styled('span')(({ theme }) => ({
  width: 36,
  textAlign: 'right',
  color: theme.palette.text.secondary,
  userSelect: 'none',
  paddingRight: theme.spacing(2),
  fontSize: 14,
}));

export const EditorLineContent = styled('textarea')(({ theme }) => ({
  flex: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
  resize: 'none',
  padding: 0,
  margin: 0,
  minHeight: 24,
  lineHeight: 1.5,
}));

export const EditorTopSpacer = styled('div')(({ theme }) => ({
  height: theme.spacing(2),
  minHeight: 8,
  background: 'transparent',
}));
