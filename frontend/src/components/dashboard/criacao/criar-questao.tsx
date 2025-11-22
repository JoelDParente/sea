'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Card, CardContent, TextField, MenuItem } from '@mui/material';
import ListaAlternativas, { Alternativa } from './lista-alternativas';
import ModalUploadImagem from './modal-upload-imagem';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

const API_BASE = 'http://localhost/sea/backend/controllers';

export default function CriarQuestao({ onSave }: { onSave: (questao: any) => void }) {
  const [imagem, setImagem] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getInitialAlternatives = () => [
    { id: crypto.randomUUID(), texto: '', correta: true },
    { id: crypto.randomUUID(), texto: '', correta: false },
    { id: crypto.randomUUID(), texto: '', correta: false },
    { id: crypto.randomUUID(), texto: '', correta: false },
  ];

  // conteúdo HTML vindo do editor Tiptap
  const [editorContent, setEditorContent] = useState('');

  // Estados para dados do backend
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [assuntos, setAssuntos] = useState<any[]>([]);
  const [loadingDados, setLoadingDados] = useState(true);

  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  // Estados para seleções (usando IDs do backend)
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<number | ''>('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | ''>('');
  const [assuntoSelecionado, setAssuntoSelecionado] = useState<number | ''>('');

  const [alternativas, setAlternativas] = useState<Alternativa[]>(getInitialAlternatives());

  // Buscar disciplinas ao montar o componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user?.id_usuario) {
        setIdUsuario(Number(user.id_usuario));
      }
    }
    const buscarDados = async () => {
      try {
        setLoadingDados(true);
        const resDisciplinas = await axios.get(`${API_BASE}/QuestaoController.php?tipo=disciplinas`);
        const dataDisc = resDisciplinas.data;
        // normaliza para array (quando backend devolver objeto associativo)
        const arrDisc = Array.isArray(dataDisc) ? dataDisc : Object.values(dataDisc || {});
        setDisciplinas(arrDisc);

        // Selecionar primeira disciplina automaticamente
        if (resDisciplinas.data && resDisciplinas.data.length > 0) {
          const primeiraDisciplina = resDisciplinas.data[0];
          setDisciplinaSelecionada(primeiraDisciplina.id_disciplina);

          // Buscar categorias da primeira disciplina
          buscarCategorias(primeiraDisciplina.id_disciplina);
        }
      } catch (err) {
        console.error('Erro ao buscar disciplinas:', err);
      } finally {
        setLoadingDados(false);
      }
    };

    buscarDados();
  }, []);

  // Buscar categorias quando disciplina muda
  const buscarCategorias = async (idDisciplina: number) => {
    try {
      const res = await axios.get(
        `${API_BASE}/QuestaoController.php?tipo=categorias&id_disciplina=${idDisciplina}`
      );
      const dataCat = res.data;
      const arrCat = Array.isArray(dataCat) ? dataCat : Object.values(dataCat || {});
      setCategorias(arrCat);

      // Selecionar primeira categoria
      if (res.data && res.data.length > 0) {
        const primeiraCategoria = res.data[0];
        setCategoriaSelecionada(primeiraCategoria.id_categoria);

        // Buscar assuntos da primeira categoria
        buscarAssuntos(primeiraCategoria.id_categoria);
      } else {
        setCategoriaSelecionada('');
        setAssuntos([]);
        setAssuntoSelecionado('');
      }
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      setCategorias([]);
      setAssuntos([]);
    }
  };

  // Buscar assuntos quando categoria muda
  const buscarAssuntos = async (idCategoria: number) => {
    try {
      const res = await axios.get(
        `${API_BASE}/QuestaoController.php?tipo=assuntos&id_categoria=${idCategoria}`
      );
      const dataAss = res.data;
      const arrAss = Array.isArray(dataAss) ? dataAss : Object.values(dataAss || {});
      setAssuntos(arrAss);

      // Selecionar primeiro assunto
      if (res.data && res.data.length > 0) {
        setAssuntoSelecionado(res.data[0].id_assunto);
      } else {
        setAssuntoSelecionado('');
      }
    } catch (err) {
      console.error('Erro ao buscar assuntos:', err);
      setAssuntos([]);
      setAssuntoSelecionado('');
    }
  };

  const handleDisciplinaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const idDisciplina = Number(e.target.value);
    setDisciplinaSelecionada(idDisciplina);
    await buscarCategorias(idDisciplina);
  };

  const handleCategoriaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const idCategoria = Number(e.target.value);
    setCategoriaSelecionada(idCategoria);
    await buscarAssuntos(idCategoria);
  };

  const handleAssuntoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssuntoSelecionado(Number(e.target.value));
  };

  const handleSave = () => {
    if (!editorContent || !editorContent.replace(/<[^>]+>/g, '').trim()) {
      alert('O enunciado não pode estar vazio.');
      return;
    }

    if (!alternativas.some((alt) => alt.correta)) {
      alert('Marque a alternativa correta.');
      return;
    }

    if (!disciplinaSelecionada || !categoriaSelecionada || !assuntoSelecionado) {
      alert('Selecione disciplina, categoria e assunto para a questão.');
      return;
    }

    // Remover tags HTML do enunciado e alternativas
    const stripHtml = (html: string) => {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    };

    // gerar título a partir do texto puro do enunciado (primeiros 50 chars)
    const enunciadoLimpo = stripHtml(editorContent);
    const titulo = (enunciadoLimpo.trim().substring(0, 50) || 'Questão') + '...';

    // Encontrar qual alternativa é correta (A, B, C ou D)
    const respostaCorreta = String.fromCharCode(
      65 + alternativas.findIndex((alt) => alt.correta)
    );

    const questaoFinal = {
      titulo,
      enunciado: editorContent, // <-- preserva o HTML
      id_disciplina: disciplinaSelecionada,
      id_categoria: categoriaSelecionada,
      id_assunto: assuntoSelecionado,
      resposta_correta: respostaCorreta,
      imagem,
      alternativas: alternativas.map((alt) => ({
        texto: alt.texto,
      })),
      id_professor: idUsuario,
    };
    console.log('Questão (preview):', questaoFinal);

    axios
      .post(`${API_BASE}/QuestaoController.php`, questaoFinal, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        console.log('Resposta backend:', res.data);
        // Limpa campos mas mantém o usuário na mesma página/modal
        setEditorContent('');
        setAlternativas(getInitialAlternatives());
        setImagem(null);
        alert('Questão salva com sucesso!');
      })
      .catch((err) => {
        console.error('Erro ao enviar questão:', err);
        alert('Erro ao enviar questão para o servidor.');
      });
  };

  return (
    <Card
      sx={{
        width: '100%',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        p: 0,
      }}
    >
      {/* Conteúdo principal dividido em duas colunas */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          gap: 2,
          p: 0,
          overflow: 'hidden',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* 🧠 Coluna Esquerda: Enunciado */}
        <Box
          sx={{
            flex: { xs: 'auto', md: 2 },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.light',
            p: 2,
            minHeight: { xs: '40vh', md: '100%' },
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 1, color: 'primary.main' }}
          >
            Enunciado da Questão
          </Typography>
          {/* Seletores: Disciplina / Categoria / Assunto */}
          {loadingDados ? (
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Carregando dados...
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <TextField
                select
                label="Disciplina"
                value={disciplinaSelecionada}
                onChange={handleDisciplinaChange}
                size="small"
                sx={{ minWidth: 150 }}
              >
                {disciplinas.map((d) => (
                  <MenuItem key={d.id_disciplina} value={d.id_disciplina}>
                    {d.nome_disciplina}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Categoria"
                value={categoriaSelecionada}
                onChange={handleCategoriaChange}
                size="small"
                sx={{ minWidth: 150 }}
                disabled={!disciplinaSelecionada}
              >
                {categorias.map((c) => (
                  <MenuItem key={c.id_categoria} value={c.id_categoria}>
                    {c.nome_categoria}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Assunto"
                value={assuntoSelecionado}
                onChange={handleAssuntoChange}
                size="small"
                sx={{ minWidth: 150 }}
                disabled={!categoriaSelecionada}
              >
                {assuntos.map((a) => (
                  <MenuItem key={a.id_assunto} value={a.id_assunto}>
                    {a.nome_assunto}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              borderRadius: 1,
              pr: 1,
            }}
          >
            <SimpleEditor onChange={setEditorContent} />
          </Box>
        </Box>

        {/* 🔡 Coluna Direita: Alternativas */}
        <Box
          sx={{
            flex: { xs: 'auto', md: 1 },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'secondary.light',
            p: 2,
            overflowY: 'auto',
            minHeight: { xs: '30vh', md: '100%' },
          }}
        >
          <ListaAlternativas
            alternativas={alternativas}
            setAlternativas={setAlternativas}
          />
        </Box>
      </CardContent>

      {/* Rodapé fixo com botão de salvar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderTop: '1px solid #eee',
          p: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          size="large"
        >
          Salvar Questão
        </Button>
      </Box>

      <ModalUploadImagem
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUploadSuccess={setImagem}
      />
    </Card>
  );
}