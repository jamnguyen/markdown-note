import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch, Note } from '../store';
import { setNotes, createNote, updateNote, deleteNote, selectNote } from '../store';
import notesDb from '../db/notesDb';
import Layout from '../components/Layout/Layout';
import Sidebar from '../components/Sidebar/Sidebar';
import NoteEditor from '../components/NoteEditor/NoteEditor';
import NoteViewer from '../components/NoteViewer/NoteViewer';
import { Box } from '@mui/material';

const NotesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const selectedNoteId = useSelector((state: RootState) => state.notes.selectedNoteId);
  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;

  // Load notes from DB on mount
  useEffect(() => {
    notesDb.getAllNotes().then((dbNotes) => {
      dispatch(setNotes(dbNotes));
    });
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

  const handleTitleChange = useCallback(
    (title: string) => {
      if (selectedNote) {
        dispatch(updateNote({ id: selectedNote.id, title, content: selectedNote.content }));
      }
    },
    [dispatch, selectedNote],
  );

  const handleContentChange = useCallback(
    (content: string) => {
      if (selectedNote) {
        dispatch(updateNote({ id: selectedNote.id, title: selectedNote.title, content }));
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
      />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {selectedNote ? (
          <>
            <NoteEditor
              value={selectedNote.content}
              onChange={handleContentChange}
              title={selectedNote.title}
              onTitleChange={handleTitleChange}
            />
            <NoteViewer value={selectedNote.content} />
          </>
        ) : (
          <Box sx={{ p: 4, color: 'text.secondary', textAlign: 'center' }}>Select or create a note to get started.</Box>
        )}
      </Box>
    </Layout>
  );
};

export default NotesPage;
