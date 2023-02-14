import { StatusBar } from "react-native";
import { useEffect } from "react";

import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enableLayoutAnimations } from "react-native-reanimated";
import axios from "axios";
import * as Sentry from "sentry-expo";

import StackNavigators from "layouts/navigators/StackNavigators";
import { globalStyle } from "globalStyles";
import { stackScreens } from "data/stackScreens";

//Sentry
Sentry.init({
  dsn: "https://45271b1978a24cf7ae4c379a7dca5770@o4504672042745856.ingest.sentry.io/4504672045498368",
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

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
