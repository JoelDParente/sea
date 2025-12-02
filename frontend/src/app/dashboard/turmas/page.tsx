'use client';

import * as React from 'react';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { TurmasTable } from '@/components/dashboard/turmas/turmas-table';
import type { Turmas } from '@/components/dashboard/turmas/turmas-table';
import ModalCadastroTurma from "@/components/dashboard/turmas/ModalCadastroTurma";
import ModalCadastroAluno from '@/components/dashboard/turmas/ModalCadastroAluno';

export default function Page(): React.JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [turmasState, setTurmasState] = useState<Turmas[]>([]);
  const [openAlunoModal, setOpenAlunoModal] = useState(false);
  const [selectedTurmaId, setSelectedTurmaId] = useState<number | null>(null);

  const API_BASE = "http://localhost/sea/backend/controllers";

  const fetchTurmas = async () => {
    const id_escola = localStorage.getItem('id_escola');
    const res = await fetch(`${API_BASE}/TurmaController.php?id_escola=${id_escola}`);
    const data = await res.json();
    const rows = data.map((t:any) => ({ id: t.id_turma.toString(), foto: '', nome: t.nome_turma, email: '', matricula: '', createdAt: new Date() }));
    setTurmasState(rows);
  }

  useEffect(() => {
    fetchTurmas();

    const listener = (e:any) => {
      const id = Number(e.detail.id_turma);
      setSelectedTurmaId(id);
      setOpenAlunoModal(true);
    }
    window.addEventListener('openAddAluno', listener);
    return () => window.removeEventListener('openAddAluno', listener);
  }, []);

  const handleCreate = async (payload: any) => {
    await fetch(`${API_BASE}/TurmaController.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setOpenModal(false);
    await fetchTurmas();
  };

  const handleAlunoSaved = async () => {
    setOpenAlunoModal(false);
  }
  const page = 0;
  const rowsPerPage = 5;

  const paginatedTurmas = applyPagination(turmasState, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Turmas</Typography>
        </Stack>

        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            Adicionar Turma
          </Button>
        </div>
      </Stack>

      <TurmasTable
        count={paginatedTurmas.length}
        page={page}
        rows={paginatedTurmas}
        rowsPerPage={rowsPerPage}
      />

      <ModalCadastroTurma
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreate}
      />
      <ModalCadastroAluno open={openAlunoModal} onClose={() => setOpenAlunoModal(false)} idTurma={selectedTurmaId ?? 0} onSuccess={handleAlunoSaved} />
    </Stack>
  );
}

function applyPagination(rows: Turmas[], page: number, rowsPerPage: number): Turmas[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}