"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { paths } from '@/paths';

type Aluno = {
  id_aluno: number;
  id_turma: number;
  matricula: string;
  nome: string;
  email?: string;
  notas?: { b1: number; b2: number; b3: number; b4: number };
};

const alunosMock: Aluno[] = [
  { id_aluno: 1, id_turma: 1, matricula: 'A001', nome: 'João Silva', email: 'joao.silva@ex.com', notas: { b1: 7.5, b2: 8.0, b3: 6.5, b4: 8.0 } },
  { id_aluno: 2, id_turma: 1, matricula: 'A002', nome: 'Maria Santos', email: 'maria.santos@ex.com', notas: { b1: 9.0, b2: 8.5, b3: 9.0, b4: 9.5 } },
  { id_aluno: 3, id_turma: 2, matricula: 'A003', nome: 'Pedro Lima', email: 'pedro.lima@ex.com', notas: { b1: 6.0, b2: 6.5, b3: 7.0, b4: 6.5 } },
  { id_aluno: 4, id_turma: 2, matricula: 'A004', nome: 'Ana Rocha', email: 'ana.rocha@ex.com', notas: { b1: 8.0, b2: 7.5, b3: 8.0, b4: 7.0 } },
  { id_aluno: 5, id_turma: 3, matricula: 'A005', nome: 'Lucas Pereira', email: 'lucas.per@ex.com', notas: { b1: 7.0, b2: 7.0, b3: 7.5, b4: 8.0 } }
];

export default function TurmaDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const turmaId = Number(id);

  const [bimestre, setBimestre] = React.useState<number>(1);

  const alunos = alunosMock.filter((a) => a.id_turma === turmaId);

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button startIcon={<ArrowLeft />} onClick={() => router.push(paths.dashboard.turmas)}>
          Voltar
        </Button>
        <Typography variant="h5">Alunos da Turma {turmaId}</Typography>

        {/* Select fora da tabela, alinhado à direita */}
        <Box>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="bimestre-label">Bimestre</InputLabel>
            <Select
              labelId="bimestre-label"
              value={String(bimestre)}
              label="Bimestre"
              onChange={(e) => setBimestre(Number(e.target.value))}
            >
              <MenuItem value={1}>1º Bimestre</MenuItem>
              <MenuItem value={2}>2º Bimestre</MenuItem>
              <MenuItem value={3}>3º Bimestre</MenuItem>
              <MenuItem value={4}>4º Bimestre</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Matrícula</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell align="center">Mensal</TableCell>
              <TableCell align="center">Bimestral</TableCell>
              <TableCell align="center">Média</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos.map((aluno) => {
              const notas = aluno.notas ?? { b1: 0, b2: 0, b3: 0, b4: 0 };

              // mensal: nota do bimestre selecionado
              const mensal = notas[`b${bimestre}` as keyof typeof notas] ?? 0;

              // bimestral: média entre o bimestre selecionado e o anterior (se existir).
              // Ex: se bimestre=2, bimestral = (b1 + b2)/2. Se bimestre=1, usamos apenas b1.
              const prev = bimestre > 1 ? notas[`b${bimestre - 1}` as keyof typeof notas] ?? 0 : null;
              const bimestral = prev !== null ? ((prev + mensal) / 2).toFixed(2) : String(mensal);

              // média geral: média das notas existentes (b1..b4)
              const allNotes = [notas.b1, notas.b2, notas.b3, notas.b4].filter((n) => n !== undefined && n !== null);
              const mediaGeral = allNotes.length ? (allNotes.reduce((s, v) => s + v, 0) / allNotes.length).toFixed(2) : '0.00';

              return (
                <TableRow key={aluno.id_aluno}>
                  <TableCell>{aluno.matricula}</TableCell>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell>{aluno.email}</TableCell>
                  <TableCell align="center">{mensal}</TableCell>
                  <TableCell align="center">{bimestral}</TableCell>
                  <TableCell align="center">{mediaGeral}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
