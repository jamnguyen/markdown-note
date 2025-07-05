import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme, Theme } from '@mui/material/styles';
import { ViewerContainer, InlineCode } from './NoteViewer.styled';
import { useState } from 'react';

export interface NoteViewerProps {
  value: string;
}

function ImageWithFallback({
  src,
  alt,
  title,
  width,
  height,
  theme,
}: {
  src?: string;
  alt?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  theme: Theme;
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Create style object that respects width/height attributes
  const imageStyle: React.CSSProperties = {
    borderRadius: theme.spacing(1),
    margin: theme.spacing(2, 0),
    display: isLoading ? 'none' : 'block',
  };

  // Add width/height if specified, otherwise use responsive defaults
  if (width) {
    imageStyle.width = width;
    imageStyle.maxWidth = '100%'; // Still maintain responsiveness
  } else {
    imageStyle.maxWidth = '100%';
  }

  if (height) {
    imageStyle.height = height;
  } else {
    imageStyle.height = 'auto';
  }

  if (hasError) {
    return (
      <div
        style={{
          width: width || 'auto',
          maxWidth: '100%',
          height: height || '200px',
          borderRadius: theme.spacing(1),
          margin: theme.spacing(2, 0),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          border: `1px dashed ${theme.palette.divider}`,
          color: theme.palette.text.secondary,
          fontSize: '14px',
          textAlign: 'center',
          flexDirection: 'column',
          gap: theme.spacing(1),
        }}>
        <div>🖼️</div>
        <div>Image failed to load</div>
        {alt && <div style={{ fontSize: '12px', opacity: 0.7 }}>{alt}</div>}
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          style={{
            width: width || 'auto',
            maxWidth: '100%',
            height: height || '200px',
            borderRadius: theme.spacing(1),
            margin: theme.spacing(2, 0),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            color: theme.palette.text.secondary,
            fontSize: '14px',
          }}>
          Loading image...
        </div>
      )}
      <img
        src={src}
        alt={alt || ''}
        title={title}
        width={width}
        height={height}
        style={imageStyle}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
          console.warn('Failed to load image:', src);
        }}
      />
    </>
  );
}

export function NoteViewer({ value }: NoteViewerProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <ViewerContainer>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
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
          img({ src, alt, title, width, height }) {
            return <ImageWithFallback src={src} alt={alt} title={title} width={width} height={height} theme={theme} />;
          },
        }}>
        {value}
      </ReactMarkdown>
    </ViewerContainer>
  );
}
