import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import BottomTabs from "./src/layouts/navigators/BottomTabs";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import HomeTab from "./src/screens/HomeTab";
import Vlog from "./src/screens/VlogTab";
import Chat from "./src/screens/ChatTab";
import Account from "./src/screens/AccountTab";

const Stack = createNativeStackNavigator();

const bottomNav = [
  {
    name: "Home",
    component: HomeTab,
    label: "首页",
    icon: ({ color, size }) => (
      <Feather name="home" color={color} size={size} />
    ),
  },
  {
    name: "Vlog",
    component: Vlog,
    label: "Vlog",
    icon: ({ color, size }) => (
      <MaterialCommunityIcons
        name="play-box-outline"
        color={color}
        size={size}
      />
    ),
  },
  {
    name: "Chat",
    component: Chat,
    label: "聊天",
    icon: ({ color, size }) => (
      <Ionicons name="chatbubbles-outline" color={color} size={size} />
    ),
  },
  {
    name: "Account",
    component: Account,
    label: "我的",
    icon: ({ color, size }) => (
      <Octicons name="person" color={color} size={size} />
    ),
  },
];

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
