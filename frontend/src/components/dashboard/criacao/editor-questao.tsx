'use client';
import React, { useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import TitleIcon from '@mui/icons-material/Title';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import './editor.css';

interface EditorQuestaoProps {
  value?: string;
  onChange?: (html: string) => void;
}

export default function EditorQuestao({ value = '', onChange }: EditorQuestaoProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      CodeBlock,
    ],
    content: value,
    immediatelyRender: false, // evita erro SSR no Next.js
    editorProps: {
      attributes: {
        class:
          'ProseMirror prose focus:outline-none min-h-[250px] p-3 rounded-md border border-gray-300 bg-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Atualiza o conteúdo externo (edição)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <Box>
      {/* Toolbar */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          alignItems: 'center',
          mb: 1.5,
          p: 1,
          borderRadius: 1,
          backgroundColor: '#f9fafb',
          border: '1px solid #ddd',
        }}
      >
        <Tooltip title="Título">
          <IconButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <TitleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Negrito">
          <IconButton onClick={() => editor.chain().focus().toggleBold().run()}>
            <FormatBoldIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Itálico">
          <IconButton onClick={() => editor.chain().focus().toggleItalic().run()}>
            <FormatItalicIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sublinhado">
          <IconButton onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <FormatUnderlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Lista não ordenada">
          <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <FormatListBulletedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Lista numerada">
          <IconButton onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <FormatListNumberedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Citação">
          <IconButton onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <FormatQuoteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Código">
          <IconButton onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
            <CodeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Desfazer">
          <IconButton onClick={() => editor.chain().focus().undo().run()}>
            <UndoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Refazer">
          <IconButton onClick={() => editor.chain().focus().redo().run()}>
            <RedoIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Área do Editor */}
      <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}