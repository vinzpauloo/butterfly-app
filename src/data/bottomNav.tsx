import { Image, StyleSheet } from "react-native";

import AccountTab from "screens/Account";
import BottomTabs from "layouts/navigators/BottomTabs";
import Chat from "screens/Chat";
import HomeTab from "screens/Home";
import MainProfile from "screens/MainProfile";
import Vlog from "screens/Vlog";

import HomeActive from "assets/images/homeActive.png";
import HomeInactive from "assets/images/homeInactive.png";
import VlogActive from "assets/images/vlogActive.png";
import VlogInactive from "assets/images/vlogInactive.png";
import ChatActive from "assets/images/chatActive.png";
import ChatInactive from "assets/images/chatInactive.png";
import AccountActive from "assets/images/accountActive.png";
import AccountInactive from "assets/images/accountInactive.png";
import { translationStore } from "../zustand/translationStore";

const BottomNav = () => {
  const translations = translationStore((state) => state.translations);

  const bottomNav = [
    {
      name: "HomeTab",
      component: HomeTab,
      label: translations.home,
      icon: ({ color, focused, size }) => (
        // <Feather name="home" color={color} size={size} />
        <Image
          style={styles.image}
          source={focused ? HomeActive : HomeInactive}
        />
      ),
    },
    {
      name: "Vlog",
      component: Vlog,
      label: translations.vlog,
      unmountOnBlur: true,
      icon: ({ color, focused, size }) => (
        // <MaterialCommunityIcons
        //   name="play-box-outline"
        //   color={color}
        //   size={size}
        // />
        <Image
          style={styles.image}
          source={focused ? VlogActive : VlogInactive}
        />
      ),
    },
    {
      name: "Chat",
      component: Chat,
      label: translations.chat,
      icon: ({ color, focused, size }) => (
        // <Ionicons name="chatbubbles-outline" color={color} size={size} />
        <Image
          style={styles.image}
          source={focused ? ChatActive : ChatInactive}
        />
      ),
    },
    {
      name: "Account",
      component: MainProfile, // AccountTab
      label: translations.account,
      icon: ({ color, focused, size }) => (
        // <Octicons name="person" color={color} size={size} />
        <Image
          style={styles.image}
          source={focused ? AccountActive : AccountInactive}
        />
      ),
    },
  ];

  return <BottomTabs data={bottomNav} />;
};

export default BottomNav;

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
});
