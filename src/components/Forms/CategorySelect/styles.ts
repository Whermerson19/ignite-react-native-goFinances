import styled from "styled-components/native";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: ${(props) => props.theme.colors.shape};
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  padding: ${RFValue(18)}px ${RFValue(16)}px;
  border-radius: 5px;

  margin: 16px 0;
`;

export const Category = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${(props) => props.theme.colors.text};
`;

export const Icon = styled(Feather)`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  font-size: ${RFValue(20)}px;
`;
