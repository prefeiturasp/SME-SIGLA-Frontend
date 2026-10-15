import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse } from "axios";
import type { ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { tema } from "@/estilos/tokens/tokens";
import { postEsqueceuSenha } from "@/servicos/recursos/login/esqueceuSenha";
import { postLogin } from "@/servicos/recursos/login";
import { postNovaSenha } from "@/servicos/recursos/login/novaSenha";
import { AvisoImportanteLogin } from "../components/AvisoImportanteLogin";
import { CabecalhoLogin } from "../components/CabecalhoLogin";
import { EsqueceuSenhaSucesso } from "../EsqueceuSenhaSucesso";
import { EsqueceuSenhaTela } from "../EsqueceuSenhaTela";
import { Login } from "../index";
import { NovaSenhaSucesso } from "../NovaSenhaSucesso";
import { NovaSenhaTela } from "../NovaSenhaTela";

jest.mock("@/servicos/recursos/login", () => ({
  postLogin: jest.fn(),
}));

jest.mock("@/servicos/recursos/login/esqueceuSenha", () => ({
  postEsqueceuSenha: jest.fn(),
}));

jest.mock("@/servicos/recursos/login/novaSenha", () => ({
  postNovaSenha: jest.fn(),
}));

const senhaValida = "Abcdef1!";

function erroAxios(status: number, detail: string) {
  return new AxiosError("falha", "ERR", undefined, undefined, {
    status,
    data: { detail },
    statusText: "erro",
    headers: {},
    config: {},
  } as AxiosResponse);
}

function renderTela(
  ui: ReactElement,
  rota = "/login",
  estado?: unknown,
) {
  const cliente = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={cliente}>
      <ThemeProvider theme={tema}>
        <MemoryRouter
          initialEntries={[{ pathname: rota, state: estado }]}
        >
          <Routes>
            <Route path="/login" element={ui} />
            <Route path="/esqueci-minha-senha" element={ui} />
            <Route path="/esqueci-minha-senha-sucesso" element={ui} />
            <Route path="/criar-nova-senha/:uid/:token" element={ui} />
            <Route path="/sem-token" element={ui} />
            <Route path="/senha-alterada" element={ui} />
            <Route path="/" element={<h1>Inicio</h1>} />
            <Route path="/destino-login" element={<h1>Tela de login</h1>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.mocked(postLogin).mockReset();
  });

  it("mostra erro de campo obrigatorio ao enviar vazio", async () => {
    const usuario = userEvent.setup();
    renderTela(<Login />);

    await usuario.click(screen.getByRole("button", { name: "Acessar" }));

    expect(
      await screen.findByText("Insira um RF ou e-mail válido"),
    ).toBeInTheDocument();
    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });

  it("entra e guarda o usuario quando o login e aceito", async () => {
    const usuario = userEvent.setup();
    jest.mocked(postLogin).mockReturnValue({
      response: Promise.resolve({
        token: "token",
        codigoRf: "1234567",
        usuario: { id: "1", first_name: "Ana" },
      }),
      abort: jest.fn(),
    });

    renderTela(<Login />);
    await usuario.type(screen.getByLabelText("Registro funcional (RF)"), "1234567");
    await usuario.type(screen.getByLabelText("Senha"), "senha");
    await usuario.click(screen.getByRole("button", { name: "Acessar" }));

    expect(await screen.findByRole("heading", { name: "Inicio" })).toBeInTheDocument();
    expect(localStorage.getItem("TOKEN")).toBe("token");
    expect(localStorage.getItem("USUARIO")).toBe("1234567");
    expect(localStorage.getItem("NOME_USUARIO")).toBe("Ana");
  });

  it("mostra usuario ou senha invalidos quando a requisicao falha", async () => {
    const usuario = userEvent.setup();
    jest.mocked(postLogin).mockReturnValue({
      response: Promise.reject(new Error("credencial")),
      abort: jest.fn(),
    });

    renderTela(<Login />);
    await usuario.type(screen.getByLabelText("Registro funcional (RF)"), "1234567");
    await usuario.type(screen.getByLabelText("Senha"), "errada");
    await usuario.click(screen.getByRole("button", { name: "Acessar" }));

    expect(
      await screen.findByText("Usuário ou senha inválidos."),
    ).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "close" }));
    await waitFor(() => {
      expect(
        screen.queryByText("Usuário ou senha inválidos."),
      ).not.toBeInTheDocument();
    });
  });

  it("abre a recuperacao de senha", async () => {
    const usuario = userEvent.setup();
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={tema}>
          <MemoryRouter initialEntries={["/login"]}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/esqueci-minha-senha" element={<h1>Recuperar</h1>} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    await usuario.click(
      screen.getByRole("button", { name: "Esqueci minha senha" }),
    );
    expect(
      await screen.findByRole("heading", { name: "Recuperar" }),
    ).toBeInTheDocument();
  });
});

