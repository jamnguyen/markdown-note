import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { setNotes, createNote, updateNote, deleteNote, selectNote } from '../../store';
import notesDb from '../../db/notesDb';
import { Layout } from '../../components/Layout';
import { Sidebar } from '../../components/Sidebar';
import { NoteEditor } from '../../components/NoteEditor';
import { NoteViewer } from '../../components/NoteViewer';
import { MainArea, EmptyState, EditorColumn } from './NotesPage.styled';
import { Typography } from '@mui/material';

type ThemeMode = 'light' | 'dark' | 'system';

interface NotesPageProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const NotesPage: React.FC<NotesPageProps> = ({ mode, setMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const selectedNoteId = useSelector((state: RootState) => state.notes.selectedNoteId);
  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const dragging = useRef(false);

  // Load notes on mount
  useEffect(() => {
    const initializeApp = async () => {
      const dbNotes = await notesDb.getAllNotes();
      dispatch(setNotes(dbNotes));
    };

    initializeApp();
  }, [dispatch]);

  // Persist notes to DB on change
  useEffect(() => {
    notesDb.saveNotes(notes);
  }, [notes]);

  const handleCreate = useCallback(() => {
    dispatch(createNote({ title: '', content: '' }));
  }, [dispatch]);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteNote(id));
    },
    [dispatch],
  );

  const handleSelect = useCallback(
    (id: string) => {
      dispatch(selectNote(id));
    },
    [dispatch],
  );

  const handleContentChange = useCallback(
    (content: string) => {
      if (selectedNote) {
        dispatch(updateNote({ id: selectedNote.id, title: selectedNote.title, content }));
      }
    },
    [dispatch, selectedNote],
  );

  const handleDragHandleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      dragging.current = true;
      const startX = e.clientX;
      const startWidth = sidebarWidth;
      const onMouseMove = (moveEvent: MouseEvent) => {
        if (!dragging.current) return;
        const newWidth = Math.min(500, Math.max(180, startWidth + moveEvent.clientX - startX));
        setSidebarWidth(newWidth);
      };
      const onMouseUp = () => {
        dragging.current = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [sidebarWidth],
  );

  const handleUpdateTitle = useCallback(
    (id: string, title: string) => {
      if (selectedNote) {
        dispatch(updateNote({ id: selectedNote.id, title, content: selectedNote.content }));
      }
    },
    [dispatch, selectedNote],
  );

  return (
    <Layout>
      <Sidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelect={handleSelect}
        onCreate={handleCreate}
        onDelete={handleDelete}
        width={sidebarWidth}
        onDragHandleMouseDown={handleDragHandleMouseDown}
        mode={mode}
        setMode={setMode}
        onUpdateTitle={handleUpdateTitle}
      />
      <MainArea>
        {selectedNote ? (
          <>
            <EditorColumn>
              <NoteEditor value={selectedNote.content} onChange={handleContentChange} themeMode={mode} />
            </EditorColumn>
            <NoteViewer value={selectedNote.content} />
          </>
        ) : (
          <EmptyState>
            <Typography variant='body1' gutterBottom>
              Select or create a note to get started.
            </Typography>
          </EmptyState>
        )}
      </MainArea>
    </Layout>
  );
};
