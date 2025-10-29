"use client";

import React from "react";
import { Container } from "@mui/material";
import EscolaForm from "@/components/auth/escola/escola-form";

export default function EscolaPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <EscolaForm />
    </Container>
  );
}
