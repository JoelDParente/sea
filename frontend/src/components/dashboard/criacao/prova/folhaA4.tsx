'use client';
import React from 'react';
import { Box } from '@mui/material';
import CabecalhoProva from './cabecalho-prova';
import BlocoQuestao from './bloco-questao';

interface FolhaA4Props {
  questoes: string[];
  onChangeQuestao: (index: number, conteudo: string) => void;
  onRemoveQuestao: (index: number) => void;
  metadata: {
    titulo: string;
    disciplina: string;
    avaliacao: string;
    professor: string;
  };
}

const FolhaA4: React.FC<FolhaA4Props> = ({
  questoes,
  onChangeQuestao,
  onRemoveQuestao,
  metadata,
}) => {
  return (
    <Box
      sx={{
        width: 794,
        height: 1122,
        p: 4,
        border: '1px solid #ccc',
        borderRadius: 1,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        backgroundColor: '#fff',
        mb: 6,
        pageBreakAfter: 'always',
      }}
    >
      <CabecalhoProva {...metadata} />

      <Box sx={{ mt: 2 }}>
        {questoes.map((q, i) => (
          <BlocoQuestao
            key={i}
            index={i}
            conteudo={q}
            onChange={(html: any) => onChangeQuestao(i, html)}
            onRemove={() => onRemoveQuestao(i)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FolhaA4;