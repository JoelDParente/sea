'use client'
import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
    useTheme,
    useMediaQuery,
    Backdrop,
    Tabs,
    Tab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CriarQuestao from '../criar-questao'; // Assumindo que este path está correto
import ConsultarQuestoes from './consultar-questoes';

interface ModalCriarQuestaoProps {
    open: boolean;
    onClose: () => void; // A função para fechar o modal
    onSave: (questao: any) => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
}

export default function ModalCriarQuestao({ open, onClose, onSave }: ModalCriarQuestaoProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSelectQuestao = (questao: any) => {
        onSave(questao);
        onClose();
    };

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
                        Adicionar Questão
                    </Typography>
                    <IconButton onClick={onClose} size="large">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Abas */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="questão options"
                    >
                        <Tab label="Criar Nova Questão" id="tab-0" aria-controls="tabpanel-0" />
                        <Tab label="Banco de Questões" id="tab-1" aria-controls="tabpanel-1" />
                    </Tabs>
                </Box>

                {/* Conteúdo das Abas */}
                <TabPanel value={tabValue} index={0}>
                    <CriarQuestao onSave={onSave} />
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <ConsultarQuestoes onSelectQuestao={handleSelectQuestao} />
                </TabPanel>
            </Box>
        </Modal>
    );
}