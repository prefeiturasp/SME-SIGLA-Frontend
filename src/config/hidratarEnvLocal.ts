/**
 * Expõe no window.__ENV__ as variáveis locais do Vite (sem prefixo VITE_).
 * Só deve ser importado no entry (main), para o Jest não carregar import.meta.
 */
export function hidratarEnvLocal(): void {
  if (typeof window === "undefined") return;

  window.__ENV__ = {
    ...(window.__ENV__ ?? {}),
    ENVIRONMENT:
      import.meta.env.ENVIRONMENT || window.__ENV__?.ENVIRONMENT || "",
    ALVO_URL: import.meta.env.ALVO_URL || window.__ENV__?.ALVO_URL || "",
    LOCUS_URL: import.meta.env.LOCUS_URL || window.__ENV__?.LOCUS_URL || "",
  };
}
