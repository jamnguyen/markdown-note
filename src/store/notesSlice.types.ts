export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface NotesState {
  notes: Note[];
  selectedNoteId: string | null;
}
