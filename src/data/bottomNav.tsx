import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";

import AccountTab from "screens/Account";
import Chat from "screens/Chat";
import HomeTab from "screens/Home";
import Vlog from "screens/Vlog";

export const bottomNav = [
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
    unmountOnBlur: true,
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
    component: AccountTab,
    label: "我的",
    icon: ({ color, size }) => (
      <Octicons name="person" color={color} size={size} />
    ),
  },
];
