import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface ITypeProps {
  type: string;
}

export const Container = styled.View<ITypeProps>`
  background-color: ${(props) => props.theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px ${RFValue(42)}px 23px;

  margin-right: 16px;

  ${(props) =>
    props.type === "total" &&
    css`
      background-color: ${(props) => props.theme.colors.secondary};
    `};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<ITypeProps>`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.text_dark};
`;

export const Icon = styled(Feather)<ITypeProps>`
  font-size: ${RFValue(40)}px;
  ${(props) =>
    props.type === "up" &&
    css`
      color: ${(props) => props.theme.colors.success};
    `};
  ${(props) =>
    props.type === "down" &&
    css`
      color: ${(props) => props.theme.colors.attention};
    `};
  ${(props) =>
    props.type === "total" &&
    css`
      color: ${(props) => props.theme.colors.shape};
    `};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<ITypeProps>`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.text_dark};
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<ITypeProps>`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.text};
`;
