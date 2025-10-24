//page.tsx (Atualizado para alinhamento do título)
'use client';
import React, { JSX, Suspense, lazy } from 'react';
import { Box, Stack, CircularProgress, Button, Typography, useTheme } from '@mui/material';
import { Plus, ArrowLeft } from '@phosphor-icons/react';
import CardAcao from '@/components/dashboard/criacao/card-acao'; // Assumindo que este componente existe
import { styled } from '@mui/system';

// Lazy loading dos componentes
const CriarProva = lazy(() => import('@/components/dashboard/criacao/prova/criar-prova'));
const CriarQuestaoPage = lazy(() => import('@/components/dashboard/criacao/criar-questao'));

type Modos = 'lista' | 'criarProva' | 'criarQuestao';

// Componente de Fallback Aprimorado
const StyledFallback = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    padding: theme.spacing(4),
}));

export default function Page(): JSX.Element {
    const [modo, setModo] = React.useState<Modos>('lista');
    const theme = useTheme();

    const handleVoltar = () => setModo('lista');

    // Títulos dinâmicos para a página
    const getTitle = (currentMode: Modos): string => {
        switch (currentMode) {
            case 'criarProva':
                return 'Criar Nova Prova 📝';
            case 'criarQuestao':
                return 'Criar Questão Avulsa 💡';
            default:
                return 'O que você deseja criar hoje?';
        }
    };

    const onQuestaoSalva = (questao: any) => {
        console.log('Questão salva avulsa:', questao);
        alert('Questão salva com sucesso! (Voltando para a lista)');
        handleVoltar();
    };

    return (
        <Stack spacing={0} sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', p: 2 }}>
            {/* CONTAINER DE TÍTULO/VOLTAR */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    mb: 1,
                    mt: 1
                }}
            >
                {/* Exibe o botão de voltar somente nos modos de criação */}
                {modo !== 'lista' ? (
                    <Button
                        startIcon={<ArrowLeft size={18} />}
                        onClick={handleVoltar}
                    >
                        Voltar para o Menu
                    </Button>
                ) : (
                    <Box sx={{ width: 0 }} />
                )}

                {/* TÍTULO DINÂMICO */}
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: theme.palette.primary.main, ml: modo !== 'lista' ? 2 : 0, mr: 'auto', textAlign:'left' }}
                >
                    {getTitle(modo)}
                </Typography>
            </Box>

            {modo === 'lista' && (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: { xs: 'center', md: 'flex-start' }
                    }}
                >
                    <CardAcao
                        title="Criar Prova Completa"
                        description="Monte uma prova com cabeçalho, slots de questões e exportação para PDF."
                        icon={<Plus size={32} />}
                        onClick={() => setModo('criarProva')}
                    />
                    <CardAcao
                        title="Criar Questão para Banco"
                        description="Crie e salve questões individuais no seu banco de dados."
                        icon={<Plus size={32} />}
                        onClick={() => setModo('criarQuestao')}
                    />
                </Box>
            )}

            {modo !== 'lista' && (
                <Box>
                    {/* O botão de Voltar foi movido para o Container de Título/Voltar acima. */}
                    <Suspense
                        fallback={
                            <StyledFallback>
                                <CircularProgress size={50} sx={{ mb: 2 }} />
                                <Typography variant="subtitle1" color="text.secondary">
                                    Carregando o editor...
                                </Typography>
                            </StyledFallback>
                        }
                    >
                        {modo === 'criarProva' && <CriarProva />}
                        {modo === 'criarQuestao' && <CriarQuestaoPage onSave={onQuestaoSalva} />}
                    </Suspense>
                </Box>
            )}
        </Stack>
    );
}