import { StatusBar } from "react-native";
import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";

import StackNavigators from "layouts/navigators/StackNavigators";
import { globalStyle } from "globalStyles";

export default function App() {
  useEffect(() => {
    // initializePusher();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={globalStyle.primaryColor}
      />
      <StackNavigators />
    </NavigationContainer>
  );
}
