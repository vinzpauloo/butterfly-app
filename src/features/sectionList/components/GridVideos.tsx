import {
  Dimensions,
  Image,
  Pressable,
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
import { Center, NativeBaseProvider, useDisclose } from "native-base";

import { globalStyle } from "globalStyles";
import { reelsVideos } from "data/reelsVideos";
import Modal from "components/BottomModal";
import VIPTag from "components/VIPTag";

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

const GridVideosBottomContent = ({ onOpen }) => {
  return (
    <View style={styles.textContent}>
      <Text style={styles.text}>Nana Taipei</Text>
      <Pressable
        style={{
          height: 15,
          width: 15,
          alignItems: "center",
        }}
        onPress={onOpen}
      >
        <Entypo name="dots-three-vertical" color={"#fff"} />
      </Pressable>
    </View>
  );
};

const Video = ({ item, isFollowingScreen, onOpen }: any) => {
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
      <View style={styles.thumbnailContainer}>
        <VIPTag isAbsolute={true} />
        <Image
          source={item.video}
          style={[styles.video, { height: videoHeight }]}
        />
      </View>

      <Text style={[styles.text, styles.title]}>Title and Description</Text>
      {isFollowingScreen ? (
        <FollowingBottomContent item={item} />
      ) : (
        <GridVideosBottomContent onOpen={onOpen} />
      )}
    </TouchableOpacity>
  );
};

const GridVideos = ({ videos, isFollowingScreen = false }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <View style={{flex: 1}}>
      <MasonryFlashList
        estimatedItemSize={166}
        numColumns={2}
        data={videos}
        renderItem={({ item }: any) => (
          <Video
            item={item}
            isFollowingScreen={isFollowingScreen}
            onOpen={onOpen}
          />
        )}
        keyExtractor={(_, index) => "" + index}
      />

      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </View>
  );
};

export default GridVideos;

const styles = StyleSheet.create({
  thumbnailContainer: {
    position: "relative",
  },
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
