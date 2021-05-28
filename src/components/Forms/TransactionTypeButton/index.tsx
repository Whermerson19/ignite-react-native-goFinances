import React from 'react'
import {TouchableOpacityProps} from 'react-native'

import { Container, Icon, Title } from './styles'

interface Props extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  icon: string;
  isActive: boolean;
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