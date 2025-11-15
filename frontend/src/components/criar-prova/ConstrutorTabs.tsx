"use client";

import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export default function ConstrutorTabs({ value, onChange }: Props) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs value={value} onChange={(_, v) => onChange(v)}>
        <Tab label="Questões Disponíveis" />
        <Tab label="Questões Selecionadas" />
      </Tabs>
    </Box>
  );
}
