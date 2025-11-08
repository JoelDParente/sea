'use client';
import React, { useState } from 'react';
import {
  Box, Button, Modal, Typography, CircularProgress
} from '@mui/material';

interface ModalUploadImagemProps {
  open: boolean;
  onClose: () => void;
  onUploadSuccess: (path: string) => void;
}

export default function ModalUploadImagem({ open, onClose, onUploadSuccess }: ModalUploadImagemProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Selecione uma imagem.');
    setUploading(true);

    const formData = new FormData();
    formData.append('imagem', file);

    try {
      const res = await fetch('http://localhost/sea/backend/controllers/uploadImagem.php', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onUploadSuccess(data.path);
        onClose();
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (err) {
      alert('Falha ao enviar imagem.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 420, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24,
        textAlign: 'center',
      }}>
        <Typography variant="h6" mb={2}>Adicionar Imagem à Questão</Typography>

        <Box
          sx={{
            border: '2px dashed #aaa',
            p: 3,
            borderRadius: 2,
            cursor: 'pointer',
            color: 'text.secondary',
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          {file ? (
            <Typography>{file.name}</Typography>
          ) : (
            <Typography>Arraste e solte ou clique para selecionar</Typography>
          )}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </Box>

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onClose} disabled={uploading}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? <CircularProgress size={20} /> : 'Fazer upload'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}