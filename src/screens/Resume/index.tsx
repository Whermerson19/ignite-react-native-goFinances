import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HistoryCard } from "../../components/HistoryCard";

import { Container, Header, Title } from "./styles";

import { ITransactionsCardProps } from "../../components/TransactionCard";
import { categories } from "../../components/categories";
import { ScrollView } from "react-native-gesture-handler";

interface ICategoryData {
  id: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>(
    []
  );

  const loadData = useCallback(async () => {
    const dataKey = "@gofinances:transactions";

    const response = await AsyncStorage.getItem(dataKey);

    const formattedResponse = response ? JSON.parse(response) : [];

    const expensives = formattedResponse.filter(
      (expensive: ITransactionsCardProps) => expensive.type === "negative"
    );

    const totalByCategory: ICategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: ITransactionsCardProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        totalByCategory.push({
          id: category.key,
          name: category.name,
          color: category.color,
          total,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>

      <ScrollView contentContainerStyle={{ flex: 1, padding: 24 }}>
        {totalByCategories.map((element) => (
          <HistoryCard
            key={element.id}
            color={element.color}
            title={element.name}
            amount={element.total}
          />
        ))}
      </ScrollView>
    </Container>
  );
}
