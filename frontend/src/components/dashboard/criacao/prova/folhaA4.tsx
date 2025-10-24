'use client';
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import SlotQuestao from './slot-questao';
import CabecalhoProva from './CabecalhoProva';

interface ProvaMetadata {
  titulo: string;
  disciplina: string;
}

interface FolhasA4Props {
  questoes: (any | null)[];
  onSlotClick: (index: number) => void;
  slotsPorFolha?: number;
  metadata: ProvaMetadata;
}

const pxA4Width = 794;
const pxA4Height = 1122;

const FolhasA4: React.FC<FolhasA4Props> = ({
  questoes,
  onSlotClick,
  slotsPorFolha = 10, // Aumentei o limite, pois agora aproveitamos melhor o espaço
  metadata,
}) => {
  const paginas: (any | null)[][] = [];
  for (let i = 0; i < questoes.length; i += slotsPorFolha) {
    paginas.push(questoes.slice(i, i + slotsPorFolha));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {paginas.map((pagina, pageIndex) => (
        <Box
          key={pageIndex}
          sx={{
            width: pxA4Width,
            height: pxA4Height, // altura fixa da folha
            mx: 'auto',
            mb: 6,
            p: 4,
            border: '1px solid #ccc',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            overflow: 'hidden', // evita esticar
            position: 'relative',
            pageBreakAfter: 'always', // garante quebra correta na exportação PDF
          }}
        >
          {/* Cabeçalho */}
          {pageIndex === 0 ? (
            <CabecalhoProva
              titulo={metadata.titulo || 'Questões de 1 a N'}
              disciplina={metadata.disciplina || 'Disciplina'}
              avaliacao="AVALIAÇÃO BIMESTRAL 2"
              professor="Professor(a)"
            />
          ) : (
            <Typography variant="caption" align="right" mb={0}>
              Página {pageIndex + 1}
            </Typography>
          )}

          <Divider sx={{ my: 1 }} />

          {/* Área de questões em duas colunas */}
          <Box
            component="section"
            sx={{
              columnCount: 2,
              columnGap: '2rem',
              columnRule: '1px solid rgba(0,0,0,0.35)',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {pagina.map((questao, index) => {
              const globalIndex = pageIndex * slotsPorFolha + index;
              return (
                <Box
                  key={globalIndex}
                  sx={{
                    display: 'block',
                    breakInside: 'avoid',
                    WebkitColumnBreakInside: 'avoid',
                    MozColumnBreakInside: 'avoid',
                    mb: 1.5,
                    fontSize: '0.78rem', // fonte menor globalmente
                    lineHeight: 1.3,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ mb: 0.5, fontSize: '0.85rem' }}
                  >
                    Questão {globalIndex + 1}
                  </Typography>

                  <SlotQuestao
                    questao={questao}
                    onClick={() => onSlotClick(globalIndex)}
                    showFull
                    hideTitle
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FolhasA4;