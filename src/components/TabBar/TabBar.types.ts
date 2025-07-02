export interface TabBarProps {
  selectedNote: {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
  } | null;
}
