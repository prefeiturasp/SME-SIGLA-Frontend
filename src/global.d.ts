/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_SIGLA_API_URL?: string;
  readonly VITE_ADMIN_USUARIOS_API_URL?: string;
  readonly VITE_BASE_PATH?: string;
  /** Somente uso local: quando "local", usa ALVO_URL/LOCUS_URL com query de sessão. */
  readonly ENVIRONMENT?: string;
  readonly ALVO_URL?: string;
  readonly LOCUS_URL?: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  __ENV__?: Record<string, string>;
}
