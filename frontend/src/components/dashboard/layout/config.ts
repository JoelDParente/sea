import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Inicio', href: paths.dashboard.overview, icon: 'house', matcher: { type: 'equals', href: '/dashboard' }, },
  { key: 'provas', title: 'Criação de Avaliações', href: paths.dashboard.criacao.root, icon: 'prova',
    matcher: { type: 'startsWith', href: paths.dashboard.criacao.root },
  },
  { key: 'correcao', title: 'Correção', href: paths.dashboard.correcao, icon: 'check-square' },
  { key: 'turmas', title: 'Turmas', href: paths.dashboard.turmas, icon: 'chalkboard' },
  { key: 'professor', title: 'Professores', href: paths.dashboard.professor, icon: 'users' },
  { key: 'settings', title: 'Configurações', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Conta', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
