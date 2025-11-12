'use client';

import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import FolhaA4 from './folhaA4';
import BarraFerramentas from './barra-ferramentas';

const EditorProva: React.FC = () => {
  const [questoes, setQuestoes] = useState<string[]>(['']);
  const [professorNome, setProfessorNome] = useState('Prof. João Silva');

  // Puxar nome do professor do JWT em localStorage (mesmo padrão do dashboard)
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const nome = user?.nome || user?.name;
        if (nome) {
          setProfessorNome(nome);
        }
      } catch (err) {
        console.error('Erro ao parsear user do localStorage:', err);
      }
    }
  }, []);

  const [metadata, setMetadata] = useState({
    titulo: 'Avaliação de Matemática',
    disciplina: 'Matemática',
    categoria: '',
    avaliacao: '2º Bimestre',
    professor: professorNome,
  });

  // Atualizar professor no metadata quando professorNome mudar
  React.useEffect(() => {
    setMetadata((prev) => ({
      ...prev,
      professor: professorNome,
    }));
  }, [professorNome]);

  const handleAdicionarQuestao = () => {
    setQuestoes([...questoes, '']);
  };

  const handleChangeQuestao = (index: number, novoConteudo: string) => {
    const novas = [...questoes];
    novas[index] = novoConteudo;
    setQuestoes(novas);
  };

  const handleRemoverQuestao = (index: number) => {
    setQuestoes(questoes.filter((_, i) => i !== index));
  };

  const handleSalvar = () => {
    console.log('Salvando prova...', { questoes, metadata });
  };

  const handleExportarPDF = () => {
    window.print();
  };

  const handleMetadataChange = (newMetadata: any) => {
    setMetadata(newMetadata);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <BarraFerramentas
        onAdicionarQuestao={handleAdicionarQuestao}
        onSalvar={handleSalvar}
        onExportarPDF={handleExportarPDF}
        onMetadataChange={handleMetadataChange}
        initialMetadata={metadata}
      />

      <Box>
        <FolhaA4
          questoes={questoes}
          onChangeQuestao={handleChangeQuestao}
          onRemoveQuestao={handleRemoverQuestao}
          metadata={metadata}
        />
      </Box>
    </Container>
  );
};

export default EditorProva;
