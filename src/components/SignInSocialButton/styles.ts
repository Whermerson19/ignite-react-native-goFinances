import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  width: 100%;
  height: ${RFValue(56)}px;

  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 5px;

  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  margin-bottom: ${RFValue(16)}px;
`;

export const ImageContainer = styled.View`
  height: 100%;
  padding: ${RFValue(16)}px;

  justify-content: center;
  align-items: center;

  border-color: ${props => props.theme.colors.background};
  border-right-width: 3px;
`;

export const Title = styled.Text`
  flex: 1;

  text-align: center;
  color: ${(props) => props.theme.colors.title};
  font-size: ${RFValue(16)}px;
  font-family: ${(props) => props.theme.fonts.medium};
`;
