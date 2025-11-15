"use client";

import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Radio,
    RadioGroup,
    FormControlLabel,
    CircularProgress,
    Box,
} from '@mui/material';
import axios from 'axios';

interface Turma {
    id_turma: string | number;
    nome_turma: string;
    disciplina: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: (turma: Turma) => void;
    professorId?: string | number;
}

export default function ModalComponenteCurricular({ open, onClose, onConfirm, professorId }: Props) {
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<string | number>('');

    useEffect(() => {
        if (!open) return;
        const fetchTurmas = async () => {
            setLoading(true);
            try {
                const id = professorId || (() => {
                    try {
                        // Tenta extrair id a partir do JWT salvo no localStorage (vários nomes comuns)
                        const tokenKeys = ['token', 'accessToken', 'authToken', 'jwt', 'user_token', 'authorization', 'Authorization'];
                        let token = '';
                        for (const k of tokenKeys) {
                            const v = localStorage.getItem(k as string);
                            if (v) { token = v; break; }
                        }

                        // Se não encontrou token, tenta extrair do objeto 'user' (que pode ter id direto ou token interno)
                        if (!token) {
                            const u = localStorage.getItem('user');
                            if (u) {
                                try {
                                    const parsed = JSON.parse(u);
                                    if (parsed?.token) token = parsed.token;
                                    else if (parsed?.accessToken) token = parsed.accessToken;
                                    else if (parsed?.jwt) token = parsed.jwt;
                                    else if (parsed?.authorization) token = parsed.authorization;
                                    // se não houver token mas houver id, retorna direto
                                    if (!token && (parsed?.id || parsed?.id_professor || parsed?.id_usuario)) {
                                        return parsed?.id || parsed?.id_professor || parsed?.id_usuario || '';
                                    }
                                } catch {
                                    // ignorar parse error
                                }
                            }
                        }

                        if (token) {
                            // remove prefixo Bearer se presente
                            token = String(token).replace(/^Bearer\s+/i, '');
                            const parts = token.split('.');
                            if (parts.length >= 2) {
                                try {
                                    // base64url -> base64
                                    const payloadB64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
                                    // atob pode lançar para payloads UTF-8, por isso protegemos
                                    const json = decodeURIComponent(Array.prototype.map.call(atob(payloadB64), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
                                    const payload = JSON.parse(json);
                                    return payload?.id || payload?.sub || payload?.id_professor || payload?.user_id || payload?.id_usuario || payload?.usuario_id || '';
                                } catch {
                                    // falha ao decodificar JWT, cair para fallback
                                }
                            }
                        }

                        return '';
                    } catch {
                        return '';
                    }
                })();

                const res = await axios.get(`http://localhost/sea/backend/controllers/ProfessorDisciplinaController.php?id_professor=${id}`);
                const raw = Array.isArray(res.data) ? res.data : Object.values(res.data || {});

                // Normalizar diferentes formatos que a API pode retornar
                const normalized = (raw as any[]).map((it) => {
                    // tente extrair id da turma / disciplina a partir de vários campos possíveis
                    const id_turma = it.id_turma ?? it.id_turma_fk ?? it.id_turma_prof ?? it.id_turma_professor ?? it.id_disciplina ?? it.id_professor_disciplina ?? it.id ?? (it.turma && (it.turma.id || it.turma.id_turma)) ?? '';
                    const nome_turma = it.nome_turma ?? it.turma_nome ?? it.nome_turma ?? it.nome_disciplina ?? it.disciplina_nome ?? it.nome ?? (it.turma && (it.turma.nome || it.turma.nome_turma)) ?? '';
                    const disciplina = it.disciplina ?? it.nome_disciplina ?? it.disciplina_nome ?? it.nome ?? '';

                    return {
                        id_turma: id_turma,
                        nome_turma: String(nome_turma || id_turma),
                        disciplina: String(disciplina || ''),
                    } as Turma;
                });

                setTurmas(normalized);
                // se não houver seleção, selecione a primeira turma retornada
                if (!selected && normalized.length > 0) {
                    setSelected(String(normalized[0].id_turma));
                }
            } catch (err) {
                console.error('Erro ao buscar turmas do professor', err);
                setTurmas([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTurmas();
    }, [open, professorId]);

    const handleConfirm = () => {
        const t = turmas.find((x) => String(x.id_turma) === String(selected));
        if (!t) return;
        onConfirm(t);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Selecione o Componente Curricular</DialogTitle>
            <DialogContent>
                <Box sx={{ minHeight: 160 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : turmas.length === 0 ? (
                        <Box sx={{ py: 4 }}>
                            <ListItemText primary="Nenhuma disciplina encontrada para este professor." />
                        </Box>
                    ) : (
                        <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
                            <List>
                                {turmas.map((t) => (
                                    <ListItem key={t.id_turma} disablePadding>
                                        <FormControlLabel
                                            value={String(t.id_turma)}
                                            control={<Radio />}
                                            label={`${t.nome_turma} — ${t.disciplina || ''}`}
                                            sx={{ width: '100%' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </RadioGroup>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleConfirm} disabled={!selected}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
