import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { globalStyle } from "../../styles";

const BottomTab = createBottomTabNavigator();

const BottomTabs = ({ data }) => {
  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={globalStyle.primaryColor}
      />
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: globalStyle.secondaryColor,
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#262632",
            paddingBottom: 10,
            height: 60,
          },
        }}
      >
        {data?.map((item, index) => (
          <BottomTab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              tabBarIcon: item.icon,
            }}
          />
        ))}
      </BottomTab.Navigator>
    </>
  );
};

export default BottomTabs;
