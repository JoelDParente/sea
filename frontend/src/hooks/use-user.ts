import * as React from 'react';
import {jwtDecode} from 'jwt-decode';

import type { UserContextValue } from '@/contexts/user-context';
import { UserContext } from '@/contexts/user-context';

export interface DecodedToken {
  id?: string;
  name?: string;
  email?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export function useUser(): UserContextValue & { tokenData: DecodedToken | null } {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const token = context?.token ?? null;

  let tokenData: DecodedToken | null = null;

  if (token) {
    try {
      tokenData = jwtDecode(token);
    } catch {
      tokenData = null;
    }
  }

  return {
    ...context,
    tokenData, // ← agora disponível diretamente
  };
}
