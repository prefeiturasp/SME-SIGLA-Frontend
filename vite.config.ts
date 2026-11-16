import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";

function normalizarBase(valor: string | undefined): string {
  const base = (valor || "/").trim() || "/";
  if (base === "/") return "/";
  const comBarra = base.startsWith("/") ? base : `/${base}`;
  return comBarra.endsWith("/") ? comBarra : `${comBarra}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // process.env tem prioridade (Docker ARG/ENV no build). Arquivo .env e so fallback local.
  const basePath = process.env.VITE_BASE_PATH ?? env.VITE_BASE_PATH;
  const base = normalizarBase(basePath);

  console.info(
    `[vite] base = ${base} (VITE_BASE_PATH=${basePath ?? "(nao definido)"})`,
  );

  const environment = process.env.ENVIRONMENT ?? env.ENVIRONMENT ?? "";
  const alvoUrl = process.env.ALVO_URL ?? env.ALVO_URL ?? "";
  const locusUrl = process.env.LOCUS_URL ?? env.LOCUS_URL ?? "";

  return {
    base,
    define: {
      "import.meta.env.ENVIRONMENT": JSON.stringify(environment),
      "import.meta.env.ALVO_URL": JSON.stringify(alvoUrl),
      "import.meta.env.LOCUS_URL": JSON.stringify(locusUrl),
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
