import React from "react";
import { useTheme } from "styled-components";

import { MaterialIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  const height = RFValue(80)

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: "beside-icon",
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height,
        }
      }}
    >
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              size={size}
              color={color}
              name="format-list-bulleted"
            />
          ),
        }}
        name="Listagem"
        component={Dashboard}
      />
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              size={size}
              color={color}
              name="attach-money"
            />
          ),
        }}
        name="Cadastrar"
        component={Register}
      />
      <Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              size={size}
              color={color}
              name="pie-chart"
            />
          ),
        }}
        name="Resumo"
        component={Register}
      />
    </Navigator>
  );
}
