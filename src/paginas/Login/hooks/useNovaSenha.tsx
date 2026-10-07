import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaNovaSenha } from "../formValidacaoSchema";
import { usePostNovaSenha } from "./usePostNovaSenha";
import type {
  INovaSenhaRequest,
  INovaSenhaResponse,
} from "@/servicos/recursos/login/novaSenha";
import { CAMINHOS } from "@/rotas/caminhos";
import type { DadosNovaSenha } from "../formValidacaoSchema";

function mensagemDoErro(erro: unknown, fallback: string): string {
  return erro instanceof Error && erro.message ? erro.message : fallback;
}

export const useNovaSenha = () => {
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const navigate = useNavigate();
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const novaSenhaMutation = usePostNovaSenha();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DadosNovaSenha>({
    resolver: zodResolver(schemaNovaSenha),
    mode: "onChange",
    defaultValues: {
      nova_senha: "",
      confirmar_senha: "",
    },
  });

  const novaSenhaValue = watch("nova_senha");
  const confirmarSenhaValue = watch("confirmar_senha");

  const hasMinLength = Boolean(
    novaSenhaValue && novaSenhaValue.length >= 8 && novaSenhaValue.length <= 12,
  );
  const hasLowerCase = Boolean(novaSenhaValue && /[a-z]/.test(novaSenhaValue));
  const hasUpperCase = Boolean(novaSenhaValue && /[A-Z]/.test(novaSenhaValue));
  const hasNumber = Boolean(novaSenhaValue && /[0-9]/.test(novaSenhaValue));
  const hasSpecialChar = Boolean(
    novaSenhaValue && /[#$@!%&*?]/.test(novaSenhaValue),
  );
  const hasNoSpaces = novaSenhaValue ? !/\s/.test(novaSenhaValue) : true;
  const hasNoAccents = novaSenhaValue
    ? !/[áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/.test(novaSenhaValue)
    : true;

  const isButtonDisabled =
    !novaSenhaValue ||
    !confirmarSenhaValue ||
    !hasMinLength ||
    !hasLowerCase ||
    !hasUpperCase ||
    !hasNumber ||
    !hasSpecialChar ||
    !hasNoSpaces ||
    !hasNoAccents ||
    novaSenhaValue !== confirmarSenhaValue;

  const onFinish = async (values: DadosNovaSenha) => {
    setAlert(null);

    if (!uid || !token) {
      setAlert({
        type: "error",
        message: "Link de recuperação inválido.",
      });
      return;
    }

    const payload: INovaSenhaRequest = {
      uid,
      token,
      nova_senha: values.nova_senha,
      confirmar_senha: values.confirmar_senha,
    };

    novaSenhaMutation.mutate(payload, {
      onSuccess: (data: INovaSenhaResponse) => {
        setAlert({
          type: "success",
          message: data.message || "Senha alterada com sucesso!",
        });

        setTimeout(() => {
          navigate(CAMINHOS.login);
        }, 2000);
      },
      onError: (error: unknown) => {
        setAlert({
          type: "error",
          message: mensagemDoErro(
            error,
            "Erro ao alterar senha. Tente novamente.",
          ),
        });
      },
    });
  };

  const handleCancel = () => {
    navigate(CAMINHOS.login);
  };

  return {
    loading: novaSenhaMutation.isPending,
    alert,
    control,
    handleSubmit: handleSubmit(onFinish),
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
  };
};
