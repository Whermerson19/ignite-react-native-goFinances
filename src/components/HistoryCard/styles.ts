import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

interface IContainerProps {
  color: string;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;

  background-color: ${props => props.theme.colors.shape};

  flex-direction: row ;
  justify-content: space-between;

  padding: ${RFValue(13)}px ${RFValue(24)}px;

  border-radius: 5px;

  border-left-color: ${props => props.color};
  border-left-width: 5px;

  margin-bottom: ${RFValue(8)}px;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${props => props.theme.colors.text};
`;

export const Amount = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  font-size: ${RFValue(16)}px;
  color: ${props => props.theme.colors.text_dark};
`;