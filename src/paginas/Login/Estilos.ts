import { Alert, Button } from "antd";
import styled from "styled-components";
import fundoLogin from "@/assets/fundo_login.png";

export const LoginPagina = styled.div`
  position: relative;
  display: flex;
  align-items: safe center;
  justify-content: flex-end;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg}px
    ${({ theme }) => theme.spacing.xl * 2}px
    ${({ theme }) => theme.spacing.lg}px
    ${({ theme }) => theme.spacing.xl}px;
  overflow: auto;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        ${({ theme }) => theme.colors.loginOverlay},
        ${({ theme }) => theme.colors.loginOverlay}
      ),
      url(${fundoLogin}) center / cover no-repeat;
    z-index: 0;
  }
`;

export const LoginCard = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 38%;
  height: ${({ theme }) => theme.layout.loginCardHeight}px;
  padding: ${({ theme }) => theme.spacing.xl}px
    ${({ theme }) => theme.spacing.xl}px ${({ theme }) => theme.spacing.lg}px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.layout.radiusCard}px;
  box-shadow: ${({ theme }) => theme.layout.cardShadow};
`;

export const LoginCabecalho = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-top: ${({ theme }) => theme.spacing.xl + theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  text-align: center;
`;

export const LoginTitulo = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizeTitle}px;
  font-weight: ${({ theme }) => theme.typography.fontWeightTitle};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const LoginSubtitulo = styled.p`
  margin: 0;
  max-width: 100%;
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 400;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

/** Titulo + texto de apoio abaixo do logo, alinhados a esquerda. */
export const SecaoTituloLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm}px;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  text-align: left;
`;

export const LoginFormulario = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

export const LoginRodape = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.md}px;
`;

export const BotaoAcessar = styled(Button).attrs({
  type: "primary",
  htmlType: "submit",
  block: true,
})`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  font-weight: 600;
`;

export const LinkEsqueciSenha = styled.button`
  display: block;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  padding: 0;
  border: none;
  background: none;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.link};
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.linkHover};
  }
`;

export const LogoPrefeitura = styled.img`
  display: block;
  width: auto;
  max-width: 180px;
  height: auto;
`;

export const MensagemErro = styled.p`
  margin: ${({ theme }) => theme.spacing.xs}px 0 0;
  font-size: ${({ theme }) => theme.typography.fontSizeCaption}px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.error};
`;

export const AlertaLogin = styled(Alert)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const BotaoVoltar = styled(Button).attrs({
  block: true,
})`
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

export const AvisoImportante = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.layout.radius}px;
  background: ${({ theme }) => theme.colors.stripedBackground};
`;

export const AvisoTitulo = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeightLabel};
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const AvisoTexto = styled.span`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const ListaRequisitos = styled.ul`
  margin: 0 0 ${({ theme }) => theme.spacing.lg}px;
  padding: 0;
  list-style: none;
`;

export const TituloRequisitos = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.fontSizeBase}px;
  font-weight: ${({ theme }) => theme.typography.fontWeightLabel};
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const ItemRequisito = styled.li<{ $atendido: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.typography.fontSizeCaption}px;
  color: ${({ $atendido, theme }) =>
    $atendido ? theme.colors.success : theme.colors.secondaryText};
`;
