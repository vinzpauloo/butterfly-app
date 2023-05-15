import { StyleSheet, ActivityIndicator, View, Dimensions } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import Container from "components/Container";

const { width } = Dimensions.get("window");
const TopTab = createMaterialTopTabNavigator();

const MaterialTopTabs = ({
  data,
  search = null,
  isEqualWidth = false,
  height = 40,
  activeColor = GLOBAL_COLORS.secondaryColor,
  tabBarColor = null,
}) => {
  const { initialRoute, screens } = data;
  const isSmallScreen = isEqualWidth && width < GLOBAL_SCREEN_SIZE.mobile;

  return (
    <>
      <TopTab.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          tabBarActiveTintColor: activeColor,
          tabBarIndicatorStyle: {
            backgroundColor: GLOBAL_COLORS.secondaryColor,
          },
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: tabBarColor || GLOBAL_COLORS.videoContentBG,
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
          tabBarItemStyle:
            !isEqualWidth || isSmallScreen
              ? styles.defaultTabBarItemStyle
              : styles.equalWidthTabBarItemStyle,
          tabBarScrollEnabled: !isEqualWidth || isSmallScreen,
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
    paddingVertical: 0,
    paddingHorizontal: 5,
    width: "auto",
    // width: 45,
    flexWrap: "nowrap",
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
