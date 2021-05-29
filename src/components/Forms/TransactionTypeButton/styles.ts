import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
  type: string;
}

interface ContainerProps {
  isActive: boolean;
  type: 'up' | 'down';
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;

  border: 1.5px solid ${(props) => props.theme.colors.text};
  border-radius: 5px;

  padding: ${RFValue(16)}px ${RFValue(35)}px;
  justify-content: center;

  ${props => props.isActive && props.type === 'down' && css`
    background-color: ${props => props.theme.colors.attention_ligth};
    border: 0;
  `}

  ${props => props.isActive && props.type === 'up' && css`
    background-color: ${props => props.theme.colors.success_light};
    border: 0;
  `}

  margin-top: ${RFValue(8)}px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${(props) =>
    props.type === "up"
      ? props.theme.colors.success
      : props.theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text_dark};
`;
