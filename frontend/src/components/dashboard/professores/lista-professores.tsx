"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Card, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

import ModalCadastroProfessor from "./modal-cadastro-professor";

export default function ListaProfessores(): React.JSX.Element {
	const router = useRouter();
	const [rows, setRows] = React.useState<any[]>([]);
	const [loading, setLoading] = React.useState(false);
	const [search, setSearch] = React.useState("");
	const [openCreate, setOpenCreate] = React.useState(false);

   const storedUser = localStorage.getItem("user");
   const user = storedUser ? JSON.parse(storedUser) : null;

const fetchProfessores = React.useCallback(async () => {
  setLoading(true);
  try {
    const res = await axios.get(
      "http://localhost/sea/backend/controllers/UsuarioController.php",
      { params: { id_escola: user.id_escola } } // coloque o ID real aqui
    );

    const profs = Array.isArray(res.data) ? res.data : [];

    setRows(profs.map((r: any) => ({
      id: r.id_usuario ?? r.uid ?? r.id,
      ...r
    })));

  } catch (err) {
    console.error("Erro ao buscar professores", err);
  } finally {
    setLoading(false);
  }
}, []);

	React.useEffect(() => {
		fetchProfessores();
	}, [fetchProfessores]);

	const handleCreate = async (data: any) => {
		try {
			await axios.post("http://localhost/sea/backend/controllers/UsuarioController.php", data, {
				headers: { "Content-Type": "application/json" },
			});
			setOpenCreate(false);
			fetchProfessores();
		} catch (err) {
			console.error(err);
			alert("Erro ao criar professor");
		}
	};

	const handleDelete = async (id: number) => {
		if (!confirm("Confirmar exclusão deste professor?")) return;
		try {
			await axios.delete("http://localhost/sea/backend/controllers/UsuarioController.php", { data: { id } });
			fetchProfessores();
		} catch (err) {
			console.error(err);
			alert("Erro ao excluir professor");
		}
	};

	const columns: GridColDef[] = [
		{ field: "nome", headerName: "Nome", flex: 1 },
		{ field: "email", headerName: "E-mail", width: 240 },
		{ field: "telefone", headerName: "Telefone", width: 160 },
		{
			field: "actions",
			type: "actions",
			headerName: "Ações",
			width: 140,
			getActions: (params) => [
				<GridActionsCellItem
					icon={<VisibilityIcon />}
					label="Ver"
					onClick={() => router.push(`/dashboard/turmas/${params.id}`)}
				/>,
				<GridActionsCellItem
					icon={<EditIcon />}
					label="Editar"
					onClick={() => setOpenCreate(true)}
					showInMenu={false}
				/>,
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Excluir"
					onClick={() => handleDelete(Number(params.id))}
					showInMenu={false}
				/>,
			],
		},
	];

	const filtered = rows.filter((r) => {
		if (!search) return true;
		const s = search.toLowerCase();
		return (
			String(r.nome_turma || "")
				.toLowerCase()
				.includes(s) ||
			String(r.serie || "")
				.toLowerCase()
				.includes(s)
		);
	});

	return (
		<Card>
			<CardHeader
				title="Professores"
				subheader="Gerencie usuários do tipo professor"
				action={
					<Stack direction="row" spacing={1} alignItems="center">
						<TextField
							size="small"
							placeholder="Buscar..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenCreate(true)}>
							Criar Professor
						</Button>
					</Stack>
				}
			/>
			<CardContent>
				<Box sx={{ height: 520 }}>
					<DataGrid
						rows={filtered}
						columns={columns}
						loading={loading}
						pageSizeOptions={[5, 10, 25]}
						initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
					/>
				</Box>
			</CardContent>

			<ModalCadastroProfessor open={openCreate} onClose={() => setOpenCreate(false)} onSuccess={handleCreate} />
		</Card>
	);
}
