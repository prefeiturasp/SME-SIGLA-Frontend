import logoPrefeitura from "@/assets/logo-prefeitura.png";
import { LoginRodape, LogoPrefeitura } from "../Estilos";

export function RodapePrefeitura() {
  return (
    <LoginRodape>
      <LogoPrefeitura src={logoPrefeitura} alt="Prefeitura de São Paulo" />
    </LoginRodape>
  );
}

export default RodapePrefeitura;
