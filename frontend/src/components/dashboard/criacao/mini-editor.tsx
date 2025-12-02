"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Box, Button } from "@mui/material";

type MiniEditorProps = {
  value?: string;
  onChange: (value: string) => void;
};

export default function MiniEditor({ value = "", onChange }: MiniEditorProps) {
  const editor = useEditor({
    content: value,
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
    ],
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const handleImageUpload = async (e:any) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('imagem', file);

      const res = await fetch('http://localhost/sea/backend/controllers/uploadAlternativaImagem.php', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const json = await res.json();
      if (json && json.url) {
        editor?.chain().focus().setImage({ src: json.url }).run();
      } else {
        console.error('Upload responded without url', json);
        alert('Falha ao enviar imagem.');
      }
    } catch (err) {
      console.error('Erro upload imagem', err);
      alert('Erro ao enviar imagem');
    }
  };

  return (
    <Box>
      <Button
        size="small"
        component="label"
        variant="outlined"
        sx={{ mb: 1 }}
      >
        Adicionar Imagem
        <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
      </Button>

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 1,
          p: 1,
          minHeight: 80,
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
