'use client';

import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
  Alert
} from '@mui/material';
import { Upload } from '@phosphor-icons/react';

interface CorrecaoResponse {
  success: boolean;
  message?: string;
  resultado?: {
    acertos: number;
    total: number;
    percentual: number;
    detalhes: Array<{
      questao: number;
      correta: boolean;
      comentario?: string;
    }>;
  };
}

export function CorrecaoClient(): React.JSX.Element {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [resultado, setResultado] = React.useState<CorrecaoResponse['resultado'] | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setError(null);
      setResultado(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Por favor, selecione um arquivo para corrigir.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('prova', selectedFile);

    try {
      // TODO: Substituir URL pela real quando tivermos o endpoint Python
      const response = await fetch('http://localhost:5000/corrigir', {
        method: 'POST',
        body: formData
      });

      const data: CorrecaoResponse = await response.json();

      if (data.success) {
        setResultado(data.resultado || null);
      } else {
        setError(data.message || 'Erro ao processar a correção.');
      }
    } catch (err) {
      setError('Erro ao comunicar com o serviço de correção. Tente novamente.');
      console.error('Erro na correção:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" gutterBottom>
        Correção de Provas
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Faça upload da prova para correção automática usando IA.
      </Typography>

      <Card>
        <CardContent>
          <Stack spacing={3} alignItems="flex-start">
            <Box>
              <input
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
                id="prova-upload"
                type="file"
                onChange={handleFileSelect}
              />
              <label htmlFor="prova-upload">
                <Button
                  component="span"
                  variant="contained"
                  startIcon={<Upload />}
                  disabled={isLoading}
                >
                  Selecionar Arquivo
                </Button>
                   
              </label>
			  
              {selectedFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Arquivo selecionado: {selectedFile.name}
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Iniciar Correção'
              )}
            </Button>

            {error && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            )}

            {resultado && (
              <Box sx={{ width: '100%' }}>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Correção concluída com sucesso!
                </Alert>
                
                <Typography variant="h6" gutterBottom>
                  Resultado
                </Typography>
                
                <Stack spacing={1}>
                  <Typography>
                    Acertos: {resultado.acertos} de {resultado.total}
                  </Typography>
                  <Typography>
                    Percentual: {resultado.percentual}%
                  </Typography>
                  
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Detalhes por Questão
                  </Typography>
                  
                  {resultado.detalhes.map((detalhe) => (
                    <Card 
                      key={detalhe.questao}
                      sx={{ 
                        bgcolor: detalhe.correta ? 'success.light' : 'error.light',
                        color: 'common.white',
                        p: 2
                      }}
                    >
                      <Typography variant="subtitle1">
                        Questão {detalhe.questao}: {detalhe.correta ? 'Correta' : 'Incorreta'}
                      </Typography>
                      {detalhe.comentario && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {detalhe.comentario}
                        </Typography>
                      )}
                    </Card>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}