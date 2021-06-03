import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleLogo from "../../assets/apple-icon.svg";
import GoogleLogo from "../../assets/google-icon.svg";
import Logo from "../../assets/app-logo.svg";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import { SignInSocialButton } from "../../components/SignInSocialButton";

export function SignIn() {

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controler suas finanças {"\n"} de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {"\n"} uma de suas contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleLogo} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleLogo} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
