"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { ArrowLeft } from "@phosphor-icons/react";

import { paths } from "@/paths";
import CriarQuestao from "@/components/dashboard/criacao/criar-questao";

export default function CriarQuestaoPage() {
	const router = useRouter();

	const handleQuestaoSalva = (questao: any) => {
		console.log("Questão salva:", questao);
		router.push(paths.dashboard.overview); // volta ao dashboard principal
	};

	return (
		<Box sx={{ p: 2, width: "100%", maxWidth: "1400px", mx: "auto" }}>
			{/* Título */}
			<Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
				Criar Questão Avulsa 💡
			</Typography>

			{/* Botão de voltar */}
			<Button
				startIcon={<ArrowLeft size={18} />}
				onClick={() => router.push(paths.dashboard.criacao.root)}
				sx={{ mb: 2 }}
			>
				Voltar para o Menu
			</Button>

			{/* Componente principal */}
			<CriarQuestao onSave={handleQuestaoSalva} />
		</Box>
	);
}
