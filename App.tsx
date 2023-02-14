import { StatusBar } from "react-native";
import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import StackNavigators from "layouts/navigators/StackNavigators";
import { globalStyle } from "globalStyles";
import { stackScreens } from "data/stackScreens";
import { NativeBaseProvider } from "native-base";
import { enableLayoutAnimations } from "react-native-reanimated";

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

const sampleFetch = async (url: string) => {
  try {
    const options = {
      // withCredentials: true,
    };
    const response = await axios.get(url, options);
    console.log("Fetch success", response);
  } catch (err) {
    let error;
    if (err && err instanceof AxiosError)
      error = "*" + err.response?.data.message;
    else if (err && err instanceof Error) error = err.message;

    console.log("Error", error);
  }
};

export default function App() {
  useEffect(() => {
    // initializePusher();
    // sampleFetch("http://192.168.50.9/api/test");
  }, []);
  
  // prevent screens UI going under the screen header
  enableLayoutAnimations(false)
  return (
    //Provide the client to your App
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
