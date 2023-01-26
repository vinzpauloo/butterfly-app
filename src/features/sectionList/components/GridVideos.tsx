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
import Foundation from "react-native-vector-icons/Foundation";
import { MasonryFlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

import { globalStyle } from "globalStyles";
import { reelsVideos } from "data/reelsVideos";

const { width } = Dimensions.get("window");

const FollowingBottomContent = ({ item }) => {
  return (
    <View style={styles.textContent}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={item.video} style={styles.modelImg} />
        <Text style={styles.modelText}>Nana_taipei</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Foundation name="heart" size={18} color={globalStyle.secondaryColor} />
        <Text style={styles.modelText}>39.2w</Text>
      </View>
    </View>
  );
};

const GridVideosBottomContent = () => {
  return (
    <View style={styles.textContent}>
      <Text style={styles.text}>Nana Taipei</Text>
      <Entypo name="dots-three-vertical" color={"#fff"} />
    </View>
  );
};

const Video = ({ item, isFollowingScreen }: any) => {
  const navigation = useNavigation<any>();
  const videoHeight = item.type === "horizontal" ? width * 0.3 : width * 0.5;
  const handlePress = () => {
    if (item.type === "horizontal") {
      navigation.navigate("SingleVideo", {
        image: item.video,
        title: "Mark",
        subTitle: "123456789",
      });
    } else {
      navigation.navigate("VlogScreen", {
        reelsVideos: reelsVideos,
      });
    }
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
      {isFollowingScreen ? (
        <FollowingBottomContent item={item} />
      ) : (
        <GridVideosBottomContent />
      )}
    </TouchableOpacity>
  );
};

const GridVideos = ({ videos, isFollowingScreen = false }) => {
  return (
    <MasonryFlashList
      numColumns={2}
      data={videos}
      renderItem={({ item }: any) => (
        <Video item={item} isFollowingScreen={isFollowingScreen} />
      )}
      keyExtractor={(_, index) => "" + index}
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
    fontSize: 16,
  },
  text: {
    color: "#fff",
  },
  modelImg: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  modelText: {
    fontSize: 12,
    color: "#fff",
    paddingHorizontal: 5,
  },
});
