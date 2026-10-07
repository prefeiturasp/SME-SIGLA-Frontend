import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ILoginRequest } from "@/servicos/recursos/login";
import { schemaLogin } from "../formValidacaoSchema";
import { usePostLogin } from "./usePostLogin";

export const useLogin = () => {
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
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
      onError: () => {
        setAlert({ type: "error", message: "Usuário ou senha inválidos." });
      },
    });
  };

  return {
    loading: loginMutation.isPending,
    alert,
    control,
    handleSubmit: handleSubmit(onFinish),
    errors,
  };
};
