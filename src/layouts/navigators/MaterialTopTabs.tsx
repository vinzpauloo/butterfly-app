import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { globalStyle } from "../../globalStyles";

const TopTab = createMaterialTopTabNavigator();

const MaterialTopTabs = ({ data }) => {
  const { initialRoute, screens } = data;
  return (
    <>
      <TopTab.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          tabBarActiveTintColor: "#fff",
          tabBarIndicatorStyle: { backgroundColor: globalStyle.secondaryColor },
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: globalStyle.primaryColor,
            height: 40,
          },
          tabBarAllowFontScaling: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          tabBarContentContainerStyle: {
            alignItems: "center",
          },
          tabBarItemStyle: {
            width: 45,
            margin: 0,
            padding: 0,
          },
          tabBarScrollEnabled: true,
          animationEnabled: false,
        }}
      >
        {screens?.map((item, index) => (
          <TopTab.Screen key={index} name={item.name}>
            {item.component}
          </TopTab.Screen>
        ))}
      </TopTab.Navigator>
    </>
  );
};

export default MaterialTopTabs;

const styles = StyleSheet.create({});
