'use client';

import * as React from 'react';
import { Box, Card, CardHeader, CardContent, Button, Stack, IconButton, Avatar } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ModalCadastroAluno from './ModalCadastroAluno';

export default function StudentsTable({ idTurma, userType, }: { idTurma: number; userType: string;  }): React.JSX.Element {
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [editRow, setEditRow] = React.useState<any | null>(null);

  // abrir modal de edição
  const handleEdit = (row: any) => {
    setEditRow(row);
    setOpenAdd(true);
  };

  const fetch = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost/sea/backend/controllers/AlunoController.php?id_turma=${idTurma}`);
      setRows(Array.isArray(res.data) ? res.data.map((r: any) => ({ id: r.id_aluno, ...r })) : []);
      console.log(res);

    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [idTurma]);

  React.useEffect(() => { if (idTurma) fetch(); }, [fetch, idTurma]);

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir aluno?')) return;
    try {
      await axios.delete(`http://localhost/sea/backend/controllers/AlunoController.php?id_aluno=${id}`);
      fetch();
    } catch (err) { console.error(err); alert('Erro ao excluir aluno'); }
  };

const columns: GridColDef[] = [
  {
    field: 'foto', headerName: 'Foto', width: 96, sortable: false,
    renderCell: (params) => {
      const src = params.value || '/assets/avatar.png';
      return <Avatar src={String(src)} alt={String(params.row?.nome || '')} sx={{ width: 40, height: 40 }} />;
    }
  },
  { field: 'matricula', headerName: 'Matrícula', width: 140 },
  { field: 'nome', headerName: 'Nome', flex: 1 },
  { field: 'email', headerName: 'E-mail', width: 220 },

  {
    field: 'actions',
    type: 'actions',
    headerName: 'Ações',
    width: 120,
    getActions: (params) => {
      const actions = [];

      if (userType === 'gestor') {
        actions.push(
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            onClick={() => handleEdit(params.row)}
          />
        );
      }

      actions.push(
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Excluir"
          onClick={() => handleDelete(Number(params.id))}
          disabled={userType !== 'gestor'}
        />
      );

      return actions;
    }
  }
];

  return (
    <Card>
      <CardHeader title="Alunos" action={(
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={() => setOpenAdd(true)}>Adicionar Aluno</Button>
        </Stack>
      )} />
      <CardContent>
        <Box sx={{ height: 420 }}>
          <DataGrid rows={rows} columns={columns} loading={loading} pageSizeOptions={[5, 10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }} />
        </Box>
      </CardContent>

      <ModalCadastroAluno
        open={openAdd}
        onClose={() => { setOpenAdd(false); setEditRow(null); }}
        idTurma={idTurma}
        editData={editRow}
        onSuccess={() => { setOpenAdd(false); setEditRow(null); fetch(); }}
      />

    </Card>
  );
}
