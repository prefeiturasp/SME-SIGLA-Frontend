import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CampoFormulario, InputForm, InputSenhaForm, LabelCampo } from "@/estilos";
import { CAMINHOS } from "@/rotas/caminhos";
import { useLogin } from "../hooks/useLogin";
import {
  AlertaLogin,
  BotaoAcessar,
  LinkEsqueciSenha,
  LoginFormulario,
  MensagemErro,
} from "../Estilos";
import { RodapePrefeitura } from "./RodapePrefeitura";

export function FormularioLogin() {
  const navigate = useNavigate();
  const { loading, alert, control, handleSubmit, errors } = useLogin();

  return (
    <LoginFormulario onSubmit={handleSubmit}>
      {alert ? (
        <AlertaLogin message={alert.message} type={alert.type} showIcon />
      ) : null}

      <CampoFormulario>
        <LabelCampo htmlFor="usuario">Registro funcional (RF)</LabelCampo>
        <Controller
          name="usuario"
          control={control}
          render={({ field }) => (
            <InputForm
              {...field}
              id="usuario"
              placeholder="Digite o RF"
              autoComplete="username"
              status={errors.usuario ? "error" : ""}
            />
          )}
        />
        {errors.usuario ? (
          <MensagemErro>{errors.usuario.message}</MensagemErro>
        ) : null}
      </CampoFormulario>

      <CampoFormulario>
        <LabelCampo htmlFor="senha">Senha</LabelCampo>
        <Controller
          name="senha"
          control={control}
          render={({ field }) => (
            <InputSenhaForm
              {...field}
              id="senha"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              status={errors.senha ? "error" : ""}
            />
          )}
        />
        {errors.senha ? <MensagemErro>{errors.senha.message}</MensagemErro> : null}
      </CampoFormulario>

      <BotaoAcessar loading={loading}>Acessar</BotaoAcessar>

      <LinkEsqueciSenha
        type="button"
        onClick={() => navigate(CAMINHOS.esqueciSenha)}
      >
        Esqueci minha senha
      </LinkEsqueciSenha>

      <RodapePrefeitura />
    </LoginFormulario>
  );
}

export default FormularioLogin;
