import { CheckCircleFilled } from "@ant-design/icons";
import { Controller } from "react-hook-form";
import { CampoFormulario, InputSenhaForm, LabelCampo } from "@/estilos";
import { AvisoImportanteLogin } from "./components/AvisoImportanteLogin";
import { CabecalhoLogin } from "./components/CabecalhoLogin";
import { RodapePrefeitura } from "./components/RodapePrefeitura";
import { useNovaSenha } from "./hooks/useNovaSenha";
import {
  AlertaLogin,
  BotaoAcessar,
  BotaoVoltar,
  ItemRequisito,
  ListaRequisitos,
  LoginCard,
  LoginFormulario,
  LoginPagina,
  MensagemErro,
  TituloRequisitos,
} from "./Estilos";

export function NovaSenhaTela() {
  const {
    loading,
    alert,
    control,
    handleSubmit,
    errors,
    isButtonDisabled,
    hasMinLength,
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSpecialChar,
    hasNoSpaces,
    hasNoAccents,
    handleCancel,
  } = useNovaSenha();

  return (
    <LoginPagina>
      <LoginCard>
        <CabecalhoLogin
          titulo="Crie uma nova senha"
          subtitulo="Esta será sua nova senha de acesso ao SIGLA"
        />

        {alert ? (
          <AlertaLogin message={alert.message} type={alert.type} showIcon />
        ) : null}

        <LoginFormulario onSubmit={handleSubmit}>
          <CampoFormulario>
            <LabelCampo htmlFor="nova_senha">Nova senha</LabelCampo>
            <Controller
              name="nova_senha"
              control={control}
              render={({ field }) => (
                <InputSenhaForm
                  {...field}
                  id="nova_senha"
                  placeholder="Digite sua senha"
                  status={errors.nova_senha ? "error" : ""}
                />
              )}
            />
            {errors.nova_senha ? (
              <MensagemErro>{errors.nova_senha.message}</MensagemErro>
            ) : null}
          </CampoFormulario>

          <ListaRequisitos>
            <TituloRequisitos>
              Por questões de segurança, a senha deve seguir os seguintes
              critérios:
            </TituloRequisitos>
            <ItemRequisito $atendido={hasLowerCase}>
              <CheckCircleFilled />
              <span>Ao menos uma letra minúscula</span>
            </ItemRequisito>
            <ItemRequisito $atendido={hasUpperCase}>
              <CheckCircleFilled />
              <span>Ao menos uma letra maiúscula</span>
            </ItemRequisito>
            <ItemRequisito $atendido={hasMinLength}>
              <CheckCircleFilled />
              <span>Entre 8 e 12 caracteres</span>
            </ItemRequisito>
            <ItemRequisito $atendido={hasNumber}>
              <CheckCircleFilled />
              <span>Ao menos um caracter numérico</span>
            </ItemRequisito>
            <ItemRequisito $atendido={hasSpecialChar}>
              <CheckCircleFilled />
              <span>Ao menos um caracter especial (#$@!%&*?)</span>
            </ItemRequisito>
            <ItemRequisito $atendido={hasNoSpaces}>
              <CheckCircleFilled />
              <span>Não deve conter espaços em branco</span>
            </ItemRequisito>
            <ItemRequisito $atendido={hasNoAccents}>
              <CheckCircleFilled />
              <span>Não deve conter caracteres acentuados</span>
            </ItemRequisito>
          </ListaRequisitos>

          <CampoFormulario>
            <LabelCampo htmlFor="confirmar_senha">
              Confirmação da nova senha
            </LabelCampo>
            <Controller
              name="confirmar_senha"
              control={control}
              render={({ field }) => (
                <InputSenhaForm
                  {...field}
                  id="confirmar_senha"
                  placeholder="Digite sua senha"
                  status={errors.confirmar_senha ? "error" : ""}
                />
              )}
            />
            {errors.confirmar_senha ? (
              <MensagemErro>{errors.confirmar_senha.message}</MensagemErro>
            ) : null}
          </CampoFormulario>

          <AvisoImportanteLogin />

          <BotaoAcessar loading={loading} disabled={isButtonDisabled}>
            Salvar senha
          </BotaoAcessar>

          <BotaoVoltar onClick={handleCancel}>Cancelar</BotaoVoltar>

          <RodapePrefeitura />
        </LoginFormulario>
      </LoginCard>
    </LoginPagina>
  );
}

export default NovaSenhaTela;
