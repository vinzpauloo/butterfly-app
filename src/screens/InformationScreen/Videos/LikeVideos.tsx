import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
import { useDisclose } from "native-base";

import Modal from "components/BottomModal";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import VideoComponent from "components/VideoComponent";

export const GridVideosBottomContent = ({ onOpen, username, setId, id }) => {
  const handlePress = (event) => {
    setId(id);
    onOpen(event);
  };
  return (
    <View style={styles.textContent}>
      <Text style={styles.username} numberOfLines={1}>
        {username}
      </Text>
      <Pressable style={{ padding: 4 }} onPress={handlePress}>
        <Entypo
          name="dots-three-vertical"
          color={GLOBAL_COLORS.inactiveTextColor}
        />
      </Pressable>
    </View>
  );
};

export const Video = ({ item, onOpen, setId }: any) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const videoHeight =
    item.works.orientation === "Landscape" ? width * 0.3 : width * 0.5;
  const handlePress = () => {
    if (item.works.orientation === "Landscape") {
      navigation.navigate("SingleVideo", {
        id: item.works?._id,
      });
    } else {
      navigation.navigate("VlogScreen", {
        id: item.works?._id,
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
        <VideoComponent item={{ ...item.works, ...item }} />
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + item.works.thumbnail_url }}
          style={[styles.video, { height: videoHeight }]}
        />
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.titleContent}>
          <Text style={[styles.text, styles.title]} numberOfLines={2}>
            {item?.works.title}
          </Text>
        </View>
        <GridVideosBottomContent
          username={item?.user?.username}
          onOpen={onOpen}
          setId={setId}
          id={item._id}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function LikeVideos({ data }) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [id, setId] = useState<number | null>(null);

  return (
    <View style={styles.gridVideoContainer}>
      <MasonryList
        // estimatedItemSize={166}
        numColumns={2}
        data={data}
        renderItem={({ item }: any) => (
          <Video item={item} onOpen={onOpen} setId={setId} />
        )}
        keyExtractor={(_, index) => "" + index}
      />

      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  gridVideoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  thumbnailContainer: {
    position: "relative",
  },
  videoContainer: {
    margin: 5,
  },
  video: {
    width: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  textContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  bottomContent: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  titleContent: {
    height: 40,
    marginBottom: 3,
  },
  title: {
    paddingHorizontal: 5,
    fontSize: 15,
  },
  text: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  username: {
    color: GLOBAL_COLORS.usernameTextColor,
    fontSize: 13,
  },
  modelImg: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  modelText: {
    fontSize: 12,
    color: GLOBAL_COLORS.usernameTextColor,
    paddingHorizontal: 5,
  },
  modelLikeCount: {
    fontSize: 12,
    color: GLOBAL_COLORS.primaryTextColor,
    paddingHorizontal: 5,
  },
  videoComponents: {
    position: "absolute",
    zIndex: 10,
  },
  videoIcon: {
    width: 15,
    height: 15,
  },
});
