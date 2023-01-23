import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./src/layouts/navigators/BottomTabs";
import { bottomNav } from "./src/data/bottomNav";

const Stack = createNativeStackNavigator();

export default function App() {
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
