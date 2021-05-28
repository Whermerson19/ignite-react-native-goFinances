import React, { useCallback, useState } from "react";
import { Modal } from 'react-native'

import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

import { CategoryModal } from '../CategoryModal'

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
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const handleTransactionType = useCallback((type: string) => {
    setTransactionType(type);
  }, []);

  const handleCloseSelectCategory = useCallback(() => {
    setCategoryModalOpen(false)
  }, [])

  const handleOpenSelectCategory = useCallback(() => {
    setCategoryModalOpen(true)
  }, [])

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

          <CategorySelect title={category.name} onPress={handleOpenSelectCategory} />
        </Fields>

        <Button title="Enviar" activeOpacity={0.7} />
      </Form>

      <Modal visible={categoryModalOpen} >
        <CategoryModal
          category={category}
          setCategory={setCategory}
          closeModal={handleCloseSelectCategory}
        />
      </Modal>
    </Container>
  );
}
