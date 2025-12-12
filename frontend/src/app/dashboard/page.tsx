"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { Calendario } from "@/components/dashboard/overview/calendario";
import { CriarProva } from "@/components/dashboard/overview/criar-prova";
import { CriarQuestao } from "@/components/dashboard/overview/criar-questao";
import { MinhasAvaliacoes } from "@/components/dashboard/overview/minhas-avaliacoes";
import { CardProfessores } from "@/components/dashboard/overview/professores-card";
import { TurmasCard } from "@/components/dashboard/overview/turmas-card";

export default function Page(): React.JSX.Element {
	const [firstName, setFirstName] = React.useState("Professor");
	const [professorId, setProfessorId] = React.useState<number | null>(null);
	const [userType, setUserType] = React.useState<string | null>(null);

	React.useEffect(() => {
		const storedUser = localStorage.getItem("user") || localStorage.getItem("usuario");
		if (storedUser) {
			try {
				const user = JSON.parse(storedUser);
				const nome = user?.nome || user?.name;
				if (nome) setFirstName(nome.split(" ")[0]);
				setProfessorId(user?.id || user?.id_usuario || null);
				setUserType(user?.tipo || user?.type || null);
				console.debug("dashboard page setProfessorId", { id: user?.id || user?.id_usuario || null });
			} catch {
				// ignore parse error
			}
		}
	}, []);
	return (
		<Box sx={{ p: 0 }}>
			<Typography variant="h4" fontWeight="bold" gutterBottom>
				👋 Bem-vindo(a), {firstName}!
			</Typography>

			<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
				Aqui você pode criar e acompanhar suas avaliações de forma rápida e intuitiva.
			</Typography>
			{/* Criar Prova */}
			<Grid container spacing={2}>
				{/* Coluna empilhando CriarProva + CriarQuestao */}
				<Grid size={{ lg: 4, sm: 12, xs: 12 }}>
					<Box display="flex" flexDirection="column" gap={2} height="100%">
						{userType === "gestor" ? (
							<>
								<CardProfessores />
								<TurmasCard />
							</>
						) : (
							<>
								<CriarProva />
								<CriarQuestao />
							</>
						)}
					</Box>
				</Grid>

				{/* Calendário */}
				<Grid size={{ lg: 8, sm: 12, xs: 12 }}>
					<Calendario />
				</Grid>

				{/* Minhas Avaliações (apenas para professores) */}
				{userType === "professor" && (
					<Grid size={{ lg: 12, md: 12, xs: 12 }}>
						<MinhasAvaliacoes sx={{ height: "100%" }} professorId={professorId} />
					</Grid>
				)}
			</Grid>
		</Box>
	);
}
