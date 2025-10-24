//CabecalhoProva.tsx
import React from 'react';
import { Box, Typography, Grid, Divider, Paper } from '@mui/material';

// Simulação dos dados que viriam do form da prova
interface CabecalhoProvaProps {
    titulo: string;
    disciplina: string;
    avaliacao: string;
    professor: string;
}

const CabecalhoProva: React.FC<CabecalhoProvaProps> = ({ titulo, disciplina, avaliacao, professor }) => {
    return (
        <Paper variant="outlined" sx={{ p: 2, mb: 3, border: '2px solid #333' }}>
            {/* Linhas de Informação */}
            <Grid container spacing={1}>
                {/* Disciplina e Professor */}
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ border: '1px solid #333', p: 0.5, bgcolor: '#f0f0f0', textAlign: 'center' }}>
                        <Grid container>
                            <Grid size={{ xs: 12 }}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {disciplina} - {titulo}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                {/* Nome */}
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ border: '1px solid #333', p: 0.5, display: 'flex' }}>
                        <Typography variant="caption" fontWeight="bold" sx={{ pr: 1, minWidth: 60 }}>
                            NOME:
                        </Typography>
                        <Typography variant="body2" sx={{ flexGrow: 1, borderBottom: '1px dotted #ccc' }}>

                        </Typography>
                    </Box>
                </Grid>

                {/* Data | Turma | Nota */}
                <Grid size={{ xs: 2 }}>
                    <Box sx={{ border: '1px solid #333', p: 0.5, height: '100%' }}>
                        <Typography variant="caption" fontWeight="bold">
                            DATA: __/__/____
                        </Typography>
                    </Box>
                </Grid>
                
                <Grid size={{ xs: 6 }}>
                    <Box sx={{ border: '1px solid #333', p: 0.5, height: '100%' }}>
                        <Typography variant="caption" fontWeight="bold">
                            TURMA:
                        </Typography>
                    </Box>
                </Grid>

                <Grid size={{ xs: 4 }}>
                    <Box sx={{ border: '1px solid #333', p: 0.5, height: '100%' }}>
                        <Typography variant="caption" fontWeight="bold">
                            NOTA:
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CabecalhoProva;