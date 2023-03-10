import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GLOBAL_COLORS } from "../../global";
import { BackHandler, Dimensions, StyleSheet, AppState  } from "react-native";
import { useIsFocused, useNavigation, StackActions } from "@react-navigation/native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import * as Updates from "expo-updates"

const BottomTab = createBottomTabNavigator();

const BottomTabs = ({ data }) => {
  const isBottomTabShown = useIsFocused();
  const navigation = useNavigation<any>();
  const [showConfirmExitText, setShowConfirmExitText] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = (nextAppState) => {
    if (showConfirmExitText && appState.match(/inactive|background/) && nextAppState === 'active') {
      // reloads the app on coming back from tab
      Updates.reloadAsync()
    }
    setAppState(nextAppState);
  }

  AppState.addEventListener('change', handleAppStateChange);
  
  const confirmExit = () => {
    setShowConfirmExitText(true);
    setTimeout(() => setShowConfirmExitText(false), 2000);
    if (showConfirmExitText) { navigation.navigate("OnAppExitScreen"); BackHandler.exitApp() }
  };

  BackHandler.addEventListener("hardwareBackPress", () => {
    isBottomTabShown ? confirmExit() : navigation.goBack();
    return true;
  });

  return (
    <>
      <BottomTab.Navigator
        detachInactiveScreens={true}
        screenOptions={{
          lazy: true,
          headerShown: false,
          tabBarActiveTintColor: GLOBAL_COLORS.secondaryColor,
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
              unmountOnBlur: item.unmountOnBlur,
            }}
          />
        ))}
      </BottomTab.Navigator>
      {showConfirmExitText ? (
        <Animated.Text
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.confirmExitText}
        >
          再按一次退出
        </Animated.Text>
      ) : null}
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
    left: Dimensions.get("window").width / 2 - 54.5,
  },
});
