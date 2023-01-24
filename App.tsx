import { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { bottomNav } from "data/bottomNav";
import BottomTabs from "layouts/navigators/BottomTabs";
import { initializePusher } from "services/pusher";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initializePusher();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="关注"
        screenOptions={{ animation: "slide_from_right" }}
      >
        <Stack.Screen name="关注" options={{ headerShown: false }}>
          {(props) => <BottomTabs {...props} data={bottomNav} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
