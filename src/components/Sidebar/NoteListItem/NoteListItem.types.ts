export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface NoteListItemProps {
  note: Note;
  isSelected: boolean;
  isEditing: boolean;
  editingValue: string;
  onSelect: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onTitleChange: (value: string) => void;
  onTitleSave: (id: string) => void;
  onTitleCancel: () => void;
}
