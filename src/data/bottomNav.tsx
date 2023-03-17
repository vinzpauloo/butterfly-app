import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";

import AccountTab from "screens/Account";
import BottomTabs from "layouts/navigators/BottomTabs";
import Chat from "screens/Chat";
import HomeTab from "screens/Home";
import Vlog from "screens/Vlog";
import { translationStore } from "../zustand/translationStore";

const BottomNav = () => {
  const translations = translationStore((state) => state.translations);

  const bottomNav = [
    {
      name: "Home",
      component: HomeTab,
      label: translations.home,
      icon: ({ color, size }) => (
        <Feather name="home" color={color} size={size} />
      ),
    },
    {
      name: "Vlog",
      component: Vlog,
      label: translations.vlog,
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
      label: translations.chat,
      icon: ({ color, size }) => (
        <Ionicons name="chatbubbles-outline" color={color} size={size} />
      ),
    },
    {
      name: "Account",
      component: AccountTab,
      label: translations.account,
      icon: ({ color, size }) => (
        <Octicons name="person" color={color} size={size} />
      ),
    },
  ];

  return <BottomTabs data={bottomNav} />;
};

export default BottomNav;
