import { useMemo } from 'react';
import { EditorContainer } from './NoteEditor.styled';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { createTheme } from '@uiw/codemirror-themes';

export interface NoteEditorProps {
  value: string;
  onChange: (value: string) => void;
  themeMode?: 'light' | 'dark' | 'system';
}

const customDarkTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#1E1E1E',
    foreground: '#F9FAFB',
    caret: '#F9FAFB',
    selection: '#264F78',
    selectionMatch: '#264F78',
    lineHighlight: '#2A2A2A',
    gutterBackground: '#1E1E1E',
    gutterForeground: '#9CA3AF',
  },
  styles: [],
});

export function NoteEditor({ value, onChange, themeMode = 'system' }: NoteEditorProps) {
  const resolvedTheme = useMemo(() => {
    if (themeMode === 'system') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    }
    return themeMode;
  }, [themeMode]);

  return (
    <EditorContainer>
      <CodeMirror
        value={value}
        height='100%'
        minHeight='100%'
        theme={resolvedTheme === 'dark' ? customDarkTheme : 'light'}
        extensions={[markdown(), EditorView.lineWrapping]}
        onChange={onChange}
        basicSetup={{ lineNumbers: true, highlightActiveLine: true }}
        style={{ fontSize: 16, fontFamily: 'monospace', flex: 1 }}
      />
    </EditorContainer>
  );
}
