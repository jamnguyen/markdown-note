import { styled } from '@mui/material/styles';
import SimpleBar from 'simplebar-react';

export const ViewerContainer = styled(SimpleBar)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: 0,
  boxShadow: 'none',
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
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
  // Link styling - softer colors with lower saturation
  a: {
    color: theme.palette.mode === 'dark' ? '#8bb5d1' : '#5a7a94',
    textDecoration: 'none',
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(139, 181, 209, 0.3)' : 'rgba(90, 122, 148, 0.3)'}`,
    transition: 'all 0.2s ease',
    '&:hover': {
      color: theme.palette.mode === 'dark' ? '#a6c7dd' : '#4a6b7d',
      borderBottomColor: theme.palette.mode === 'dark' ? 'rgba(166, 199, 221, 0.6)' : 'rgba(74, 107, 125, 0.6)',
    },
    '&:visited': {
      color: theme.palette.mode === 'dark' ? '#a391b5' : '#7d6b8f',
    },
  },
  // Image styling - respect width/height attributes
  img: {
    borderRadius: theme.spacing(1),
    margin: theme.spacing(2, 0),
    display: 'block',
    // Only apply max-width when no width attribute is present
    '&:not([width])': {
      maxWidth: '100%',
    },
    // Only apply height auto when no height attribute is present
    '&:not([height])': {
      height: 'auto',
    },
    // When width is specified, still respect maxWidth for responsiveness
    '&[width]': {
      maxWidth: '100%',
    },
  },
  // Table styling
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: theme.spacing(2, 0),
    fontSize: '0.9em',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
  },
  thead: {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    tr: {
      th: {
        padding: theme.spacing(1.5, 2),
        textAlign: 'left',
        fontWeight: 600,
        color: theme.palette.text.primary,
        borderBottom: `2px solid ${theme.palette.divider}`,
        fontSize: '0.9em',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },
  },
  tbody: {
    tr: {
      backgroundColor: theme.palette.background.paper,
      '&:nth-of-type(even)': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
      },
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
      },
      td: {
        padding: theme.spacing(1.5, 2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        fontSize: '0.9em',
        lineHeight: 1.5,
      },
    },
  },
  // Responsive table wrapper
  '& > div': {
    overflowX: 'auto',
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
