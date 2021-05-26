import React from "react";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./style";

interface ICategory {
  name: string;
  icon: string;
}

export interface ITransactionsCardProps {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: ICategory;
  date: string;
}

interface Props {
  data: ITransactionsCardProps;
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === "positive" ? data.amount : `- ${data.amount}`}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
