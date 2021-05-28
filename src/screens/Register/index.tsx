import React, { useCallback, useState } from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsFields,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("");

  const handleTransactionType = useCallback((type: string) => {
    setTransactionType(type);
  }, []);

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionsFields>
            <TransactionTypeButton
              title="Entrada"
              type="up"
              icon="arrow-up-circle"
              onPress={() => handleTransactionType("up")}
              isActive={transactionType === "up"}
              activeOpacity={1}
            />
            <TransactionTypeButton
              title="Saída"
              type="down"
              icon="arrow-down-circle"
              onPress={() => handleTransactionType("down")}
              isActive={transactionType === "down"}
              activeOpacity={1}
            />
          </TransactionsFields>
        </Fields>

        <Button title="Enviar" activeOpacity={0.7} />
      </Form>
    </Container>
  );
}
