"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    CircularProgress,
    Alert,
} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

interface Props {
    open: boolean;
    onClose: () => void;
    // retorna nome da prova e array de turmas selecionadas
    onConfirm: (payload: { nome: string; turmas: any[] }) => void;
}

export default function ModalNomeSerie({ open, onClose, onConfirm }: Props) {
    const [nome, setNome] = useState("");
    const [selectedTurmas, setSelectedTurmas] = useState<any[]>([]);
    const [touched, setTouched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<any[]>([]);
    const [noTurmas, setNoTurmas] = useState(false);

    const canConfirm = nome.trim().length > 0 && selectedTurmas.length > 0;

    const handleConfirm = () => {
        setTouched(true);
        if (!canConfirm) return;
        onConfirm({ nome: nome.trim(), turmas: selectedTurmas });
        onClose();
    };

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                // 1) buscar todas as turmas (lista mestra)
                const allRes = await axios.get('http://localhost/sea/backend/controllers/TurmaController.php');
                const allTurmas = Array.isArray(allRes.data) ? allRes.data : [];
                setOptions(allTurmas);

                // 2) tentar obter id do professor do localStorage
                let profId: number | null = null;
                try {
                    const u = localStorage.getItem('user');
                    if (u) {
                        const parsed = JSON.parse(u);
                        profId = parsed?.id || parsed?.id_professor || parsed?.id_usuario || null;
                    }
                } catch (e) {
                    profId = null;
                }

                if (!profId) {
                    // sem professor, não pré-seleciona nada
                    setSelectedTurmas([]);
                    return;
                }

                // 3) buscar turmas atribuídas ao professor (apenas IDs / info mínima)
                const assignedRes = await axios.get(`http://localhost/sea/backend/controllers/ProfessorTurmaController.php?id_professor=${profId}`);
                const assigned = Array.isArray(assignedRes.data) ? assignedRes.data : [];
				console.log(assignedRes.data);
                
                // verifica se professor não tem turmas atribuídas
                if (assigned.length === 0) {
                    setNoTurmas(true);
                    setSelectedTurmas([]);
                    return;
                }
                
                setNoTurmas(false);
                
                // 4) mapear assigned para objetos completos vindos de allTurmas
                const assignedIds = new Set(assigned.map((a: any) => Number(a.id_turma)));
                const matched = allTurmas.filter((t: any) => assignedIds.has(Number(t.id_turma)));
                setSelectedTurmas(matched);
            } catch (e) {
                console.error('Erro ao carregar turmas (ModalNomeSerie):', e);
                setOptions([]);
                setSelectedTurmas([]);
                setNoTurmas(false);
            } finally {
                setLoading(false);
            }
        };

        if (open) load();
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Nome da Prova e Turmas</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    {noTurmas && (
                        <Alert severity="warning">
                            Você não possui nenhuma turma atribuída. Contate o administrador para associar turmas ao seu perfil.
                        </Alert>
                    )}
                    
                    <TextField
                        label="Nome da Prova"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        fullWidth
                        required
                        error={touched && nome.trim() === ""}
                        helperText={touched && nome.trim() === "" ? "Informe o nome da prova" : ""}
                    />

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : noTurmas ? (
                        <Alert severity="error">
                            Não é possível criar prova sem turmas atribuídas.
                        </Alert>
                    ) : (
                        <Autocomplete
                            multiple
                            options={options}
                            getOptionLabel={(opt) => `${opt.nome_turma} (${opt.serie})`}
                            value={selectedTurmas}
                            onChange={(e, v) => setSelectedTurmas(v)}
                            renderInput={(params) => <TextField {...params} label="Selecione as turmas" placeholder="Turmas" />}
                        />
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    disabled={!canConfirm || noTurmas}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : undefined,
                        '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : undefined,
                        },
                    })}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
