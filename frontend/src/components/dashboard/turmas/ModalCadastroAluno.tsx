"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import axios from 'axios';

export default function ModalCadastroAluno({
  open,
  onClose,
  idTurma,
  onSuccess,
  editData
}: {
  open: boolean;
  onClose: () => void;
  idTurma: number;
  onSuccess?: (data?: any) => void;
  editData?: any | null;
}) {

  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  // Carregar dados no modo edição
  useEffect(() => {
    if (editData) {
      setMatricula(editData.matricula ?? '');
      setNome(editData.nome ?? '');
      setEmail(editData.email ?? '');
      setFotoPreview(editData.foto ?? null);
      setFotoFile(null);
    } else {
      setMatricula('');
      setNome('');
      setEmail('');
      setFotoFile(null);
      setFotoPreview(null);
    }
  }, [editData]);

  const handleFotoChange = (e: any) => {
    const file = e.target.files?.[0] ?? null;
    setFotoFile(file);
    if (file) setFotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      let fotoUrl = editData?.foto || null;

      if (fotoFile) {
        const fd = new FormData();
        fd.append("foto", fotoFile);

        const res = await fetch("http://localhost/sea/backend/controllers/uploadAlunoFoto.php", {
          method: "POST",
          body: fd
        });

        const json = await res.json();
        if (json.url) fotoUrl = json.url;
      }

      const payload = {
        id_turma: idTurma,
        matricula,
        nome,
        email,
        foto: fotoUrl
      };

      if (editData) {
        // UPDATE
        await axios.put(
          `http://localhost/sea/backend/controllers/AlunoController.php?id_aluno=${editData.id_aluno}`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        // CREATE
        await axios.post(
          "http://localhost/sea/backend/controllers/AlunoController.php",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar aluno");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editData ? "Editar Aluno" : "Adicionar Aluno"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Matrícula" value={matricula} onChange={e => setMatricula(e.target.value)} fullWidth />
          <TextField label="Nome" value={nome} onChange={e => setNome(e.target.value)} fullWidth />
          <TextField label="E-mail" value={email} onChange={e => setEmail(e.target.value)} fullWidth />

          <Button variant="outlined" component="label">
            Enviar Foto
            <input hidden type="file" accept="image/*" onChange={handleFotoChange} />
          </Button>

          {fotoPreview && (
            <img
              src={fotoPreview}
              alt="Preview"
              style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          {editData ? "Salvar Alterações" : "Cadastrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}