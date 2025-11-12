"use client";
import React, { useState } from 'react';
import { Paper, Typography, Box, IconButton, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import ModalCriarQuestao from './modal-criar-questao';

interface BlocoQuestaoProps {
  index: number;
  conteudo?: string;
  onChange: (novoConteudo: string) => void;
  onRemove: () => void;
}

export default function BlocoQuestao({
  index,
  conteudo = '',
  onChange,
  onRemove,
}: BlocoQuestaoProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Paper
      elevation={2}
      sx={{ p: 2, mb: 2, borderRadius: 2, position: 'relative' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, color: 'text.secondary' }}>
          Questão {index + 1}
        </Typography>

        <Box>
          <Button size="small" onClick={() => setModalOpen((s) => !s)} sx={{ mr: 1 }}>
            {modalOpen ? 'Fechar' : 'Editar'}
          </Button>
          <IconButton color="error" size="small" onClick={onRemove}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: conteudo }} />
      </Box>

      <ModalCriarQuestao
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(q) => {
          const html = `<p>${String(q.enunciado || '')}</p>`;
          onChange(html);
          setModalOpen(false);
        }}
      />
    </Paper>
  );
}
