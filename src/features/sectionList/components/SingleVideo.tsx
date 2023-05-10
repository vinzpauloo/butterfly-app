import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import React, { useState } from "react";

import VideoComponent from "components/VideoComponent";
import { GLOBAL_COLORS } from "global";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { HStack, useDisclose } from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import Modal from "components/BottomModal";

const { width } = Dimensions.get("window");

const SingleVideo = ({ data, isSingleVideoMultiple = false }) => {
  const item = isSingleVideoMultiple ? data : data[0];
  const { isOpen, onOpen, onClose } = useDisclose();
  const [id, setId] = useState<String | null>(null);

  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      id: item._id,
    });
  };

  const handlePressDots = (event) => {
    setId(item._id);
    onOpen();
  };

  return (
    <>
      <Pressable style={styles.container} onPress={handlePress}>
        <View style={styles.thumbnailContainer}>
          <VideoComponent item={item} />
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + item.thumbnail_url }}
            style={styles.image}
          />
        </View>
        <View style={styles.content}>
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + item.user.photo }}
            style={styles.modelImg}
          />
          <View style={styles.texts}>
            <Text style={styles.text} numberOfLines={1}>
              {item.title}
            </Text>
            <HStack alignItems="center" justifyContent="space-between">
              <Text style={styles.username} numberOfLines={1}>
                {item.user.username}
              </Text>
              <Pressable onPress={handlePressDots}>
                <Entypo
                  name="dots-three-vertical"
                  color={GLOBAL_COLORS.inactiveTextColor}
                />
              </Pressable>
            </HStack>
          </View>
        </View>
      </Pressable>
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </>
  );
};

export default SingleVideo;

const styles = StyleSheet.create({
  container: {
    height: width < 480 ? 200 : 360,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  thumbnailContainer: {
    position: "relative",
  },
  image: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: width < 480 ? 160 : 315,
    width: "100%",
  },
  content: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: "100%",
  },
  modelImg: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginHorizontal: 5,
  },
  texts: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  text: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 15,
  },
  username: {
    color: GLOBAL_COLORS.usernameTextColor,
    fontSize: 13,
  },
});
