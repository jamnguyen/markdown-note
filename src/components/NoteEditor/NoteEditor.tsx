import React from 'react';
import type { NoteEditorProps } from './NoteEditor.types';
import { EditorContainer, TitleInput, MarkdownInput } from './NoteEditor.styled';

const NoteEditor: React.FC<NoteEditorProps> = ({ value, onChange, title, onTitleChange }) => {
  return (
    <EditorContainer>
      <TitleInput
        variant='standard'
        placeholder='Title'
        value={title || ''}
        onChange={(e) => onTitleChange?.(e.target.value)}
        InputProps={{ disableUnderline: true }}
        fullWidth
      />
      <MarkdownInput
        variant='outlined'
        placeholder='Write your note in markdown...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        multiline
        minRows={12}
        maxRows={32}
        fullWidth
      />
    </EditorContainer>
  );
};

export default NoteEditor;
