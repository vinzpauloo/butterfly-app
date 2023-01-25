import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Entypo from "react-native-vector-icons/Entypo";
import { MasonryFlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Video = ({ item }: any) => {
  const navigation = useNavigation<any>();
  const videoHeight = item.type === "horizontal" ? width * 0.3 : width * 0.5;
  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      image: item,
      title: "Mark",
      subTitle: "123456789",
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.videoContainer}
      onPress={handlePress}
    >
      <View>
        <Image
          source={item.video}
          style={[styles.video, { height: videoHeight }]}
        />
        <Text style={[styles.text, styles.title]}>Title and Description</Text>
      </View>
      <View style={styles.textContent}>
        <Text style={styles.text}>Nana Taipei</Text>
        <Entypo name="dots-three-vertical" color={"#fff"} />
      </View>
    </TouchableOpacity>
  );
};

const GridVideos = ({ videos, padding = 0 }) => {
  return (
    <MasonryFlashList
      numColumns={2}
      data={videos}
      renderItem={({ item }: any) => <Video item={item} />}
      keyExtractor={(item, index) => "" + index}
    />
  );
};

export default GridVideos;

const styles = StyleSheet.create({
  videoContainer: {
    margin: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  video: {
    width: "100%",
  },
  textContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  title: {
    paddingHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
});
