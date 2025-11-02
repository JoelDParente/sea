// src/services/questaoService.ts
export interface Alternativa {
  id_alternativa: string;
  id_questao?: number;
  texto: string;
  correta: boolean;
}

export interface Questao {
  id_assunto: number;
  uid_professor: number;
  enunciado: string;
  resposta_correta: string;
  tipo: string;
  publico: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Cria uma nova questão e retorna o ID criado.
 */
export async function criarQuestao(questao: Questao): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE}/questaoController.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questao),
    });

    const data = await res.json();
    if (!data.success) throw new Error("Erro ao criar questão");
    return data.id_questao;
  } catch (error) {
    console.error("Erro ao criar questão:", error);
    return null;
  }
}

/**
 * Cria todas as alternativas associadas a uma questão.
 */
export async function criarAlternativas(alternativas: Alternativa[]): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/alternativaController.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alternativas),
    });

    const data = await res.json();
    return !!data.success;
  } catch (error) {
    console.error("Erro ao criar alternativas:", error);
    return false;
  }
}

/**
 * Função principal que salva uma questão com suas alternativas.
 */
export async function salvarQuestaoCompleta(
  questao: Questao,
  alternativas: Alternativa[]
): Promise<boolean> {
  const idQuestao = await criarQuestao(questao);

  if (!idQuestao) return false;

  const alternativasComId = alternativas.map((alt) => ({
    ...alt,
    id_questao: idQuestao,
  }));

  return await criarAlternativas(alternativasComId);
}
