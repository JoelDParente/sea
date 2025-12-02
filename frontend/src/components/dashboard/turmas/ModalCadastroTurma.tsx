"use client";

import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";
import axios from "axios";
import { on } from "events";

export default function ModalCadastroTurma({
	open,
	onClose,
	onSubmit,
}: {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: { nome_turma: string; serie: string; turno: string; id_escola: number | null }) => void;
}) {
	const [nome, setNome] = useState("");
	const [serie, setSerie] = useState("");
	const [turno, setTurno] = useState("");

	const series = [
		"1º ano",
		"2º ano",
		"3º ano",
		"4º ano",
		"5º ano",
		"6º ano",
		"7º ano",
		"8º ano",
		"9º ano",
		"1º Médio",
		"2º Médio",
		"3º Médio",
	];

	const turnos = ["manhã", "tarde", "noite", "integral"];

	const handleSave = () => {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		const payload = {
			id_escola: user.id_escola,
			nome_turma: nome,
			serie: serie,
			turno: turno,
		};
    
    onSubmit(payload);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>Cadastrar Turma</DialogTitle>
			<DialogContent>
				<Stack spacing={2} mt={1}>
					<TextField label="Nome da Turma" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth />

					<TextField select label="Série" value={serie} onChange={(e) => setSerie(e.target.value)} fullWidth>
						{series.map((s, i) => (
							<MenuItem key={i} value={s}>
								{s}
							</MenuItem>
						))}
					</TextField>

					<TextField select label="Turno" value={turno} onChange={(e) => setTurno(e.target.value)} fullWidth>
						{turnos.map((t, i) => (
							<MenuItem key={i} value={t}>
								{t}
							</MenuItem>
						))}
					</TextField>
				</Stack>
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose}>Cancelar</Button>
				<Button variant="contained" onClick={handleSave}>
					Salvar
				</Button>
			</DialogActions>
		</Dialog>
	);
}
