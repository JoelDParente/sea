import { Box, Button, Stack, TextField, MenuItem, CircularProgress } from '@mui/material';
import { Add, Print, Save } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface BarraFerramentasProps {
  onAdicionarQuestao: () => void;
  onSalvar: () => void;
  onExportarPDF: () => void;
  onMetadataChange?: (metadata: any) => void;
  initialMetadata?: {
    titulo?: string;
    disciplina?: string;
    categoria?: string;
    avaliacao?: string;
    professor?: string;
  };
}

const API_BASE = 'http://localhost/sea/backend/controllers';

const BarraFerramentas: React.FC<BarraFerramentasProps> = ({
  onAdicionarQuestao,
  onSalvar,
  onExportarPDF,
  onMetadataChange,
  initialMetadata,
}) => {
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [metadata, setMetadata] = useState({
    titulo: initialMetadata?.titulo || 'Avaliação',
    disciplina: initialMetadata?.disciplina || '',
    categoria: initialMetadata?.categoria || '',
    avaliacao: initialMetadata?.avaliacao || '',
    professor: initialMetadata?.professor || '',
  });

  // Buscar disciplinas ao montar
  useEffect(() => {
    const buscarDados = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/QuestaoController.php?tipo=disciplinas`);
        const data = Array.isArray(res.data) ? res.data : Object.values(res.data || {});
        setDisciplinas(data);
      } catch (err) {
        console.error('Erro ao buscar disciplinas:', err);
      } finally {
        setLoading(false);
      }
    };
    buscarDados();
  }, []);

  // Buscar categorias quando disciplina muda
  useEffect(() => {
    if (!metadata.disciplina) {
      setCategorias([]);
      return;
    }
    const buscarCategorias = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/QuestaoController.php?tipo=categorias&id_disciplina=${metadata.disciplina}`
        );
        const data = Array.isArray(res.data) ? res.data : Object.values(res.data || {});
        setCategorias(data);
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        setCategorias([]);
      }
    };
    buscarCategorias();
  }, [metadata.disciplina]);

  const handleMetadataChange = (field: string, value: any) => {
    const updated = { ...metadata, [field]: value };
    setMetadata(updated);
    onMetadataChange?.(updated);
  };

  return (
    <Stack direction="column" spacing={2} sx={{ mb: 3 }}>
      {/* Selects de Metadados */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Título da Prova"
          value={metadata.titulo}
          onChange={(e) => handleMetadataChange('titulo', e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        />

        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <>
            <TextField
              select
              label="Disciplina"
              value={metadata.disciplina}
              onChange={(e) => handleMetadataChange('disciplina', e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">Selecione...</MenuItem>
              {disciplinas.map((d) => (
                <MenuItem key={d.id_disciplina} value={d.id_disciplina}>
                  {d.nome_disciplina}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Categoria"
              value={metadata.categoria}
              onChange={(e) => handleMetadataChange('categoria', e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
              disabled={!metadata.disciplina}
            >
              <MenuItem value="">Selecione...</MenuItem>
              {categorias.map((c) => (
                <MenuItem key={c.id_categoria} value={c.id_categoria}>
                  {c.nome_categoria}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

        <TextField
          label="Bimestre/Avaliação"
          value={metadata.avaliacao}
          onChange={(e) => handleMetadataChange('avaliacao', e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        />
      </Box>

      {/* Botões de Ação */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          backgroundColor: '#f9f9f9',
          p: 2,
          borderRadius: 2,
          border: '1px solid #e0e0e0',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={onAdicionarQuestao}
        >
          Adicionar Questão
        </Button>
        <Button variant="outlined" startIcon={<Save />} onClick={onSalvar}>
          Salvar
        </Button>
        <Button variant="outlined" startIcon={<Print />} onClick={onExportarPDF}>
          Exportar PDF
        </Button>
      </Stack>
    </Stack>
  );
};

export default BarraFerramentas;
