'use client'
import React from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
    useTheme,
    useMediaQuery,
    Backdrop,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CriarQuestao from '../criar-questao'; // Assumindo que este path está correto

interface ModalCriarQuestaoProps {
    open: boolean;
    onClose: () => void; // A função para fechar o modal
    onSave: (questao: any) => void;
}

export default function ModalCriarQuestao({ open, onClose, onSave }: ModalCriarQuestaoProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 300 } }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    width: isMobile ? '95%' : '90%',
                    maxWidth: '1200px',
                    maxHeight: '95vh',
                    overflowY: 'auto',
                    p: 3,
                }}
            >
                {/* Cabeçalho */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, borderBottom: '1px solid #eee' }}>
                    <Typography variant="h5" component="h2" fontWeight="bold">
                        Criar Nova Questão
                    </Typography>
                    <IconButton onClick={onClose} size="large">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Corpo do Modal */}
                <Box sx={{ pt: 2 }}>
                    <CriarQuestao onSave={onSave} />
                </Box>
            </Box>
        </Modal>
    );
}