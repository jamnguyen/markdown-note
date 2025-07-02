import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@mui/material/styles';
import { ViewerContainer, InlineCode } from './NoteViewer.styled';

export interface NoteViewerProps {
  value: string;
}

export function NoteViewer({ value }: NoteViewerProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <ViewerContainer>
      <ReactMarkdown
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children);

            // Block code typically has className or contains newlines
            // Inline code is single line without className
            const isBlockCode = !!className || codeString.includes('\n');

            return isBlockCode ? (
              <SyntaxHighlighter style={isDarkMode ? oneDark : oneLight} language={language} PreTag='div'>
                {codeString.replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <InlineCode>{children}</InlineCode>
            );
          },
        }}>
        {value}
      </ReactMarkdown>
    </ViewerContainer>
  );
}
