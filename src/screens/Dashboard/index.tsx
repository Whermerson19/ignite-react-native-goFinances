import React from "react";
import { TransactionCard } from "../../components/TransactionCard";
import { WalletCard } from "../../components/WalletCard";

import { ITransactionsCardProps } from '../../components/TransactionCard'

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
  Transactions,
  Title,
  TransactionsList,
} from "./styles";

export interface IDataListProps extends ITransactionsCardProps {
  id: string;
}

export function Dashboard() {

  const data: IDataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 1000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      },
      date: "19/01/2021"
    },
    {
      id: '2',
      type: 'negative',
      title: "Super Mercado",
      amount: "R$ 100,00",
      category: {
        name: "Compras",
        icon: "coffee"
      },
      date: "19/01/2021"
    }
  ];

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

      <WalletCards>
        <WalletCard
          type="up"
          title="Entradas"
          amount="R$ 1000,00"
          lastTransaction="05 de Junho"
        />
        <WalletCard
          type="down"
          title="Saídas"
          amount="R$ 100,00"
          lastTransaction="05 de Junho"
        />
        <WalletCard
          type="total"
          title="Total"
          amount="R$ 900,00"
          lastTransaction="05 de Junho"
        />
      </WalletCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList 
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
        />

        
      </Transactions>
    </Container>
  );
}
