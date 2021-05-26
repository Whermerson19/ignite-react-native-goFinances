import React from "react";
import { WalletCard } from "../../components/WalletCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  Username,
  Icon,
  WalletCards,
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/68500665?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <Username>Whermerson</Username>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <WalletCards

      >
        <WalletCard type='up' title="Entradas" amount="R$ 1000,00" lastTransaction="05 de Junho" />
        <WalletCard type='down' title="Saídas" amount="R$ 100,00" lastTransaction="05 de Junho" />
        <WalletCard type='total' title="Total" amount="R$ 900,00" lastTransaction="05 de Junho" />
      </WalletCards>
    </Container>
  );
}
