import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { globalStyle } from "globalStyles";

const TopTab = createMaterialTopTabNavigator();

const MaterialTopTabs = ({
  data,
  search = null,
  isEqualWidth = false,
  height = 40,
  activeColor = "#fff",
}) => {
  const { initialRoute, screens } = data;
  return (
    <>
      <TopTab.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          tabBarActiveTintColor: activeColor,
          tabBarIndicatorStyle: { backgroundColor: globalStyle.secondaryColor },
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: globalStyle.primaryColor,
            height: height,
          },
          tabBarAllowFontScaling: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          tabBarContentContainerStyle: {
            alignItems: "center",
          },
          tabBarItemStyle: !isEqualWidth
            ? styles.defaultTabBarItemStyle
            : styles.equalWidthTabBarItemStyle,
          tabBarScrollEnabled: !isEqualWidth,
          animationEnabled: false,
        }}
      >
        {screens?.map((item, index) => (
          <TopTab.Screen key={index} name={item.name}>
            {item.component}
          </TopTab.Screen>
        ))}
      </TopTab.Navigator>
      {search}
    </>
  );
};

export default MaterialTopTabs;

const styles = StyleSheet.create({
  defaultTabBarItemStyle: {
    margin: 0,
    padding: 0,
    width: 45,
  },
  equalWidthTabBarItemStyle: {
    margin: 0,
    padding: 0,
  },
});
