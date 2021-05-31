import React from 'react'
import {RectButtonProps} from 'react-native-gesture-handler'

import { Container, Icon, Title } from './styles'

interface Props extends RectButtonProps {
  title: string;
  type: 'positive' | 'negative';
  icon: string;
  isActive: boolean;
  onPress: () => void
}

export function TransactionTypeButton({title, type, icon, isActive, ...rest}: Props) {
  return (
    <Container type={type} isActive={isActive} {...rest} >
      <Icon name={icon} type={type} />
      <Title>
        {title}
      </Title>
    </Container>
  )
}