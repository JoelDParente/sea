export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    turmas: '/dashboard/turmas',
    professor: '/dashboard/professores',
    criacao: {
      root: '/dashboard/criacao',
      prova: '/dashboard/criacao/prova',
      questao: '/dashboard/criacao/questao',
      minhasQuestoes: '/dashboard/criacao/minhas-questoes',
    },
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
