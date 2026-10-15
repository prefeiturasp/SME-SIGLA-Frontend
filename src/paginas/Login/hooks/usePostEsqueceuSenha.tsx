import { useMutation } from "@tanstack/react-query";
import { postEsqueceuSenha } from "@/servicos/recursos/login/esqueceuSenha";
import type { IEsqueceuSenhaRequest } from "@/servicos/recursos/login/esqueceuSenha";

export const usePostEsqueceuSenha = () => {
  return useMutation({
    mutationFn: (payload: IEsqueceuSenhaRequest) =>
      postEsqueceuSenha(payload).response,
  });
};
