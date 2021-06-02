import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

import { useFocusEffect } from "@react-navigation/native";

import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { VictoryPie } from "victory-native";

import { RFValue } from "react-native-responsive-fontsize";

import { HistoryCard } from "../../components/HistoryCard";
import { ITransactionsCardProps } from "../../components/TransactionCard";
import { categories } from "../../components/categories";

import {
  LoadContainer,
  Container,
  Header,
  Title,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  ChartContainer,
} from "./styles";
import { ActivityIndicator } from "react-native";

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
  const [isLoading, setIsLoading] = useState(false);
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>(
    []
  );

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback(
    (action: "next" | "prev") => {
      if (action === "next") {
        const changedDate = addMonths(selectedDate, 1);
        setSelectedDate(changedDate);
      } else {
        const changedDate = subMonths(selectedDate, 1);
        setSelectedDate(changedDate);
      }
    },
    [selectedDate]
  );

  async function loadData() {
    setIsLoading(true);

    const dataKey = "@gofinances:transactions";

    const response = await AsyncStorage.getItem(dataKey);

    const formattedResponse = response ? JSON.parse(response) : [];

    const expensives = formattedResponse.filter(
      (expensive: ITransactionsCardProps) =>
        expensive.type === "negative" &&
        selectedDate.getUTCMonth() === new Date(expensive.date).getUTCMonth() &&
        selectedDate.getUTCFullYear() ===
          new Date(expensive.date).getUTCFullYear()
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
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color="red" />
        </LoadContainer>
      ) : (
        <ScrollView>
          <ScrollView contentContainerStyle={{ flex: 1, padding: 24 }}>
            <MonthSelect>
              <MonthSelectButton>
                <SelectIcon
                  onPress={() => handleDateChange("prev")}
                  name="chevron-left"
                />
              </MonthSelectButton>

              <Month>
                {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
              </Month>

              <MonthSelectButton>
                <SelectIcon
                  onPress={() => handleDateChange("next")}
                  name="chevron-right"
                />
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                x="formattedPercent"
                y="total"
                colorScale={totalByCategories.map((category) => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: "bold",
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
        </ScrollView>
      )}
    </Container>
  );
}
