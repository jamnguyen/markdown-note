import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { NotesState, Note } from './notesSlice.types';
import { nanoid } from 'nanoid';

const initialState: NotesState = {
  notes: [],
  selectedNoteId: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<Note[]>) {
      state.notes = action.payload;
    },
    createNote(state, action: PayloadAction<{ title: string; content: string }>) {
      const now = Date.now();
      const note: Note = {
        id: nanoid(),
        title: action.payload.title,
        content: action.payload.content,
        createdAt: now,
        updatedAt: now,
      };
      state.notes.unshift(note);
      state.selectedNoteId = note.id;
    },
    updateNote(state, action: PayloadAction<{ id: string; title: string; content: string }>) {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) {
        note.title = action.payload.title;
        note.content = action.payload.content;
        note.updatedAt = Date.now();
      }
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
      if (state.selectedNoteId === action.payload) {
        state.selectedNoteId = state.notes.length ? state.notes[0].id : null;
      }
    },
    selectNote(state, action: PayloadAction<string>) {
      state.selectedNoteId = action.payload;
    },
  },
});

export const { setNotes, createNote, updateNote, deleteNote, selectNote } = notesSlice.actions;
export default notesSlice.reducer;
