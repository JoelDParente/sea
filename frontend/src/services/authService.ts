const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, senha: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  if (!res.ok) {
    throw new Error('Credenciais inválidas');
  }

  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data;
}

export function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
