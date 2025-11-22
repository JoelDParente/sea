'use client';
import { Box, Typography } from '@mui/material';
import { Plus } from '@phosphor-icons/react';
import CardAcao from '@/components/dashboard/criacao/card-acao';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';
import React, { useState } from 'react';
import ModalNomeSerie from '@/components/criar-prova/ModalNomeSerie';
import ModalComponenteCurricular from '@/components/criar-prova/ModalDisciplina';

export default function DashboardPage() {
    const router = useRouter();

    const [openNomeSerie, setOpenNomeSerie] = useState(false);
    const [openComponente, setOpenComponente] = useState(false);
    const [tmpProva, setTmpProva] = useState<{ nome: string; serie: string } | null>(null);

    const handleClickCriarProva = () => {
        // inicia o fluxo pelos modais
        setOpenNomeSerie(true);
    };

    const handleConfirmNomeSerie = (payload: { nome: string; serie: string }) => {
        setTmpProva(payload);
        setOpenNomeSerie(false);
        setOpenComponente(true);
    };

    const handleConfirmComponente = (turma: any) => {
        // persistir dados temporariamente para a página de criação (pode ser lido pela página)
        try {
            const data = { prova: tmpProva, turma };
            sessionStorage.setItem('criarProvaInit', JSON.stringify(data));
        } catch (e) {
            console.warn('Não foi possível gravar sessionStorage criarProvaInit', e);
        }
        setOpenComponente(false);
        // navegar para a página de criação completa
        router.push(paths.dashboard.criacao.prova);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                O que você deseja criar hoje?
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <CardAcao
                    title="Criar Prova Completa"
                    description="Monte uma prova com cabeçalho e exportação para PDF."
                    icon={<Plus size={32} />}
                    onClick={handleClickCriarProva}
                />

                <CardAcao
                    title="Criar Questão Avulsa"
                    description="Crie e salve questões individuais no banco de dados."
                    icon={<Plus size={32} />}
                    onClick={() => router.push(paths.dashboard.criacao.questao)}
                />

                <CardAcao
                    title="Editar Questões"
                    description="Edite as questões já criadas por você"
                    icon={<Plus size={32} />}
                    onClick={() => router.push(paths.dashboard.criacao.minhasQuestoes)}
                />

            </Box>

            <ModalNomeSerie open={openNomeSerie} onClose={() => setOpenNomeSerie(false)} onConfirm={handleConfirmNomeSerie} />
            <ModalComponenteCurricular open={openComponente} onClose={() => setOpenComponente(false)} onConfirm={handleConfirmComponente} />
        </Box>
    );
}
