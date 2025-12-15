'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { paths } from '@/paths';

import Link from 'next/link';
import { Logo } from '@/components/core/logo';

export function LandingNavbar(): React.JSX.Element {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: scrolled
                    ? 'rgba(15, 20, 25, 0.85)'
                    : 'rgba(15, 20, 25, 0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
            }}
        >
            <Toolbar>
                <Container
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Logo */}
                    <Stack spacing={2} sx={{ p: 3 }}>
                        <Box sx={{ display: 'inline-flex' }}>
                            <Logo color="light" height={32} width={122} />
                        </Box>
                    </Stack>

                    {/* Ações */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            component={Link}
                            href={paths.auth.signIn}
                            color="inherit"
                            sx={{ textTransform: 'none' }}
                        >
                            Entrar
                        </Button>

                        <Button
                            component={Link}
                            href={paths.auth.signUp}
                            variant="contained"
                            sx={{
                                textTransform: 'none',
                                bgcolor: 'primary.main',
                            }}
                        >
                            Cadastrar
                        </Button>
                    </Box>
                </Container>
            </Toolbar>
            
        </AppBar>
    );
}
