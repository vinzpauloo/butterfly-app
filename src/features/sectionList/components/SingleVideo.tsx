import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import girl from "assets/images/girl.jpg";
import VideoComponent from "components/VideoComponent";

const SingleVideo = ({ data }) => {
  const item = data[0];
  console.log("!!!", item);

  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      image: girl,
      title: "Mark",
      subTitle: "123456789",
    });
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.thumbnailContainer}>
        <VideoComponent item={item} />
        <Image source={{ uri: item.thumbnail_url }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Image source={{ uri: item.thumbnail_url }} style={styles.modelImg} />
        <View style={styles.texts}>
          <Text style={styles.text} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            Frog
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
    color: "#fff",
    fontSize: 15,
  },
});
