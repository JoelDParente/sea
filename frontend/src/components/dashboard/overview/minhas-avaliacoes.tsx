import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { SxProps } from '@mui/material/styles';
import axios from 'axios';
import { ProvaCard, Prova } from '@/components/dashboard/provas/provas-card';

// Props do componente
export interface MinhasAvaliacoesProps {
  provas?: Prova[];
  sx?: SxProps;
  professorId?: number | null;
}

// Componente principal
export function MinhasAvaliacoes({ provas: initialProvas = [], sx, professorId = null }: MinhasAvaliacoesProps): React.JSX.Element {
  const [provas, setProvas] = React.useState<Prova[]>(initialProvas);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const lastFetchedId = React.useRef<number | null>(null);
  const runsCountRef = React.useRef(0);

  React.useEffect(() => {
    runsCountRef.current += 1;
    console.debug('MinhasAvaliacoes useEffect run', { initialProvas, professorId, run: runsCountRef.current });

    // proteção temporária: evita loop infinito de fetchs
    if (runsCountRef.current > 20) {
      console.warn('MinhasAvaliacoes: muitas execuções de useEffect detectadas, abortando novos fetches.');
      return;
    }
    // Se já vierem provas via props, usa-as e não busca
    if (initialProvas && initialProvas.length > 0) {
      setProvas(initialProvas);
      return;
    }

    let cancelled = false;

    const fetchProvas = async () => {
      try {
        setLoading(true);
        setError(null);
        // Prioriza prop professorId, em seguida tenta buscar user/usuario no localStorage
        let idUsuario: number | null = null;
        if (typeof professorId === 'number' && professorId > 0) {
          idUsuario = professorId;
        } else {
          const userStr = localStorage.getItem('user') || localStorage.getItem('usuario');
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              idUsuario = user?.id || user?.id_usuario || null;
            } catch (e) {
              idUsuario = null;
            }
          }
        }

        const params = idUsuario ? `?id_professor=${idUsuario}` : '';

        // evita refetchs contínuos para o mesmo professor se já temos provas
        if (idUsuario && lastFetchedId.current === idUsuario && provas.length > 0) {
          if (!cancelled) setLoading(false);
          return;
        }
        const url = `http://localhost/sea/backend/controllers/listarProvasProfessorController.php${params}`;

        const res = await axios.get(url);
        const data = res.data as Array<any>;

        // Mapear para o formato utilizado por ProvaCard
        const mapped: Prova[] = data.map((p) => ({
          id: String(((p.id_prova ?? p.id) || '')),
          title: p.titulo ?? `Prova ${p.id_prova}`,
          description: p.serie ? `Série ${p.serie}` : (p.id_disciplina ? `Disciplina ${p.id_disciplina}` : ''),
          logo: '',
          installs: 0,
          updatedAt: p.data_criacao ? new Date(p.data_criacao) : new Date(),
        }));

        if (cancelled) return;

        // atualiza referência de último fetch bem-sucedido
        lastFetchedId.current = idUsuario;

        // evita atualizações de state redundantes que causam re-renders
        setProvas((prev) => {
          try {
            const a = JSON.stringify(prev);
            const b = JSON.stringify(mapped);
            if (a === b) return prev;
          } catch {
            // em caso de erro no stringify, apenas atualiza
          }
          console.debug('MinhasAvaliacoes setProvas updating', { prevLength: prev.length, newLength: mapped.length });
          return mapped;
        });
      } catch (err: any) {
        console.error('Erro ao buscar provas:', err);
        setError('Não foi possível carregar as avaliações.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProvas();

    return () => {
      cancelled = true;
    };
  }, [initialProvas, professorId]);

  return (
    <Card sx={{ ...sx, mt: 4, boxShadow: "rgba(149, 157, 165, 0.4) 0px 0px 24px" }}>
      <CardHeader
        title="Minhas Avaliações"
        sx={{
          pb: 1,
          '& .MuiCardHeader-title': { fontSize: '1.25rem', fontWeight: 600 },
        }}
      />

      <Box sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {provas.length > 0 ? (
              provas.map((prova) => (
                <Box key={prova.id}>
                  <ProvaCard
                    prova={prova}
                    onDelete={async (id) => {
                      try {
                        if (!confirm('Deseja realmente deletar esta avaliação?')) return;
                        const res = await axios.delete(`http://localhost/sea/backend/controllers/ProvaController.php?id_prova=${id}`);
                        if (res.data?.sucesso) {
                          setProvas((prev) => prev.filter((p) => p.id !== id));
                        } else {
                          alert('Não foi possível excluir a avaliação.');
                        }
                      } catch (err) {
                        console.error('Erro ao excluir prova', err);
                        alert('Erro ao excluir a avaliação. Veja o console.');
                      }
                    }}
                  />
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary', fontStyle: 'italic' }}>
                Nenhuma avaliação criada ainda.
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Card>
  );
}