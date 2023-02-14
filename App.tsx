import { StatusBar } from "react-native";
import { useEffect } from "react";

import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enableLayoutAnimations } from "react-native-reanimated";
import axios from "axios";

import StackNavigators from "layouts/navigators/StackNavigators";
import { globalStyle } from "globalStyles";
import { stackScreens } from "data/stackScreens";

import {initializeSentry} from "./src/services/sentry";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// Set axios defaults
axios.defaults.headers.common["Accept"] = "application/json";

export default function App() {

  useEffect(() => {
    // initializePusher();
    initializeSentry();
  }, []);
  
  // prevent screens UI going under the screen header
  enableLayoutAnimations(false)
  return (
    // Set app providers
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <NavigationContainer>
          <StatusBar
            barStyle={"light-content"}
            backgroundColor={globalStyle.primaryColor}
          />
          <StackNavigators data={stackScreens} />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
