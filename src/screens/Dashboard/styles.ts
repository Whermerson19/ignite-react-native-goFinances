import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";

import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { FlatList } from "react-native";

import { IDataListProps } from ".";

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
  height: ${RFPercentage(42)}px;

  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const UserWrapper = styled.View`
  width: 100%;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  padding: 0 ${RFValue(24)}px;
  margin-top: ${Platform.OS === "ios"
    ? `${getStatusBarHeight() + RFValue(28)}px`
    : `${RFValue(28)}px`};
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${(props) => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const Username = styled.Text`
  color: ${(props) => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  color: ${(props) => props.theme.colors.secondary};

  font-size: ${RFValue(24)}px;
`;

export const WalletCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;

  padding: 0 ${RFValue(24)}px;

  margin-top: ${RFPercentage(13)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${(props) => props.theme.fonts.regular};

  margin-bottom: 16px;
`;

export const TransactionsList = styled(
  FlatList as new () => FlatList<IDataListProps>
).attrs({})``;
