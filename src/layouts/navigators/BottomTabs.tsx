import React, { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { globalStyle } from "../../globalStyles";
import { BackHandler, Dimensions, StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'; 

const BottomTab = createBottomTabNavigator();

const BottomTabs = ({ data }) => {
  const isBottomTabShown = useIsFocused();
  const navigation = useNavigation<any>();
  const [showConfirmExitText, setShowConfirmExitText] = useState(false);

  const confirmExit = () => {
    setShowConfirmExitText(true)
    setTimeout(() => setShowConfirmExitText(false), 2000);
    showConfirmExitText ? BackHandler.exitApp() : null
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    isBottomTabShown ? confirmExit() : navigation.goBack()
    return true
  })

  return (
    <>
      <BottomTab.Navigator
        detachInactiveScreens={true}
        screenOptions={{
          lazy: true,
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
              unmountOnBlur: item.unmountOnBlur
            }}
          />
        ))}
      </BottomTab.Navigator>
      {showConfirmExitText ?
        <Animated.Text
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.confirmExitText}>再按一次退出
        </Animated.Text>
        : null
      }
    </>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  confirmExitText: {
    backgroundColor: "#0072E1",
    position: "absolute",
    zIndex: 1,
    color: "white",
    bottom: 80,
    padding: 12,
    borderRadius: 6,
    left: (Dimensions.get("window").width / 2) - 54.5,
  }
})
