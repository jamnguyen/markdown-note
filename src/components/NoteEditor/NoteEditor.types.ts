export interface NoteEditorProps {
  value: string;
  onChange: (value: string) => void;
  onTitleChange?: (title: string) => void;
  title?: string;
}
