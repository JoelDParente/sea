"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

interface Escola {
  nome_escola: string;
  email: string;
  logo?: string;
  
  bairro?: string;
  rua?: string;
  num?: string;
  estado?: string;
  inep?: string;
  telefone?: string;
}

export default function EscolaForm() {
  const [escola, setEscola] = useState<Escola>({
    nome_escola: "",
    email: "",
    logo: "",
    
    bairro: "",
    rua: "",
    num: "",
    estado: "",
    inep: "",
    telefone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEscola({ ...escola, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Dados da escola:", escola);
    alert("Escola cadastrada com sucesso!");
    // 🔜 Aqui futuramente chamaremos o endpoint: POST /api/escolas
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 5,
        borderRadius: 4,
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        Cadastro da Escola
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Nome da Escola"
              name="nome_escola"
              value={escola.nome_escola}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={{xs: 12, md:6}}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              value={escola.email}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={{xs: 12, md:6}}>
            <TextField
              fullWidth
              label="INEP"
              name="inep"
              value={escola.inep}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12, md:6}}>
            <TextField
              fullWidth
              label="Telefone"
              name="telefone"
              value={escola.telefone}
              onChange={handleChange}
            />
          </Grid>

          

          <Grid size={{xs: 12, md:6}}>
            <TextField
              fullWidth
              label="Bairro"
              name="bairro"
              value={escola.bairro}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12, md:6}}>
            <TextField
              fullWidth
              label="Rua"
              name="rua"
              value={escola.rua}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12, md:6}}>
            <TextField
              fullWidth
              label="Número"
              name="num"
              value={escola.num}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs: 12, md:6}}>
            <TextField
              fullWidth
              label="Estado"
              name="estado"
              value={escola.estado}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="URL da Logo (opcional)"
              name="logo"
              value={escola.logo}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: "right" }}>
          <Button type="submit" variant="contained" color="primary">
            Cadastrar Escola
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
