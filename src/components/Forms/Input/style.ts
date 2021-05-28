import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
  width: 100%;

  padding: ${RFValue(18)}px;

  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  background-color: ${(props) => props.theme.colors.shape};

  border-radius: 5px;

  margin-bottom: ${RFValue(8)}px;

  color: ${(props) => props.theme.colors.text_dark};
`;
