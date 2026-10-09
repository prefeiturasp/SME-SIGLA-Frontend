import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ILoginRequest } from "@/servicos/recursos/login";
import { schemaLogin } from "../formValidacaoSchema";
import { usePostLogin } from "./usePostLogin";

type AlertaLoginEstado = {
  type: "success" | "error";
  message: string;
  description?: string;
};

function ehFalhaAutenticacao(erro: unknown): boolean {
  if (!isAxiosError(erro) || erro.response?.status !== 400) return false;
  const detalhe = (erro.response.data as { detail?: string } | undefined)
    ?.detail;
  return detalhe === "Falha no serviço de autenticação";
}

export const useLogin = () => {
  const [alert, setAlert] = useState<AlertaLoginEstado | null>(null);
  const loginMutation = usePostLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    resolver: zodResolver(schemaLogin),
    mode: "onChange",
    defaultValues: {
      usuario: "",
      senha: "",
    },
  });

  const onFinish = async (values: ILoginRequest) => {
    setAlert(null);

    loginMutation.mutate(values, {
      onError: (erro: unknown) => {
        if (ehFalhaAutenticacao(erro)) {
          setAlert({
            type: "error",
            message: "Erro!",
            description:
              "Parece que estamos com uma instabilidade no momento. Tente entrar novamente daqui a pouco.",
          });
          return;
        }

        setAlert({ type: "error", message: "Usuário ou senha inválidos." });
      },
    });
  };

  return {
    loading: loginMutation.isPending,
    alert,
    fecharAlerta: () => setAlert(null),
    control,
    handleSubmit: handleSubmit(onFinish),
    errors,
  };
};
