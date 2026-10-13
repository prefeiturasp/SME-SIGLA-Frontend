import { Navigate, Route, Routes } from "react-router-dom";
import { EsqueceuSenhaSucesso } from "@/paginas/Login/EsqueceuSenhaSucesso";
import { EsqueceuSenhaTela } from "@/paginas/Login/EsqueceuSenhaTela";
import { Login } from "@/paginas/Login";
import { NovaSenhaSucesso } from "@/paginas/Login/NovaSenhaSucesso";
import { NovaSenhaTela } from "@/paginas/Login/NovaSenhaTela";
import { SelecaoSistemas } from "@/paginas/SelecaoSistemas";
import { estaAutenticado } from "@/servicos/recursos/autenticacao";
import { RotaProtegida, RotaPublicaSomenteDeslogado } from "./AuthGuard";
import { CAMINHOS } from "./caminhos";

export function RotasApp() {
  return (
    <Routes>
      <Route
        path={CAMINHOS.inicio}
        element={
          <RotaProtegida>
            <SelecaoSistemas />
          </RotaProtegida>
        }
      />
      <Route
        path={CAMINHOS.login}
        element={
          <RotaPublicaSomenteDeslogado>
            <Login />
          </RotaPublicaSomenteDeslogado>
        }
      />
      <Route path={CAMINHOS.esqueciSenha} element={<EsqueceuSenhaTela />} />
      <Route
        path={CAMINHOS.esqueciSenhaSucesso}
        element={<EsqueceuSenhaSucesso />}
      />
      <Route path={CAMINHOS.criarNovaSenha} element={<NovaSenhaTela />} />
      <Route
        path="*"
        element={
          <Navigate
            to={estaAutenticado() ? CAMINHOS.inicio : CAMINHOS.login}
            replace
          />
        }
      />
      <Route path={CAMINHOS.novaSenhaSucesso} element={<NovaSenhaSucesso />} />
      <Route path="*" element={<Navigate to={CAMINHOS.login} replace />} />
    </Routes>
  );
}

export default RotasApp;
