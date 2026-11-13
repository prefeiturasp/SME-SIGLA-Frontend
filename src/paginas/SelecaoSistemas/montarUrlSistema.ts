export interface OpcoesUrlSistema {
  environment?: string;
  urlLocal?: string;
  token?: string | null;
  usuario?: string | null;
  nomeUsuario?: string | null;
}

/** Em ENVIRONMENT=local usa a URL local e anexa TOKEN, USUARIO e NOME_USUARIO na query. */
export function montarUrlSistema(
  urlPadrao: string,
  opcoes: OpcoesUrlSistema,
): string {
  if (opcoes.environment !== "local" || !opcoes.urlLocal) {
    return urlPadrao;
  }

  const params = new URLSearchParams();
  if (opcoes.token) params.set("TOKEN", opcoes.token);
  if (opcoes.usuario) params.set("USUARIO", opcoes.usuario);
  if (opcoes.nomeUsuario) params.set("NOME_USUARIO", opcoes.nomeUsuario);

  const query = params.toString();
  if (!query) return opcoes.urlLocal;

  const separador = opcoes.urlLocal.includes("?") ? "&" : "?";
  return `${opcoes.urlLocal}${separador}${query}`;
}

export function obterEnv(chave: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const valor = window.__ENV__?.[chave];
  return valor || undefined;
}
