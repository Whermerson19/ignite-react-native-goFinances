import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { categories } from "../../components/categories";

import { Button } from '../../components/Forms/Button'

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Footer,
} from "./styles";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory(name: Category): void;
  closeModal(): void;
}

export function CategoryModal({ category, setCategory, closeModal }: Props) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => setCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
      />

      <Footer>
        <Button onPress={closeModal} title="Selecionar" />
      </Footer>
    </Container>
  );
}
