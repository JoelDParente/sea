import type { Metadata } from 'next';
import TurmaDetailClient from '@/components/dashboard/turmas/TurmaDetailClient';
import { config } from '@/config';

export const metadata = { title: `Turma | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page({ params }: { params: { id: string } }) {
  return <TurmaDetailClient id={params.id} />;
}
