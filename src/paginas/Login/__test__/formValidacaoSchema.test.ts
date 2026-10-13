import {
  schemaEsqueceuSenha,
  schemaLogin,
  schemaNovaSenha,
} from "../formValidacaoSchema";

const senhaValida = "Abcdef1!";

describe("schemaLogin", () => {
  it("aceita RF numerico e senha preenchida", () => {
    expect(
      schemaLogin.safeParse({ usuario: "1234567", senha: "abc" }).success,
    ).toBe(true);
  });

  it("exige RF numerico e senha", () => {
    const resultado = schemaLogin.safeParse({ usuario: "", senha: "" });
    expect(resultado.success).toBe(false);
    if (resultado.success) return;

    expect(resultado.error.flatten().fieldErrors.usuario).toContain(
      "Insira um RF ou e-mail válido",
    );
    expect(resultado.error.flatten().fieldErrors.senha).toContain(
      "Campo obrigatório",
    );
  });

  it("rejeita RF com letras", () => {
    const resultado = schemaLogin.safeParse({
      usuario: "12a",
      senha: "abc",
    });
    expect(resultado.success).toBe(false);
    if (resultado.success) return;
    expect(resultado.error.flatten().fieldErrors.usuario).toContain(
      "RF deve conter apenas números",
    );
  });
});

describe("schemaEsqueceuSenha", () => {
  it("aceita RF numerico e e-mail", () => {
    expect(schemaEsqueceuSenha.safeParse({ rf: "123" }).success).toBe(true);
    expect(
      schemaEsqueceuSenha.safeParse({ rf: "ana@sme.prefeitura.sp.gov.br" })
        .success,
    ).toBe(true);
  });

  it("rejeita campo vazio, RF misturado com letra e e-mail invalido", () => {
    expect(schemaEsqueceuSenha.safeParse({ rf: "" }).success).toBe(false);
    expect(schemaEsqueceuSenha.safeParse({ rf: "12a" }).success).toBe(false);
    expect(schemaEsqueceuSenha.safeParse({ rf: "ana@" }).success).toBe(false);
  });
});

describe("schemaNovaSenha", () => {
  it("aceita senhas iguais que cumprem as regras", () => {
    expect(
      schemaNovaSenha.safeParse({
        nova_senha: senhaValida,
        confirmar_senha: senhaValida,
      }).success,
    ).toBe(true);
  });

  it("exige os dois campos e senhas iguais", () => {
    const vazio = schemaNovaSenha.safeParse({
      nova_senha: "",
      confirmar_senha: "",
    });
    expect(vazio.success).toBe(false);

    const diferentes = schemaNovaSenha.safeParse({
      nova_senha: senhaValida,
      confirmar_senha: "Outra1!",
    });
    expect(diferentes.success).toBe(false);
    if (diferentes.success) return;
    expect(diferentes.error.flatten().fieldErrors.confirmar_senha).toContain(
      "As senhas não coincidem",
    );
  });

  it("rejeita senha fora das regras", () => {
    expect(
      schemaNovaSenha.safeParse({
        nova_senha: "curta",
        confirmar_senha: "curta",
      }).success,
    ).toBe(false);
    expect(
      schemaNovaSenha.safeParse({
        nova_senha: "Abcdef1! ",
        confirmar_senha: "Abcdef1! ",
      }).success,
    ).toBe(false);
    expect(
      schemaNovaSenha.safeParse({
        nova_senha: "Abcdef1!á",
        confirmar_senha: "Abcdef1!á",
      }).success,
    ).toBe(false);
  });
});
