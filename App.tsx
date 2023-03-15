import { StatusBar } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";

import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { enableLayoutAnimations } from "react-native-reanimated";
import axios from "axios";

import localications from "i18n/localizations";
import StackNavigators from "layouts/navigators/StackNavigators";
import { GLOBAL_COLORS } from "global";
import { stackScreens } from "data/stackScreens";
import { initializeSentry } from "services/sentry";

const langDict = (key) => localications[key];

const LanguageContext = createContext(null);

function LanguageProvider({ initialState = "en", children }) {
  const [lang, setLang] = useState(initialState);

  return (
    <LanguageContext.Provider value={[langDict(lang), setLang]}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

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
    initializeSentry();
  }, []);

  // prevent screens UI going under the screen header
  enableLayoutAnimations(false);

  return (
    // Set app providers
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <NavigationContainer>
            <StatusBar
              barStyle={"light-content"}
              backgroundColor={GLOBAL_COLORS.primaryColor}
            />
            <StackNavigators data={stackScreens} />
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}
