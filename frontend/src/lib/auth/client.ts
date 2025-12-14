'use client';

import type { User } from '@/types/user';
import axios from "axios";

const API_BASE = "http://localhost/sea/backend/controllers"; // ajuste conforme seu projeto

function generateToken(): string {
  const arr = new Uint8Array(12);
  globalThis.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
  const { email, password } = params;

  try {
    const response = await axios.post(`${API_BASE}/Login.php`, {
      email,
      senha: password, // note que o backend espera "senha"
    });

    console.log(response);

    // Sucesso — guardar token retornado pelo backend
    const { token, user, escola } = response.data;
    localStorage.setItem("jwt", token);
    localStorage.setItem("user", JSON.stringify(user));

    if (escola) {
      localStorage.setItem("escola", JSON.stringify(escola));
    } else {
      localStorage.removeItem("escola");
    }

    return {};
  } catch (error: any) {
    // Tratar erros do backend
    if (error.response?.data?.error) {
      return { error: error.response.data.error };
    }
    return { error: "Erro ao conectar com o servidor." };
  }
}


  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'A senha não foi redefinida' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Senha não atualizada' };
  }

async getUser(): Promise<{ data?: User | null; error?: string }> {
  try {
    const token = localStorage.getItem("jwt");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      return { data: null };
    }

    // garante que userData é JSON válido
    const parsed = JSON.parse(userData);
    return { data: parsed };
  } catch {
    // se der erro no JSON.parse, limpa o storage e retorna null
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    return { data: null };
  }
}



async signOut(): Promise<{ error?: string }> {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
  localStorage.removeItem('escola');
  return {};
}
}

export const authClient = new AuthClient();
