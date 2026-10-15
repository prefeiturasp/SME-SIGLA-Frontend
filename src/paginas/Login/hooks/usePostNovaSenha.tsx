import { useMutation } from "@tanstack/react-query";
import { postNovaSenha } from "@/servicos/recursos/login/novaSenha";
import type { INovaSenhaRequest } from "@/servicos/recursos/login/novaSenha";

export const usePostNovaSenha = () => {
  return useMutation({
    mutationFn: (payload: INovaSenhaRequest) => postNovaSenha(payload).response,
  });
};
