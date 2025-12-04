"use client";

import { useEffect, useState } from "react";
import {
	Alert,
	Autocomplete,
	Box,
	Button,
	Chip,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";

interface Professor {
	id_usuario: number;
	nome: string;
	email: string;
	telefone: string;
	foto?: string;
	tipo: string;
}

interface Disciplina {
	id_disciplina: number;
	nome_disciplina: string;
}

interface Turma {
	id_turma: number;
	nome_turma: string;
	serie: string;
	turno: string;
}

interface ModalEdicaoProfessorProps {
	open: boolean;
	professor: Professor | null;
	onClose: () => void;
	onSuccess: () => void;
}

export default function ModalEdicaoProfessor({ open, professor, onClose, onSuccess }: ModalEdicaoProfessorProps) {
	const [formData, setFormData] = useState({
		nome: "",
		email: "",
		telefone: "",
	});

	const [selectedDisciplinas, setSelectedDisciplinas] = useState<Disciplina[]>([]);
	const [selectedTurmas, setSelectedTurmas] = useState<Turma[]>([]);

	const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
	const [turmas, setTurmas] = useState<Turma[]>([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Carregar dados iniciais
	useEffect(() => {
		if (open && professor) {
			setFormData({
				nome: professor.nome,
				email: professor.email,
				telefone: professor.telefone || "",
			});

			fetchDisciplinas();
			fetchTurmas();
		}
	}, [open, professor]);

	// Buscar todas as disciplinas
	const fetchDisciplinas = async () => {
		try {
			const response = await axios.get("http://localhost/sea/backend/controllers/disciplinaController.php");

			console.log("Response: ", response.data);

			// Normaliza e filtra itens inválidos
			const mapped = (response.data || [])
				.filter((d: any) => d && d.id_disciplina && d.nome_disciplina)
				.map((d: any) => ({
					id_disciplina: Number(d.id_disciplina),
					nome_disciplina: d.nome_disciplina,
				}));
			console.log("MAPPED: ", mapped);
			setDisciplinas(mapped);
		} catch (err) {
			console.error("Erro ao buscar disciplinas:", err);
		}
	};

	// Buscar todas as turmas
	const fetchTurmas = async () => {
		try {
			const response = await axios.get("http://localhost/sea/backend/controllers/TurmaController.php");
			setTurmas(response.data || []);
		} catch (err) {
			console.error("Erro ao buscar turmas:", err);
		}
	};

	// Atualiza os campos do formulário
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Salvar alterações
	const handleSave = async () => {
		if (!formData.nome || !formData.email || !professor) {
			setError("Nome e email são obrigatórios");
			return;
		}

		setLoading(true);
		setError("");

		try {
			// Atualizar dados do usuário
			const updatePayload = {
				id_usuario: professor.id_usuario,
				nome: formData.nome,
				email: formData.email,
				telefone: formData.telefone,
			};

			console.log("Update Payload:", updatePayload);

			await axios.put("http://localhost/sea/backend/controllers/UsuarioController.php", updatePayload);

			// Adicionar disciplinas selecionadas
			for (const disciplina of selectedDisciplinas) {
				await axios.post("http://localhost/sea/backend/controllers/ProfessorDisciplinaController.php", {
					id_professor: professor.id_usuario,
					id_disciplina: disciplina.id_disciplina,
				});
			}

			// Adicionar turmas selecionadas
			for (const turma of selectedTurmas) {
				await axios.post("http://localhost/sea/backend/controllers/ProfessorTurmaController.php", {
					id_professor: professor.id_usuario,
					id_turma: turma.id_turma,
				});
			}

			onSuccess();
			onClose();
		} catch (err: any) {
			console.error("Erro ao salvar:", err);
			setError(err.response?.data?.erro || "Erro ao salvar as alterações");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Editar Professor</DialogTitle>
			<DialogContent>
				<Stack spacing={2} sx={{ mt: 2 }}>
					{error && <Alert severity="error">{error}</Alert>}

					<TextField label="Nome" name="nome" value={formData.nome} onChange={handleInputChange} fullWidth />

					<TextField
						label="Email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleInputChange}
						fullWidth
					/>

					<TextField
						label="Telefone"
						name="telefone"
						value={formData.telefone}
						onChange={handleInputChange}
						fullWidth
					/>

					{/* Disciplinas */}
					<Box>
						<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
							Disciplinas
						</Typography>
						<Autocomplete
							multiple
							options={disciplinas}
							getOptionLabel={(option) => option.nome_disciplina}
							value={selectedDisciplinas}
							onChange={(event, newValue) => setSelectedDisciplinas(newValue)}
							renderInput={(params) => (
								<TextField {...params} label="Selecione as disciplinas" placeholder="Pesquisar disciplina" />
							)}
						/>

						{selectedDisciplinas.length > 0 && (
							<Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{selectedDisciplinas.map((d) => (
									<Chip key={d.id_disciplina} label={d.nome_disciplina} size="small" />
								))}
							</Box>
						)}
					</Box>

					{/* Turmas */}
					<Box>
						<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
							Turmas
						</Typography>
						<Autocomplete
							multiple
							options={turmas}
							getOptionLabel={(option) => `${option.nome_turma} (${option.serie})`}
							value={selectedTurmas}
							onChange={(event, newValue) => setSelectedTurmas(newValue)}
							renderInput={(params) => (
								<TextField {...params} label="Selecione as turmas" placeholder="Pesquisar turma" />
							)}
						/>

						{selectedTurmas.length > 0 && (
							<Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{selectedTurmas.map((t) => (
									<Chip key={t.id_turma} label={`${t.nome_turma} (${t.serie})`} size="small" />
								))}
							</Box>
						)}
					</Box>
				</Stack>
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose} disabled={loading}>
					Cancelar
				</Button>
				<Button
					onClick={handleSave}
					variant="contained"
					disabled={loading}
					startIcon={loading ? <CircularProgress size={20} /> : undefined}
				>
					{loading ? "Salvando..." : "Salvar"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
