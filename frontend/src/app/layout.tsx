import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { ThemeContextProvider } from '@/contexts/theme-context';
import type { Metadata } from 'next';
import { config } from '@/config';


export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: `Bem Vindo | ${config.site.name}`,
  description: 'Monte uma nova prova completa com cabeçalho e slots de questões.',
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="pt-br">
      <body>
        <LocalizationProvider>
          <UserProvider>
            <ThemeContextProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </ThemeContextProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
