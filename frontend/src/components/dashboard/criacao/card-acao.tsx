//card-acao.tsx
'use client';
import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

interface CardAcaoProps {
    title: string;
    description: string; // Adicionada descrição para contexto
    icon: React.ReactNode;
    onClick: () => void;
}

// Estilização para o ícone e o título
const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    height: '100%',
    padding: theme.spacing(3), // Aumenta o padding
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    },
}));

const CardAcao: React.FC<CardAcaoProps> = ({ title, description, icon, onClick }) => (
    <Card
        sx={{
            width: { xs: '100%', sm: 280, md: 350 }, // Largura responsiva (maior que o original 180px)
            minHeight: 180,
            borderRadius: 2,
        }}
        elevation={4}
    >
        <StyledCardActionArea onClick={onClick}>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>

                {/* Ícone */}
                <Box sx={{ mb: 1, color: 'primary.main' }}>
                    {React.cloneElement(icon as React.ReactElement)}
                </Box>

                {/* Título */}
                <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
                    {title}
                </Typography>

                {/* Descrição */}
                <Typography variant="body2" color="text.secondary" textAlign="left">
                    {description}
                </Typography>
            </CardContent>
        </StyledCardActionArea>
    </Card>
);

export default React.memo(CardAcao);