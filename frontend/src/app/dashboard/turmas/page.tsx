import type { Metadata } from 'next';
import TurmasClient from '@/components/dashboard/turmas/TurmasClient';
import { config } from '@/config';

export const metadata = { title: `Turmas | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page() {
  return <TurmasClient />;
}