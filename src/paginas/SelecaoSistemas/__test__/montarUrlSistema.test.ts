import { montarUrlSistema } from "../montarUrlSistema";

describe("montarUrlSistema", () => {
  it("mantém a URL padrão fora do ambiente local", () => {
    expect(
      montarUrlSistema("/alvo/", {
        environment: "qa",
        urlLocal: "http://localhost:5174/",
        token: "token",
      }),
    ).toBe("/alvo/");
  });

  it("mantém a URL padrão sem ENVIRONMENT=local", () => {
    expect(
      montarUrlSistema("/locus/", {
        urlLocal: "http://localhost:5175/",
        token: "token",
      }),
    ).toBe("/locus/");
  });

  it("usa a URL local sem query quando não há sessão", () => {
    expect(
      montarUrlSistema("/alvo/", {
        environment: "local",
        urlLocal: "http://localhost:5174/",
      }),
    ).toBe("http://localhost:5174/");
  });

  it("anexa TOKEN, USUARIO e NOME_USUARIO na query em ambiente local", () => {
    const url = montarUrlSistema("/alvo/", {
      environment: "local",
      urlLocal: "http://localhost:5174/",
      token: "abc",
      usuario: "1234567",
      nomeUsuario: "Ana Silva",
    });

    const parsed = new URL(url);
    expect(parsed.origin + parsed.pathname).toBe("http://localhost:5174/");
    expect(parsed.searchParams.get("TOKEN")).toBe("abc");
    expect(parsed.searchParams.get("USUARIO")).toBe("1234567");
    expect(parsed.searchParams.get("NOME_USUARIO")).toBe("Ana Silva");
  });

  it("preserva query já existente na URL local", () => {
    const url = montarUrlSistema("/alvo/", {
      environment: "local",
      urlLocal: "http://localhost:5174/?foo=1",
      token: "abc",
    });

    expect(url).toContain("foo=1");
    expect(url).toContain("TOKEN=abc");
    expect(url).toMatch(/\?foo=1&TOKEN=abc|&TOKEN=abc/);
  });
});
