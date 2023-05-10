import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  VirtualizedList,
} from "react-native";
import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import VideoComponent from "components/VideoComponent";
import { GLOBAL_COLORS } from "global";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { HStack, useDisclose } from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import Modal from "components/BottomModal";

const { width } = Dimensions.get("window");

const Video = ({ index, data, item, setId, onOpen }: any) => {
  const { video } = item;
  const navigation = useNavigation<any>();
  console.log("@@@", video);

  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      id: video._id,
    });
  };

  const handlePressDots = (event) => {
    setId(video._id);
    onOpen(event);
  };

  return (
    <Pressable
      style={[
        styles.container,
        index === 0 ? { marginLeft: 15 } : null,
        index === data.length - 1 ? { marginRight: 15 } : null,
      ]}
      onPress={handlePress}
    >
      <View style={styles.thumbnailContainer}>
        <VideoComponent item={video} />
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + video.thumbnail_url }}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Pressable
          onPress={() =>
            navigation.navigate("SingleUser", { userID: video.user_id })
          }
        >
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + video.user.photo }}
            style={styles.modelImg}
          />
        </Pressable>
        <View style={styles.texts}>
          <Text style={styles.text} numberOfLines={1}>
            Width: {width} | {video.title}
          </Text>
          <HStack alignItems="center" justifyContent="space-between">
            <Text style={styles.username} numberOfLines={1}>
              {video.user.username}
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
  );
};

const HorizontalSlider = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [id, setId] = useState<String | null>(null);
  return (
    <>
      <VirtualizedList
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={data.length}
        getItem={(_data: unknown, index: number) => ({
          id: index,
          video: data[index],
        })}
        getItemCount={() => data.length}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item, index }) => (
          <Video
            index={index}
            data={data}
            item={item}
            setId={setId}
            onOpen={onOpen}
          />
        )}
      />
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </>
  );
};

export default HorizontalSlider;

const styles = StyleSheet.create({
  thumbnailContainer: {
    position: "relative",
  },
  container: {
    width: width < 480 ? width * 0.7 : width * 0.45,
    marginHorizontal: 5,
    borderRadius: 4,
  },
  image: {
    height: 160,
    width: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  modelImg: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginHorizontal: 5,
  },
  texts: {
    justifyContent: "space-evenly",
    width: width < 480 ? width * 0.56 : width * 0.35,
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
