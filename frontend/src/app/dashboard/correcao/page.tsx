import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { CorrecaoClient } from '@/components/dashboard/correcao/CorrecaoClient';

export const metadata = { 
  title: `Correção de Provas | ${config.site.name}`,
  description: 'Correção automática de provas'
} satisfies Metadata;

export default function CorrecaoPage(): React.JSX.Element {
  return <CorrecaoClient />;
}