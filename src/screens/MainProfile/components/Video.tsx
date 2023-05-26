import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import React from "react";

import Entypo from "react-native-vector-icons/Entypo";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { HStack, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import VideoComponent from "components/VideoComponent";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import { translationStore } from "../../../zustand/translationStore";

export default function Video({ item, onOpen, setId }) {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const translations = translationStore((state) => state.translations);
  const WIDTH_IMG = width < GLOBAL_SCREEN_SIZE.mobileMedium ? "40%" : "30%";
  const WIDTH_CONTENT = width < GLOBAL_SCREEN_SIZE.mobileMedium ? "60%" : "70%";

  const handlePressDots = (event) => {
    setId(item._id);
    onOpen(event);
  };

  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      id: item._id,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <HStack width="full" height="20" my="1.5">
        <VStack width={WIDTH_IMG} height="full" position="relative">
          <VideoComponent item={item} />
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + item.thumbnail_url }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%", borderRadius: 4 }}
          />
        </VStack>
        <VStack
          width={WIDTH_CONTENT}
          height="full"
          py="0.5"
          pl="2"
          justifyContent="space-between"
        >
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.subtitle}>
            {translations.duration}: {item.duration}
          </Text>
          <HStack alignItems="center" justifyContent="space-between">
            <Text style={styles.subtitle}>{item.user.username}</Text>
            <Pressable onPress={handlePressDots}>
              <Entypo
                name="dots-three-vertical"
                color={GLOBAL_COLORS.inactiveTextColor}
              />
            </Pressable>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  subtitle: {
    color: GLOBAL_COLORS.inactiveTextColor,
  },
});
