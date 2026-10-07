import { Navigate, Route, Routes } from "react-router-dom";
import { EsqueceuSenhaSucesso } from "@/paginas/Login/EsqueceuSenhaSucesso";
import { EsqueceuSenhaTela } from "@/paginas/Login/EsqueceuSenhaTela";
import { Login } from "@/paginas/Login";
import { NovaSenhaTela } from "@/paginas/Login/NovaSenhaTela";
import { CAMINHOS } from "./caminhos";

export function RotasApp() {
  return (
    <Routes>
      <Route path={CAMINHOS.login} element={<Login />} />
      <Route path={CAMINHOS.esqueciSenha} element={<EsqueceuSenhaTela />} />
      <Route
        path={CAMINHOS.esqueciSenhaSucesso}
        element={<EsqueceuSenhaSucesso />}
      />
      <Route path={CAMINHOS.criarNovaSenha} element={<NovaSenhaTela />} />
      <Route path="*" element={<Navigate to={CAMINHOS.login} replace />} />
    </Routes>
  );
}

export default RotasApp;
