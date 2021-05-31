import React, { useCallback, useState } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/core";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { InputForm } from "../../components/Forms/InputForm";

import { CategoryModal } from "../CategoryModal";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsFields,
} from "./styles";

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

const dataKey = "@gofinances:transactions";

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  const handleTransactionType = useCallback((type: string) => {
    setTransactionType(type);
  }, []);

  const handleCloseSelectCategory = useCallback(() => {
    setCategoryModalOpen(false);
  }, []);

  const handleOpenSelectCategory = useCallback(() => {
    setCategoryModalOpen(true);
  }, []);

  const handleSubmitRegisterForm = useCallback(
    async ({ name, amount }: FormData) => {
      if (!transactionType) return Alert.alert("Selecione o tipo de transação");

      if (category.key === "category")
        return Alert.alert("Selecione a categoria");

      const newTransaction = {
        id: Math.floor(Math.random() * 903458798789).toString(),
        name,
        amount,
        type: transactionType,
        category: category.key,
        date: new Date(),
      };

      try {
        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];

        const formattedData = [...currentData, newTransaction];

        await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

        reset();

        setTransactionType("");
        setCategory({
          key: "category",
          name: "Categoria",
        });

        navigation.navigate("Listagem");
      } catch (err) {
        console.log(err);
        Alert.alert("Não foi possível cadastrar a transação");
      }
    },
    [category.key, transactionType]
  );

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
                type="positive"
                icon="arrow-up-circle"
                onPress={() => handleTransactionType("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                title="Saída"
                type="negative"
                icon="arrow-down-circle"
                onPress={() => handleTransactionType("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionsFields>

            <CategorySelect
              title={category.name}
              onPress={handleOpenSelectCategory}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleSubmitRegisterForm)}
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
