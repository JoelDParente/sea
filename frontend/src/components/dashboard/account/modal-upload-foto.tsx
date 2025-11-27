'use client';

import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack
} from '@mui/material';
import axios from "axios";
import { useUser } from '@/hooks/use-user';

interface Props {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function ModalUploadFoto({ open, onClose, onUpload }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useUser();  // ← dados do JWT


async function enviarFoto(file: File, userId: any) {
  const formData = new FormData();
  formData.append("foto", file);
  formData.append("id_usuario", userId);

  try {
    const response = await axios.post(
      "http://localhost/sea/backend/controllers/uploadFoto.php",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Response:", response.data);

    return response.data; // <-- AQUI você pega o JSON do backend

  } catch (error) {
    console.error("Erro no upload:", error);
    return null;
  }
}

async function handleUpload(file: File) {
  const result = await enviarFoto(file, user?.id_usuario);

  if (result?.success) {
    console.log("URL da nova foto:", result.url);
  } else {
    console.log("Erro ao enviar foto:", result);
  }
}


  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          width: 400,
          mx: 'auto',
          mt: '15vh',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Enviar nova foto
        </Typography>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />

        <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            variant="contained"
            disabled={!selectedFile}
            onClick={() => selectedFile && handleUpload(selectedFile)}
          >
            Enviar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}