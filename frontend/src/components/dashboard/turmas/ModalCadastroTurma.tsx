"use client";

import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Stack
} from "@mui/material";

export default function ModalCadastroTurma({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (data: { nome_turma: string; serie: string; turno: string; id_escola: number | null }) => void }) {
  const [nome, setNome] = useState("");
  const [serie, setSerie] = useState("");
  const [turno, setTurno] = useState("");

  const series = [
    "1º Fundamental", "2º Fundamental", "3º Fundamental", "4º Fundamental",
    "5º Fundamental", "6º Fundamental", "7º Fundamental", "8º Fundamental",
    "9º Fundamental", "1º Médio", "2º Médio", "3º Médio"
  ];

  const turnos = ["manhã", "tarde", "noite", "integral"];

  const handleSave = () => {
    const id_escola = Number(localStorage.getItem("id_escola"));
    onSubmit({ nome_turma: nome, serie, turno, id_escola });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cadastrar Turma</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Nome da Turma"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Série"
            value={serie}
            onChange={(e) => setSerie(e.target.value)}
            fullWidth
          >
            {series.map((s, i) => (
              <MenuItem key={i} value={s}>{s}</MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Turno"
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
            fullWidth
          >
            {turnos.map((t, i) => (
              <MenuItem key={i} value={t}>{t}</MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
