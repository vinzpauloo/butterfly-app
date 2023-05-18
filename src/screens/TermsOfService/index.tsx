import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  StyleSheet,
  AppState,
} from "react-native";
import { HStack, VStack } from "native-base";
import { StackActions, useNavigation } from "@react-navigation/native";
import { GLOBAL_COLORS } from "global";
import * as Updates from "expo-updates";
import Buttons from "components/forms/Buttons";
import { translationStore } from "../../zustand/translationStore";

const TermsOfService = ({}) => {
  const navigation = useNavigation<any>();
  const { translations } = translationStore((store) => store);
  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === "active") {
      // reloads the app on coming back from tab
      Updates.reloadAsync();
    }
    setAppState(nextAppState);
  };

  AppState.addEventListener("change", handleAppStateChange);

  return (
    <ScrollView style={styles.container}>
      <VStack alignItems={"center"} space={7} p={5} mt={200}>
        <Text style={styles.title}>{translations.termsOfUseTitle}</Text>
        <View>
          <Text style={styles.info}>{translations.termsOfUseParagraph1}</Text>
          <Text style={styles.info}>{translations.termsOfUseParagraph2}</Text>
        </View>
        <HStack space={5}>
          <View style={styles.btnContainer}>
            <Buttons
              title={translations.enter}
              onPress={() =>
                navigation.dispatch(StackActions.replace("Preloading"))
              }
              color={"black"}
              backgroundColor={"#FFF"}
            />
          </View>
          <View style={styles.btnContainer}>
            <Buttons
              title={translations.no}
              // if possible change the - animation: "slide_from_right"
              // in StackScreen options, specifically for "OnAppExitScreen" to fade instead
              onPress={() => {
                navigation.navigate("OnAppExitScreen");
                BackHandler.exitApp();
              }}
              backgroundColor={"purple"}
              color={"white"}
            />
          </View>
        </HStack>
        <TouchableOpacity
          onPress={() => navigation.navigate("ServiceProvisions")}
        >
          <Text style={styles.tos}>{translations.termOfUse}</Text>
        </TouchableOpacity>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  title: {
    color: GLOBAL_COLORS.btnColor,
    fontSize: 20,
    fontWeight: "600",
  },
  info: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 12,
  },
  btnContainer: {
    width: 150,
  },
  tos: {
    color: "grey",
  },
});

export default TermsOfService;
