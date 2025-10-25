import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Inicio', href: paths.dashboard.overview, icon: 'house', matcher: { type: 'equals', href: '/dashboard' }, },
  { key: 'provas', title: 'Criação de Avaliações', href: paths.dashboard.criacao.root, icon: 'prova',
    matcher: { type: 'startsWith', href: paths.dashboard.criacao.root },
  },
  { key: 'alunos', title: 'Alunos', href: paths.dashboard.alunos, icon: 'users' },
  { key: 'settings', title: 'Configurações', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Conta', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
