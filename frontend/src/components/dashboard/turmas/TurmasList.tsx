'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Card, CardHeader, CardContent, Stack, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import ModalCadastroTurma from './ModalCadastroTurma';
import { Snackbar, Alert } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

export default function TurmasList(): React.JSX.Element {
  const router = useRouter();
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [openCreate, setOpenCreate] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [navigatingId, setNavigatingId] = React.useState<number | null>(null);

  const [snackbarSeverity, setSnackbarSeverity] =
    React.useState<'success' | 'error' | 'info' | 'warning'>('info');

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning' = 'info'
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchTurmas = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost/sea/backend/controllers/TurmaController.php');
      setRows(Array.isArray(res.data) ? res.data.map((r: any) => ({ id: r.id_turma, ...r })) : []);
    } catch (err) {
      console.error('Erro ao buscar turmas', err);
      showSnackbar('Erro ao buscar turmas', 'error');
    }
    finally { setLoading(false); }
  }, []);

  React.useEffect(() => { fetchTurmas(); }, [fetchTurmas]);

  const handleCreate = async (data: any) => {
    try {
      await axios.post('http://localhost/sea/backend/controllers/TurmaController.php', data);
      setOpenCreate(false);
      showSnackbar('Turma criada com sucesso', 'success');
      fetchTurmas();
    } catch (err) {
      console.error(err);
      showSnackbar('Erro ao criar turma', 'error');
    }
  };


  const handleDelete = async (id: number) => {
    if (!confirm('Confirmar exclusão desta turma?')) return;

    try {
      await axios.delete(
        `http://localhost/sea/backend/controllers/TurmaController.php?id_turma=${id}`
      );
      showSnackbar('Turma excluída com sucesso', 'success');
      fetchTurmas();
    } catch (err) {
      console.error(err);
      showSnackbar('Erro ao excluir turma', 'error');
    }
  };


  const columns: GridColDef[] = [
    { field: 'nome_turma', headerName: 'Turma', flex: 1 },
    { field: 'serie', headerName: 'Série', width: 160 },
    { field: 'turno', headerName: 'Turno', width: 140 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 140,
      getActions: (params) => [
<GridActionsCellItem
  icon={
    navigatingId === Number(params.id)
      ? <CircularProgress size={18} />
      : <VisibilityIcon />
  }
  label="Ver"
  onClick={() => {
    setNavigatingId(Number(params.id));
    router.push(`/dashboard/turmas/${params.id}`);
  }}
  color="inherit"
/>,
        <GridActionsCellItem icon={<EditIcon />} label="Editar" onClick={() => setOpenCreate(true)} showInMenu={false} color='inherit' />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Excluir" onClick={() => handleDelete(Number(params.id))} showInMenu={false} color='inherit' />,
      ],
    },
  ];

  const filtered = rows.filter((r) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (String(r.nome_turma || '').toLowerCase().includes(s) || String(r.serie || '').toLowerCase().includes(s));
  });

  return (
    <Card>
      <CardHeader
        title="Turmas"
        subheader="Gerencie suas turmas e alunos"
        action={(
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField size="small" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenCreate(true)}>Criar Turma</Button>
          </Stack>
        )}
      />
      <CardContent>
        <Box sx={{ height: 520 }}>
          <DataGrid rows={filtered} columns={columns} loading={loading} pageSizeOptions={[5, 10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }} />
        </Box>
      </CardContent>

      <ModalCadastroTurma open={openCreate} onClose={() => setOpenCreate(false)} onSubmit={handleCreate} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Card>
  );
}
