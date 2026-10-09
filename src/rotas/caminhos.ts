export const CAMINHOS = {
  inicio: "/",
  login: "/login",
  esqueciSenha: "/esqueci-minha-senha",
  esqueciSenhaSucesso: "/esqueci-minha-senha-sucesso",
  criarNovaSenha: "/criar-nova-senha/:uid/:token",
  novaSenhaSucesso: "/senha-alterada",
} as const;

export type Caminho = (typeof CAMINHOS)[keyof typeof CAMINHOS];
