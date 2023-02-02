import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";

import * as Linking from "expo-linking";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// import { ScrollView } from "react-native-gesture-handler";
import { globalStyle } from "globalStyles";
import { useDisclose } from "native-base";
import CenteredModal from "components/CenteredModal";

const adsURL = "https://google.com/";

const { width, height } = Dimensions.get("window");

const sampleData = [
  "Lorem ipsum dolor sit amet",
  "Consectetur adipiscing elit",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  "Ut enim ad minim veniam",
  "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
  "Excepteur sint occaecat cupidatat non proident",
  "sunt in culpa qui officia deserunt mollit anim id est laborum",
];

const Content = ({ onClose }) => {
  const handleAdPress = () => {
    Linking.openURL(adsURL);
  };

  return (
    <Pressable style={styles.content}>
      <MaterialCommunityIcons
        name="bell-ring"
        size={50}
        color="#cdcffe"
        style={styles.bellIcon}
      />
      <Text style={styles.title}>Announcement</Text>
      <ScrollView style={styles.textsContent}>
        <View>
          {sampleData.map((text, index) => (
            <Text key={index} style={styles.text}>
              {text}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={handleAdPress}>
          <Text style={styles.buttonText}>App Store</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>I know</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const Announcement = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  useEffect(() => {
    //@ts-ignore
    onOpen(() => true);
  }, []);

  return (
    <CenteredModal isOpen={isOpen} onClose={onClose}>
      <Content onClose={onClose} />
    </CenteredModal>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    color: globalStyle.inactiveTextColor,
  },
  content: {
    height: 380,
    width: width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    padding: 15,
  },
  bellIcon: {
    transform: [{ rotateZ: "20deg" }],
    marginBottom: 20,
  },
  textsContent: {
    width: "100%",
    height: 220,
  },
  text: {
    marginVertical: 5,
    color: globalStyle.inactiveTextColor,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  button: {
    backgroundColor: globalStyle.secondaryColor,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
  },
});
