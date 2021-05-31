import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TransactionCard } from "../../components/TransactionCard";
import { WalletCard } from "../../components/WalletCard";
import { ITransactionsCardProps } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  LogoutButton,
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
import { useFocusEffect } from "@react-navigation/core";

export interface IDataListProps extends ITransactionsCardProps {
  id: string;
}

interface IWalletCardsProps {
  amount: string;
}

interface IWalletCardsData {
  entries: IWalletCardsProps;
  expensives: IWalletCardsProps;
  total: IWalletCardsProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [walletCardsData, setWalletCardsData] = useState<IWalletCardsData>(
    {} as IWalletCardsData
  );

  const loadedTransactions = useCallback(async () => {
    const dataKey = "@gofinances:transactions";

    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entries = 0;
    let expensives = 0;

    const formattedTransactions: IDataListProps[] = transactions.map(
      (item: IDataListProps) => {
        if (item.type === "positive") entries += Number(item.amount);
        else expensives += Number(item.amount);

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          date,
          type: item.type,
          category: item.category,
        };
      }
    );

    const total = entries - expensives

    setTransactions(formattedTransactions);
    setWalletCardsData({
      entries: {
        amount: entries.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expensives: {
        amount: expensives.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
  }, []);

  useEffect(() => {
    loadedTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadedTransactions();
    }, [])
  );

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

          <LogoutButton onPress={() => console.log("click")}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <WalletCards>
        <WalletCard
          type="up"
          title="Entradas"
          amount={walletCardsData.entries.amount}
          lastTransaction="05 de Junho"
        />
        <WalletCard
          type="down"
          title="Saídas"
          amount={walletCardsData.expensives.amount}
          lastTransaction="05 de Junho"
        />
        <WalletCard
          type="total"
          title="Total"
          amount={walletCardsData.total.amount}
          lastTransaction="05 de Junho"
        />
      </WalletCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>
    </Container>
  );
}
