'use client';

import * as React from 'react';
import { Box, Container, Grid, Stack, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export function LandingFooter(): React.JSX.Element {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                bgcolor: '#0f1419',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                py: { xs: 6, md: 8 },
            }}
        >
            <Container maxWidth={false} disableGutters>
                <Box sx={{ px: { xs: 2, md: 4 } }}>
                    <Grid container spacing={4}>
                        {/* Logo / Descrição */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography
                                variant="h6"
                                fontWeight={700}
                                color="primary"
                                gutterBottom
                                textAlign={{ xs: 'center', md: 'left' }}
                            >
                                SEA
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                lineHeight={1.7}
                                textAlign={{ xs: 'center', md: 'left' }}
                            >
                                Sistema Elaborador de Avaliações criado para facilitar o trabalho
                                de professores na criação, organização e reutilização de provas escolares.
                            </Typography>
                        </Grid>

                        {/* Navegação */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                gutterBottom
                                textAlign={{ xs: 'center', md: 'left' }}
                            >
                                Navegação
                            </Typography>

                            <Stack
                                spacing={1}
                                alignItems={{ xs: 'center', md: 'flex-start' }}
                            >
                                <MuiLink
                                    component={Link}
                                    href="https://www.instagram.com/sea.avaliacoes/"
                                    underline="none"
                                    color="text.secondary"
                                >
                                    Instagram
                                </MuiLink>
                            </Stack>
                        </Grid>

                        {/* Desenvolvedores */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={600}
                                gutterBottom
                                textAlign={{ xs: 'center', md: 'left' }}
                            >
                                Desenvolvido por
                            </Typography>

                            <Stack
                                spacing={1}
                                alignItems={{ xs: 'center', md: 'flex-start' }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    Igor Nobre Teles
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Joel Damasceno Parente
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>


                    {/* Rodapé inferior */}
                    <Box
                        sx={{
                            mt: 6,
                            pt: 3,
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            © {new Date().getFullYear()} SEA — Todos os direitos reservados.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>

    );
}
