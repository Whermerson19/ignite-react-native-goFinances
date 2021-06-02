import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const LoadContainer = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${(props) => props.theme.colors.primary};

  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.shape};
  font-family: ${(props) => props.theme.fonts.medium};

  font-size: ${RFValue(18)}px;
`;

export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  margin: ${RFValue(24)}px 0;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const SelectIcon = styled(Feather)`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(24)}px;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;
