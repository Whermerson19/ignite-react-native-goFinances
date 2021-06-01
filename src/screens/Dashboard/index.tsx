import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { useFocusEffect } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TransactionCard } from "../../components/TransactionCard";
import { WalletCard } from "../../components/WalletCard";
import { ITransactionsCardProps } from "../../components/TransactionCard";

import {
  LoadContainer,
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

export interface IDataListProps extends ITransactionsCardProps {
  id: string;
}

interface IWalletCardsProps {
  amount: string;
  lastTransaction: string;
}

interface IWalletCardsData {
  entries: IWalletCardsProps;
  expensives: IWalletCardsProps;
  total: IWalletCardsProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [walletCardsData, setWalletCardsData] = useState<IWalletCardsData>(
    {} as IWalletCardsData
  );

  const theme = useTheme();

  const getLastTransaction = useCallback(
    (collection: IDataListProps[], type: "positive" | "negative") => {
      const lastTransactionsEntry = new Date(
        Math.max.apply(
          Math,
          collection
            .filter((transaction) => transaction.type === type)
            .map((transaction) => new Date(transaction.date).getTime())
        )
      );

      return Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: 'numeric'
      }).format(lastTransactionsEntry);
    },
    []
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
          year: 'numeric'
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

    const total = entries - expensives;

    setTransactions(formattedTransactions);

    const lastTransactionEntries = getLastTransaction(transactions, "positive");
    const lastTransactionExpensives = getLastTransaction(
      transactions,
      "negative"
    );

    setWalletCardsData({
      entries: {
        amount: entries.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expensives: {
        amount: expensives.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: ''
      },
    });
    setIsLoading(false);
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
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
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
              lastTransaction={walletCardsData.entries.lastTransaction}
            />
            <WalletCard
              type="down"
              title="Saídas"
              amount={walletCardsData.expensives.amount}
              lastTransaction={walletCardsData.expensives.lastTransaction}
            />
            <WalletCard
              type="total"
              title="Total"
              amount={walletCardsData.total.amount}
              lastTransaction={walletCardsData.total.lastTransaction}
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
        </>
      )}
    </Container>
  );
}
