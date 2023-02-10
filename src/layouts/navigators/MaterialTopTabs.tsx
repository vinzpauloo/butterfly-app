import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { globalStyle } from "globalStyles";
import Container from "components/Container";

const TopTab = createMaterialTopTabNavigator();

const MaterialTopTabs = ({
  data,
  search = null,
  isEqualWidth = false,
  height = 40,
  activeColor = "#fff",
  tabBarColor = null,
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
            backgroundColor: tabBarColor || globalStyle.primaryColor,
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
          lazy: true,
          lazyPlaceholder: () => (
            <Container>
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="white" />
              </View>
            </Container>
          ),
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
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
