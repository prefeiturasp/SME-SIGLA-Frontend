# SME-SIGLA-Frontend

Frontend do sistema **SIGLA**.

## Stack

React 19 · Vite · TypeScript · Ant Design (layout/UI) · Axios · Zod ·
Jest + Testing Library · ícones do `@mui/icons-material` · styled-components.

## Comandos

```bash
npm install       # instala dependências
npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # typecheck + build de produção
npm run lint      # ESLint
npm test          # testes (Jest)
npm run coverage  # testes com cobertura
```

Copie `.env.sample` para `.env` e ajuste `VITE_SIGLA_API_URL`.

## Estrutura de pastas

```
src/
├── app/            # bootstrap: main.tsx, App.tsx, providers.tsx
├── estilos/        # tokens, tema do antd, CSS global
│   ├── tokens/
│   ├── temas/
│   ├── global/
│   └── compartilhados/
├── componentes/    # componentes comuns e reutilizáveis
│   └── layout/     # LayoutBase
├── paginas/        # cada tela concentra o que é dela
│   └── Login/
├── rotas/          # todas as rotas em um lugar (+ caminhos.ts)
├── servicos/       # http.ts (axios + interceptors) e recursos/ por domínio
│   └── recursos/
└── hooks/          # hooks compartilhados
```

Fluxo típico: **Rota → Página → Hook da página → Serviço HTTP → API**, com a UI
comum vindo de `componentes/` e o tema de `estilos/`.
