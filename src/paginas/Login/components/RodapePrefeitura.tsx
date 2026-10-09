import logoPrefeitura from "@/assets/logo-prefeitura.png";
import { LoginRodape, LogoPrefeitura } from "../Estilos";

type RodapePrefeituraProps = {
  solto?: boolean;
  compacto?: boolean;
};

export function RodapePrefeitura({
  solto = false,
  compacto = false,
}: RodapePrefeituraProps) {
  return (
    <LoginRodape $solto={solto} $compacto={compacto}>
      <LogoPrefeitura src={logoPrefeitura} alt="Prefeitura de São Paulo" />
    </LoginRodape>
  );
}

export default RodapePrefeitura;
