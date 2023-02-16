import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";
import { MasonryFlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { Center, NativeBaseProvider, useDisclose } from "native-base";

import { GLOBAL_COLORS } from "global";
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
        <Foundation
          name="heart"
          size={18}
          color={GLOBAL_COLORS.secondaryColor}
        />
        <Text style={styles.modelText}>39.2w</Text>
      </View>
    </View>
  );
};

const GridVideosBottomContent = ({ onOpen, username, setId, id }) => {
  const handlePress = (event) => {
    setId(id);
    onOpen(event);
  };
  return (
    <View style={styles.textContent}>
      <Text style={styles.text} numberOfLines={1}>
        {username}
      </Text>
      <Pressable
        style={{
          height: 15,
          width: 15,
          alignItems: "center",
        }}
        onPress={handlePress}
      >
        <Entypo name="dots-three-vertical" color={"#fff"} />
      </Pressable>
    </View>
  );
};

const AdsContainer = ({ item, isFollowingScreen, onOpen, setId }: any) => {
  const handlePress = () => {};
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.videoContainer}
      onPress={handlePress}
    >
      <View style={styles.thumbnailContainer}>
        <VIPTag isAbsolute={true} />
        <Image
          source={{ uri: item.photo_url }}
          style={[styles.video, { height: width * 0.3 }]}
        />
      </View>

      <View style={styles.titleContent}>
        <Text style={[styles.text, styles.title]} numberOfLines={2}>
          {item?.title}
        </Text>
      </View>
      {isFollowingScreen ? (
        <FollowingBottomContent item={item} />
      ) : (
        <GridVideosBottomContent
          username={item?.username}
          onOpen={onOpen}
          setId={setId}
          id={item._id}
        />
      )}
    </TouchableOpacity>
  );
};

const Video = ({ item, isFollowingScreen, onOpen, setId }: any) => {
  const navigation = useNavigation<any>();
  const videoHeight =
    item.orientation === "Landscape" ? width * 0.3 : width * 0.5;
  const handlePress = () => {
    if (item.orientation === "Landscape") {
      navigation.navigate("SingleVideo", {
        image: item?.user.photo,
        username: item?.user?.username,
        followers: "123456789",
        id: item?._id,
      });
    } else {
      navigation.navigate("VlogScreen", {
        reelsVideos: reelsVideos,
      });
    }
  };

  if (item?.username === "Ads") {
    return (
      <AdsContainer
        item={item}
        isFollowingScreen={isFollowingScreen}
        onOpen={onOpen}
      />
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.videoContainer}
      onPress={handlePress}
    >
      <View style={styles.thumbnailContainer}>
        <VIPTag isAbsolute={true} />
        <Image
          source={{ uri: item.thumbnail_url }}
          style={[styles.video, { height: videoHeight }]}
        />
      </View>

      <View style={styles.titleContent}>
        <Text style={[styles.text, styles.title]} numberOfLines={2}>
          {item?.title}
        </Text>
      </View>
      {isFollowingScreen ? (
        <FollowingBottomContent item={item} />
      ) : (
        <GridVideosBottomContent
          username={item?.user?.username}
          onOpen={onOpen}
          setId={setId}
          id={item._id}
        />
      )}
    </TouchableOpacity>
  );
};

const GridVideos = ({ data, isFollowingScreen = false }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [id, setId] = useState<number | null>(null);

  return (
    <View style={styles.gridVideoContainer}>
      <MasonryFlashList
        estimatedItemSize={166}
        numColumns={2}
        data={data}
        renderItem={({ item }: any) => (
          <Video
            item={item}
            isFollowingScreen={isFollowingScreen}
            onOpen={onOpen}
            setId={setId}
          />
        )}
        keyExtractor={(_, index) => "" + index}
      />

      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </View>
  );
};

export default GridVideos;

const styles = StyleSheet.create({
  gridVideoContainer: {
    flex: 1,
    minHeight: 100,
    paddingHorizontal: 10,
  },
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
  titleContent: {
    height: 35,
    marginBottom: 5,
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
