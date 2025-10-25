'use client';
import { Box, Typography } from '@mui/material';
import { Plus } from '@phosphor-icons/react';
import CardAcao from '@/components/dashboard/criacao/card-acao';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths';

export default function DashboardPage() {
    const router = useRouter();

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
                    onClick={() => router.push(paths.dashboard.criacao.prova)}
                />

                <CardAcao
                    title="Criar Questão Avulsa"
                    description="Crie e salve questões individuais no banco de dados."
                    icon={<Plus size={32} />}
                    onClick={() => router.push(paths.dashboard.criacao.questao)}
                />

            </Box>
        </Box>
    );
}
