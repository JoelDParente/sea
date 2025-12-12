"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid, Typography } from "@mui/material";
import { Plus } from "@phosphor-icons/react";

import { paths } from "@/paths";
import CardAcao from "@/components/dashboard/criacao/card-acao";
import ModalComponenteCurricular from "@/components/dashboard/criar-prova/ModalDisciplina";
import ModalNomeSerie from "@/components/dashboard/criar-prova/ModalNomeSerie";
import { MinhasAvaliacoes } from "@/components/dashboard/criar-prova/minhas-avaliacoes";

export default function DashboardPage() {
	const router = useRouter();

	const [openNomeSerie, setOpenNomeSerie] = useState(false);
	const [openComponente, setOpenComponente] = useState(false);
	const [tmpProva, setTmpProva] = useState<{ nome: string; turmas: any[] } | null>(null);
	const [firstName, setFirstName] = React.useState("Professor");
	const [professorId, setProfessorId] = React.useState<number | null>(null);
	const [userType, setUserType] = React.useState<string | null>(null);

	const handleClickCriarProva = () => {
		try {
			sessionStorage.removeItem("criarProvaNomeSerieDone");
		} catch (e) {}
		setOpenNomeSerie(true);
	};

	const handleConfirmNomeSerie = (payload: { nome: string; turmas: any[] }) => {
		setTmpProva(payload);
		setOpenNomeSerie(false);
		setOpenComponente(true);
	};

	const handleConfirmComponente = (turma: any) => {
		try {
			const data = { prova: tmpProva, turma };
			sessionStorage.setItem("criarProvaInit", JSON.stringify(data));
		} catch (e) {
			console.warn("Não foi possível gravar sessionStorage criarProvaInit", e);
		}
		setOpenComponente(false);
		router.push(paths.dashboard.criacao.prova);
	};

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
		<Box sx={{ p: 2 }}>
			<Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
				O que você deseja criar hoje?
			</Typography>

			<Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
				<CardAcao
					title="Criar Prova Completa"
					description="Monte uma prova com cabeçalho e exportação para PDF."
					icon={<Plus size={32} />}
					onClick={handleClickCriarProva}
				/>

				<CardAcao
					title="Criar Questão Avulsa"
					description="Crie e salve questões individuais no banco de dados."
					icon={<Plus size={32} />}
					onClick={() => router.push(paths.dashboard.criacao.questao)}
				/>

				<CardAcao
					title="Editar Questões"
					description="Edite as questões já criadas por você"
					icon={<Plus size={32} />}
					onClick={() => router.push(paths.dashboard.criacao.minhasQuestoes)}
				/>
			</Box>

			{userType === "professor" && (
				<Grid size={{ lg: 12, md: 12, xs: 12 }}>
					<MinhasAvaliacoes sx={{ height: "100%" }} professorId={professorId} />
				</Grid>
			)}

			<ModalNomeSerie open={openNomeSerie} onClose={() => setOpenNomeSerie(false)} onConfirm={handleConfirmNomeSerie} />
			<ModalComponenteCurricular
				open={openComponente}
				onClose={() => setOpenComponente(false)}
				onConfirm={handleConfirmComponente}
			/>
		</Box>
	);
}
