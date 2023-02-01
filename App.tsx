import { StatusBar } from "react-native";
import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import axios, { AxiosError } from "axios";

import StackNavigators from "layouts/navigators/StackNavigators";
import { globalStyle } from "globalStyles";
import { stackScreens } from "data/stackScreens";

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

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={globalStyle.primaryColor}
      />
      <StackNavigators data={stackScreens} />
    </NavigationContainer>
  );
}