describe("EsqueceuSenha", () => {
  beforeEach(() => {
    jest.mocked(postEsqueceuSenha).mockReset();
  });

  it("envia rf quando o valor e numerico e segue para o sucesso", async () => {
    const usuario = userEvent.setup();
    jest.mocked(postEsqueceuSenha).mockReturnValue({
      response: Promise.resolve({
        email: "ana@sme.prefeitura.sp.gov.br",
        usuario: "1234567",
      }),
      abort: jest.fn(),
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={tema}>
          <MemoryRouter initialEntries={["/esqueci-minha-senha"]}>
            <Routes>
              <Route path="/esqueci-minha-senha" element={<EsqueceuSenhaTela />} />
              <Route
                path="/esqueci-minha-senha-sucesso"
                element={<EsqueceuSenhaSucesso />}
              />
              <Route path="/login" element={<h1>Tela de login</h1>} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    await usuario.type(screen.getByLabelText("RF ou e-mail"), "1234567");
    await usuario.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(
      await screen.findByText("ana@sme.prefeitura.sp.gov.br"),
    ).toBeInTheDocument();
    expect(jest.mocked(postEsqueceuSenha)).toHaveBeenCalledWith({
      rf: "1234567",
    });

    await usuario.click(screen.getByRole("button", { name: "close" }));
    await waitFor(() => {
      expect(
        screen.queryByText("Verifique sua caixa de entrada ou lixo eletrônico."),
      ).not.toBeInTheDocument();
    });

    await usuario.click(screen.getByRole("button", { name: "Continuar" }));
    expect(
      await screen.findByRole("heading", { name: "Tela de login" }),
    ).toBeInTheDocument();
  });

  it("mostra usuario nao encontrado para RF e e-mail", async () => {
    const usuario = userEvent.setup();
    jest
      .mocked(postEsqueceuSenha)
      .mockReturnValueOnce({
        response: Promise.reject(
          erroAxios(404, "Usuário não encontrado"),
        ),
        abort: jest.fn(),
      })
      .mockReturnValueOnce({
        response: Promise.reject(
          erroAxios(404, "Usuário não encontrado"),
        ),
        abort: jest.fn(),
      });

    renderTela(<EsqueceuSenhaTela />, "/esqueci-minha-senha");

    await usuario.type(screen.getByLabelText("RF ou e-mail"), "1234567");
    await usuario.click(screen.getByRole("button", { name: "Confirmar" }));
    expect(
      await screen.findByText("Usuário não encontrado!"),
    ).toBeInTheDocument();

    await usuario.clear(screen.getByLabelText("RF ou e-mail"));
    await usuario.type(
      screen.getByLabelText("RF ou e-mail"),
      "ana@sme.prefeitura.sp.gov.br",
    );
    await usuario.click(screen.getByRole("button", { name: "Confirmar" }));
    expect(
      await screen.findByText("E-mail não encontrado!"),
    ).toBeInTheDocument();
    expect(jest.mocked(postEsqueceuSenha)).toHaveBeenLastCalledWith({
      email: "ana@sme.prefeitura.sp.gov.br",
    });
  });

  it("mostra a mensagem do erro generico e volta ao login", async () => {
    const usuario = userEvent.setup();
    jest.mocked(postEsqueceuSenha).mockReturnValue({
      response: Promise.reject(new Error("servico fora")),
      abort: jest.fn(),
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={tema}>
          <MemoryRouter initialEntries={["/esqueci-minha-senha"]}>
            <Routes>
              <Route path="/esqueci-minha-senha" element={<EsqueceuSenhaTela />} />
              <Route path="/login" element={<h1>Tela de login</h1>} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    await usuario.type(
      screen.getByLabelText("RF ou e-mail"),
      "ana@sme.prefeitura.sp.gov.br",
    );
    await usuario.click(screen.getByRole("button", { name: "Confirmar" }));
    expect(await screen.findByText("servico fora")).toBeInTheDocument();
    await usuario.click(screen.getByRole("button", { name: "close" }));
    await waitFor(() => {
      expect(screen.queryByText("servico fora")).not.toBeInTheDocument();
    });

    await usuario.click(screen.getByRole("button", { name: "Voltar" }));
    expect(
      await screen.findByRole("heading", { name: "Tela de login" }),
    ).toBeInTheDocument();
  });
});

describe("EsqueceuSenhaSucesso", () => {
  it("volta ao login quando nao ha dados do envio", async () => {
    render(
      <ThemeProvider theme={tema}>
        <MemoryRouter initialEntries={["/esqueci-minha-senha-sucesso"]}>
          <Routes>
            <Route
              path="/esqueci-minha-senha-sucesso"
              element={<EsqueceuSenhaSucesso />}
            />
            <Route path="/login" element={<h1>Tela de login</h1>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Tela de login" }),
    ).toBeInTheDocument();
  });

  it("mostra o fallback quando a falha nao tem mensagem", async () => {
    const usuario = userEvent.setup();
    jest.mocked(postEsqueceuSenha).mockReturnValue({
      response: Promise.reject({ code: "sem-mensagem" }),
      abort: jest.fn(),
    });

    renderTela(<EsqueceuSenhaTela />, "/esqueci-minha-senha");
    await usuario.type(screen.getByLabelText("RF ou e-mail"), "123");
    await usuario.click(screen.getByRole("button", { name: "Confirmar" }));

    expect(
      await screen.findByText(
        "Erro ao enviar e-mail de recuperação. Tente novamente.",
      ),
    ).toBeInTheDocument();
  });
});

describe("NovaSenha", () => {
  beforeEach(() => {
    jest.mocked(postNovaSenha).mockReset();
  });

  it("mostra campos obrigatorios e salva quando a senha e valida", async () => {
    const usuario = userEvent.setup();
    jest.mocked(postNovaSenha).mockReturnValue({
      response: Promise.resolve({}),
      abort: jest.fn(),
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={tema}>
          <MemoryRouter initialEntries={["/criar-nova-senha/uid/token"]}>
            <Routes>
              <Route
                path="/criar-nova-senha/:uid/:token"
                element={<NovaSenhaTela />}
              />
              <Route path="/senha-alterada" element={<NovaSenhaSucesso />} />
              <Route path="/login" element={<h1>Tela de login</h1>} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    await usuario.click(screen.getByRole("button", { name: "Salvar senha" }));
    expect(await screen.findAllByText("Campo obrigatório")).toHaveLength(2);

    const [novaSenha, confirmar] = screen.getAllByLabelText(/senha/i);
    await usuario.type(novaSenha, senhaValida);
    await usuario.type(confirmar, senhaValida);
    expect(screen.getAllByText("Ao menos uma letra minúscula").length).toBeGreaterThan(0);

    await usuario.click(screen.getByRole("button", { name: "Salvar senha" }));
    expect(
      await screen.findByText("Você já pode acessar o Sigla com sua nova senha."),
    ).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Acessar agora" }));
    expect(
      await screen.findByRole("heading", { name: "Tela de login" }),
    ).toBeInTheDocument();
  });

  it("avisa link invalido sem uid e cancela para o login", async () => {
    const usuario = userEvent.setup();

    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={tema}>
          <MemoryRouter initialEntries={["/sem-token"]}>
            <Routes>
              <Route path="/sem-token" element={<NovaSenhaTela />} />
              <Route path="/login" element={<h1>Tela de login</h1>} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    const [novaSenha, confirmar] = screen.getAllByLabelText(/senha/i);
    await usuario.type(novaSenha, senhaValida);
    await usuario.clear(novaSenha);
    await usuario.type(novaSenha, senhaValida);
    await usuario.type(confirmar, senhaValida);
    await usuario.click(screen.getByRole("button", { name: "Salvar senha" }));
    expect(
      await screen.findByText("Link de recuperação inválido."),
    ).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(
      await screen.findByRole("heading", { name: "Tela de login" }),
    ).toBeInTheDocument();
  });

  it("mostra o erro retornado ao alterar a senha", async () => {
    const usuario = userEvent.setup();
    jest.mocked(postNovaSenha).mockReturnValue({
      response: Promise.reject(new Error("senha recusada")),
      abort: jest.fn(),
    });

    renderTela(<NovaSenhaTela />, "/criar-nova-senha/uid/token");
    const [novaSenha, confirmar] = screen.getAllByLabelText(/senha/i);
    await usuario.type(novaSenha, senhaValida);
    await usuario.type(confirmar, senhaValida);
    await usuario.click(screen.getByRole("button", { name: "Salvar senha" }));

    expect(await screen.findByText("senha recusada")).toBeInTheDocument();
    await usuario.click(screen.getByRole("button", { name: "close" }));
    await waitFor(() => {
      expect(screen.queryByText("senha recusada")).not.toBeInTheDocument();
    });
  });
});

describe("pecas da tela", () => {
  it("renderiza cabecalho com titulo e o aviso importante", () => {
    render(
      <ThemeProvider theme={tema}>
        <>
          <CabecalhoLogin titulo="Acesso" subtitulo="Entre com o RF" />
          <CabecalhoLogin titulo="Somente titulo" />
          <AvisoImportanteLogin />
        </>
      </ThemeProvider>,
    );

    expect(screen.getByText("Acesso")).toBeInTheDocument();
    expect(screen.getByText("Entre com o RF")).toBeInTheDocument();
    expect(screen.getByText("Somente titulo")).toBeInTheDocument();
    expect(screen.getByText(/se tornará padrão/)).toBeInTheDocument();
  });
});
