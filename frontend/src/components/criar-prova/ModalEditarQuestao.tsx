"use client";

import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import ListaAlternativas, { Alternativa } from '@/components/dashboard/criacao/lista-alternativas';
import axios from 'axios';

interface QuestaoProps {
  id_questao: number | string;
  enunciado?: string;
  alternativas?: { texto: string, caminho_imagem?: string }[];
  resposta_correta?: string;
  id_assunto?: number;
  id_professor?: number;
}

export default function ModalEditarQuestao({ open, onClose, questao, onSaved }: { open: boolean; onClose: () => void; questao: QuestaoProps; onSaved?: () => void; }) {
  const [editorContent, setEditorContent] = useState<string>(questao.enunciado ?? '');

  const buildInitialAlternatives = (): Alternativa[] => {
    const arr = (questao.alternativas ?? []).map((a) => ({ id: crypto.randomUUID(), texto: a.texto ?? '', correta: false, imagemUrl: a.caminho_imagem ?? null }));
    if (arr.length === 0) {
      return [
        { id: crypto.randomUUID(), texto: '', correta: true },
        { id: crypto.randomUUID(), texto: '', correta: false },
      ];
    }

    if (questao.resposta_correta) {
      const idx = questao.resposta_correta.charCodeAt(0) - 65;
      if (arr[idx]) arr[idx].correta = true;
      else arr[0].correta = true;
    } else {
      arr[0].correta = true;
    }

    return arr;
  };

  const [alternativas, setAlternativas] = useState<Alternativa[]>(buildInitialAlternatives());

  useEffect(() => {
    setEditorContent(questao.enunciado ?? '');
    setAlternativas(buildInitialAlternatives());
  }, [questao]);

  const handleSave = async () => {
    const idx = alternativas.findIndex((a) => a.correta);
    const resposta = String.fromCharCode(65 + (idx >= 0 ? idx : 0));

    const payload = {
      id_questao: questao.id_questao,
      id_assunto: questao.id_assunto ?? null,
      id_professor: questao.id_professor ?? null,
      enunciado: editorContent,
      resposta_correta: resposta,
      tipo: 'objetiva',
      publico: 0,
      alternativas: alternativas.map((a) => ({ texto: a.texto, imagem_url: a.imagemUrl })),
    };

    try {
      await axios.put('http://localhost/sea/backend/controllers/QuestaoController.php', payload, { headers: { 'Content-Type': 'application/json' } });
      alert('Questão atualizada com sucesso');
      onSaved?.();
    } catch (err) {
      console.error('Erro ao atualizar questão', err);
      alert('Erro ao atualizar a questão');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "70%",  // Set your width here
        },
      },
    }}>
      <DialogTitle>Editar Questão</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, mt: 1, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 2 }}>
            <SimpleEditor initialContent={editorContent} onChange={setEditorContent} />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 420 } }}>
            <ListaAlternativas alternativas={alternativas} setAlternativas={setAlternativas} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
        <Button variant="contained" onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
