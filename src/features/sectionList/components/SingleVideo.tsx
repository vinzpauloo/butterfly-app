import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import VideoComponent from "components/VideoComponent";
import { GLOBAL_COLORS } from "global";

const SingleVideo = ({ data }) => {
  const item = data[0];
  console.log("!!!", item);

  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      id: item._id,
    });
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.thumbnailContainer}>
        <VideoComponent item={item} />
        <Image source={{ uri: item.thumbnail_url }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Image source={{ uri: item.user.photo }} style={styles.modelImg} />
        <View style={styles.texts}>
          <Text style={styles.text} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.username} numberOfLines={1}>
            {item.user.username}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SingleVideo;

const styles = StyleSheet.create({
  thumbnailContainer: {
    position: "relative",
  },
  container: {
    height: 200,
    marginHorizontal: 15,
  },
  image: {
    height: 160,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  modelImg: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginHorizontal: 5,
  },
  texts: {
    justifyContent: "space-evenly",
  },
  text: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 15,
  },
  username: {
    color: GLOBAL_COLORS.usernameTextColor,
    fontSize: 15,
  },
});
