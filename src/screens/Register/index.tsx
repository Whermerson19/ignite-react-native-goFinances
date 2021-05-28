import React, { useCallback, useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

import { CategoryModal } from "../CategoryModal";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsFields,
} from "./styles";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  amount: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  amount: yup
    .number()
    .typeError("Informe um valor numérico")
    .positive("O valor deve ser acima de 0")
    .required("Preço é obrigatório"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTransactionType = useCallback((type: string) => {
    setTransactionType(type);
  }, []);

  const handleCloseSelectCategory = useCallback(() => {
    setCategoryModalOpen(false);
  }, []);

  const handleOpenSelectCategory = useCallback(() => {
    setCategoryModalOpen(true);
  }, []);

  const handleSubmitRegisterForm = useCallback((form: FormData) => {
    if (!transactionType) return Alert.alert("Selecione uma categoria");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    console.log(form);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              autoCapitalize="sentences"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome"
              error={errors.name && errors.name.message}
            />
            <InputForm
              keyboardType="numeric"
              control={control}
              name="amount"
              placeholder="Preço"
              error={errors.amount && errors.amount.message}
            />

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

            <CategorySelect
              title={category.name}
              onPress={handleOpenSelectCategory}
            />
          </Fields>

          <Button
            onPress={handleSubmit(handleSubmitRegisterForm)}
            title="Enviar"
            activeOpacity={0.7}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategoryModal
            category={category}
            setCategory={setCategory}
            closeModal={handleCloseSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
