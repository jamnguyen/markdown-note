import type { Note } from '../../store/notesSlice.types';

export interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}
