import ReactMarkdown from 'react-markdown';
import { ViewerContainer } from './NoteViewer.styled';

export interface NoteViewerProps {
  value: string;
}

export function NoteViewer({ value }: NoteViewerProps) {
  return (
    <ViewerContainer>
      <ReactMarkdown>{value}</ReactMarkdown>
    </ViewerContainer>
  );
}
