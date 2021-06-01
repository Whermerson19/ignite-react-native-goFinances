import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import { VictoryPie } from "victory-native";

import { HistoryCard } from "../../components/HistoryCard";
import { ITransactionsCardProps } from "../../components/TransactionCard";
import { categories } from "../../components/categories";

import { Container, Header, Title, ChartContainer } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

interface ICategoryData {
  id: string;
  name: string;
  total: number;
  formattedTotal: string;
  color: string;
  formattedPercent: string;
  percent: number;
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

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: ITransactionsCardProps) => {
        return accumulator + Number(expensive.amount);
      },
      0
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
        const formattedTotal = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const total = categorySum;

        const percent = Number((categorySum / expensivesTotal) * 100);
        const formattedPercent = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          id: category.key,
          name: category.name,
          color: category.color,
          formattedTotal,
          total,
          percent,
          formattedPercent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView>
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>

      <ScrollView contentContainerStyle={{ flex: 1, padding: 24 }}>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="formattedPercent"
            y="total"
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: "#000",
              },
            }}
            height={RFValue(400)}
          />
        </ChartContainer>

        {totalByCategories.map((element) => (
          <HistoryCard
            key={element.id}
            color={element.color}
            title={element.name}
            amount={element.formattedTotal}
          />
        ))}
      </ScrollView>
    </Container>
    </ScrollView>
  );
}
