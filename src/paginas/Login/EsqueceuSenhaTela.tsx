import { Controller } from "react-hook-form";
import { CampoFormulario, InputForm, LabelCampo } from "@/estilos";
import { CabecalhoLogin } from "./components/CabecalhoLogin";
import { RodapePrefeitura } from "./components/RodapePrefeitura";
import { useEsqueceuSenha } from "./hooks/useEsqueceuSenha";
import {
  AlertaLogin,
  BotaoAcessar,
  BotaoVoltar,
  LoginCard,
  LoginFormulario,
  LoginPagina,
  LoginSubtitulo,
  LoginTitulo,
  MensagemErro,
  SecaoTituloLogin,
} from "./Estilos";

export function EsqueceuSenhaTela() {
  const {
    loading,
    alert,
    control,
    handleSubmit,
    errors,
    handleBackToLogin,
  } = useEsqueceuSenha();

  return (
    <LoginPagina>
      <LoginCard>
        <CabecalhoLogin />

        <SecaoTituloLogin>
          <LoginTitulo>Recuperação de senha</LoginTitulo>
          <LoginSubtitulo>
            Informe o seu RF ou e-mail. Você receberá um e-mail com orientações
            para redefinir sua senha.
          </LoginSubtitulo>
        </SecaoTituloLogin>

        {alert ? (
          <AlertaLogin
            message={alert.message}
            description={alert.description}
            type={alert.type}
            showIcon
          />
        ) : null}

        <LoginFormulario onSubmit={handleSubmit}>
          <CampoFormulario>
            <LabelCampo htmlFor="rf">RF ou e-mail</LabelCampo>
            <Controller
              name="rf"
              control={control}
              render={({ field }) => (
                <InputForm
                  {...field}
                  id="rf"
                  placeholder="Digite o RF ou e-mail"
                  status={errors.rf ? "error" : ""}
                />
              )}
            />
            {errors.rf ? <MensagemErro>{errors.rf.message}</MensagemErro> : null}
          </CampoFormulario>

          <BotaoAcessar loading={loading}>
            Confirmar
          </BotaoAcessar>

          <BotaoVoltar onClick={handleBackToLogin}>Voltar</BotaoVoltar>

          <RodapePrefeitura />
        </LoginFormulario>
      </LoginCard>
    </LoginPagina>
  );
}

export default EsqueceuSenhaTela;
