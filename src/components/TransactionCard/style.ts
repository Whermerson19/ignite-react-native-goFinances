import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface IType {
  type: "positive" | "negative";
}

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 5px;

  padding: 17px 24px;

  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const Amount = styled.Text<IType>`
  font-size: ${RFValue(20)}px;
  font-family: ${(props) => props.theme.fonts.medium};

  color: ${(props) =>
    props.type === "positive"
      ? props.theme.colors.success
      : props.theme.colors.attention};

  margin-top: 2px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${RFValue(19)}px;
`;

export const Category = styled.View`
  flex-direction: row;

  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${(props) => props.theme.colors.text};

  margin-right: 17px;
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
`;
