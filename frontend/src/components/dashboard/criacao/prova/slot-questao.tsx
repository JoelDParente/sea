// slot-questao.tsx
'use client';
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

interface Alternativa {
  texto: string;
  correta: boolean;
}

interface Questao {
  titulo?: string;
  enunciado?: string;
  alternativas?: Alternativa[];
  ordem?: number;
}

interface SlotQuestaoProps {
  questao: Questao | null;
  onClick: () => void;
  showFull?: boolean;
  hideTitle?: boolean;
}

const SlotQuestao: React.FC<SlotQuestaoProps> = ({ questao, onClick, showFull = false, hideTitle = false }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        border: '1px dashed',
        borderColor: questao ? 'primary.main' : '#999',
        display: 'block', // permitir que o conteúdo seja quebrado entre colunas
        cursor: 'pointer',
        height: 'auto',
        minHeight: 40,
        '&:hover': { backgroundColor: '#f5f5f5' },
        textAlign: 'left',
        padding: 1,
      }}
    >
      {questao ? (
        <>
          {/* Título interno opcional */}
          {!hideTitle && (
            <Typography fontWeight="bold" gutterBottom variant="subtitle2" sx={{ color: 'primary.main' }}>
              {questao.titulo ?? ''}
            </Typography>
          )}

          {/* Enunciado */}
          <Box
            sx={{
              fontSize: 10,
              color: '#333',
              mb: 1,
              overflow: showFull ? 'visible' : 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
              whiteSpace: showFull ? 'pre-wrap' : 'normal',
              '& img': { maxWidth: '100%', height: 'auto' },
              '& table': { tableLayout: 'fixed', width: '100%' },
            }}
            dangerouslySetInnerHTML={{ __html: questao.enunciado ?? '' }}
          />

          {/* Lista de alternativas */}
          <List dense sx={{ mt: 1, p: 0 }}>
            {(questao.alternativas ?? [])
              .slice(0, showFull ? undefined : 2)
              .map((alt, index) => (
                <ListItem sx={{ p: 0.2 }} key={index}>
                  <ListItemText
                    primary={`${String.fromCharCode(65 + index)}) ${alt.texto}`}
                    primaryTypographyProps={{
                      fontSize: 10,
                      fontWeight: alt.correta ? 'bold' : 'normal',
                      color: alt.correta ? 'success.dark' : 'text.primary',
                      whiteSpace: 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                    }}
                  />
                </ListItem>
              ))}
            {(questao.alternativas ?? []).length > 2 && !showFull && (
              <Typography variant="caption" sx={{ ml: 1, color: '#666' }}>
                ...e {(questao.alternativas ?? []).length - 2} mais
              </Typography>
            )}
          </List>
        </>
      ) : (
        <Box sx={{ flexGrow: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="#999" sx={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }} align="left">
            + Clique para Adicionar Questão
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SlotQuestao;