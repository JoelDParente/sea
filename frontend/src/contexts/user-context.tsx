'use client';

import * as React from 'react';

import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';

export interface UserContextValue {
  token: null;
  user: User | null;
  error: string | null;
  isLoading: boolean;

  checkSession?: () => Promise<void>;

  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();

      if (error) {
        logger.error(error);
        setState(prev => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
        return;
      }

      setState(prev => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
    } catch (error) {
      logger.error(error);
      setState(prev => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, []);

  const setUser = React.useCallback((value: React.SetStateAction<User | null>) => {
    setState(prev => ({
      ...prev,
      user: typeof value === "function" ? value(prev.user) : value,
    }));
  }, []);

  React.useEffect(() => {
    checkSession().catch(logger.error);
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        token: null,
        checkSession,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;