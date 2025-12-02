"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import ModalEditarQuestao from '@/components/criar-prova/ModalEditarQuestao';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';
import DOMPurify from "isomorphic-dompurify";

function sanitizeHtml(html: string) {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "br", "p", "img"],
        ALLOWED_ATTR: ["src", "alt", "style"],
    });
}

type Alternativa = { texto: string };
type Questao = {
    id_questao: number | string;
    enunciado: string;
    titulo?: string;
    nome_disciplina?: string;
    nome_categoria?: string;
    nome_assunto?: string;
    alternativas?: Alternativa[];
    id_professor?: number;
};

export default function MinhasQuestoesPage() {
    const router = useRouter();
    const [questoes, setQuestoes] = useState<Questao[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<Questao | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<Questao | null>(null);

    const getProfessorId = () => {
        try {
            const raw = localStorage.getItem('user');
            if (raw) {
                const parsed = JSON.parse(raw);
                return parsed?.id || parsed?.id_professor || parsed?.id_usuario || null;
            }
        } catch (e) {
            // ignore
        }
        return null;
    };

    const fetchQuestoes = async () => {
        setLoading(true);
        try {
            const profId = getProfessorId();
            const url = profId
                ? `http://localhost/sea/backend/controllers/QuestaoController.php?tipo=questoes&id_professor=${profId}`
                : 'http://localhost/sea/backend/controllers/QuestaoController.php?tipo=questoes';

            const res = await axios.get(url);
            const data: Questao[] = Array.isArray(res.data)
                ? res.data.map((q: any) => ({
                    ...q,
                    id_professor: q.id_professor ? Number(q.id_professor) : undefined
                }))
                : [];
            setQuestoes(data);
        } catch (err) {
            console.error('Erro ao buscar questões', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestoes();
    }, []);

    const handleOpenEdit = (q: Questao) => setSelected(q);
    const handleCloseEdit = () => setSelected(null);

    const handleSaved = () => {
        handleCloseEdit();
        fetchQuestoes();
    };

    const handleDelete = async (q: Questao) => {
        setConfirmDelete(q);
    };

    const confirmDeleteNow = async () => {
        if (!confirmDelete) return;
        try {
            await axios.delete('http://localhost/sea/backend/controllers/QuestaoController.php?id_questao=' + encodeURIComponent(String(confirmDelete.id_questao)));
            setConfirmDelete(null);
            fetchQuestoes();
        } catch (err) {
            console.error('Erro ao excluir questão', err);
        }
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Minhas Questões
            </Typography>
            <Button
                startIcon={<ArrowLeft size={18} />}
                onClick={() => router.push(paths.dashboard.criacao.root)}
                sx={{ mb: 2 }}
            >
                Voltar para o Menu
            </Button>

            <Box sx={{ mb: 2 }}>
                <Typography variant="body2">Lista das questões criadas por você. Edite ou exclua conforme necessário.</Typography>
            </Box>

            <Grid container spacing={2}>
                {questoes.map((q) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={q.id_questao}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <div
                                        style={{
                                            maxHeight: 150,
                                            overflow: 'hidden',
                                        }}
                                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(q.enunciado ?? "") }}
                                    />                                </Typography>
                                <Typography variant="caption" display="block">
                                    Disciplina: {q.nome_disciplina ?? '—'}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    Categoria: {q.nome_categoria ?? '—'}
                                </Typography>
                                <Typography variant="caption" display="block">
                                    Assunto: {q.nome_assunto ?? '—'}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Button size="small" onClick={() => handleOpenEdit(q)}>
                                    Editar
                                </Button>
                                <Button size="small" color="error" onClick={() => handleDelete(q)}>
                                    Excluir
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Edit Modal */}
            {selected && <ModalEditarQuestao open={!!selected} questao={selected} onClose={handleCloseEdit} onSaved={handleSaved} />}

            {/* Confirm delete dialog */}
            <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
                <DialogTitle>Confirmar exclusão</DialogTitle>
                <DialogContent>Tem certeza que deseja excluir esta questão?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(null)}>Cancelar</Button>
                    <Button color="error" onClick={confirmDeleteNow}>Excluir</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
