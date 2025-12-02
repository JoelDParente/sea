"use client";

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import axios from 'axios';

export default function ModalCadastroAluno({ open, onClose, idTurma, onSuccess } : { open: boolean; onClose: () => void; idTurma: number; onSuccess?: (data?: any) => void }) {
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const handleSave = async () => {
    try {
      let fotoUrl: string | null = null;
      if (fotoFile) {
        const formData = new FormData();
        formData.append('foto', fotoFile);
        const res = await fetch('http://localhost/sea/backend/controllers/uploadAlunoFoto.php', { method: 'POST', body: formData });
        const json = await res.json();
        if (json && json.url) fotoUrl = json.url;
      }

      const payload = {
        id_turma: idTurma,
        matricula: matricula,
        nome: nome,
        email: email,
        foto: fotoUrl
      };

      await axios.post('http://localhost/sea/backend/controllers/AlunoController.php', payload, { headers: { 'Content-Type': 'application/json' } });
      onSuccess?.(payload);
      onClose();
      setMatricula(''); setNome(''); setEmail(''); setFotoFile(null);
    } catch (err) {
      console.error('Erro ao criar aluno', err);
      alert('Erro ao criar aluno');
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Adicionar Aluno</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)} fullWidth />
          <TextField label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth />
          <TextField label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />

          <Button variant='outlined' component='label'>
            Upload Foto
            <input hidden accept='image/*' type='file' onChange={(e:any) => { setFotoFile(e.target.files?.[0] ?? null) }} />
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
