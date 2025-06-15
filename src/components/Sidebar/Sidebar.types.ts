import type { Note } from '../../store/notesSlice.types';

export interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  width: number;
  onDragHandleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  onUpdateTitle?: (id: string, title: string) => void;
}
