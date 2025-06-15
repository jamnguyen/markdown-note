import React from 'react';
import type { NoteViewerProps } from './NoteViewer.types';
import { ViewerContainer } from './NoteViewer.styled';
import ReactMarkdown from 'react-markdown';

const NoteViewer: React.FC<NoteViewerProps> = ({ value }) => {
  return (
    <ViewerContainer>
      <ReactMarkdown>{value}</ReactMarkdown>
    </ViewerContainer>
  );
};

export default NoteViewer;
