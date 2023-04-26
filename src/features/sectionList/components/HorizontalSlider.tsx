import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  VirtualizedList,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import VideoComponent from "components/VideoComponent";
import { GLOBAL_COLORS } from "global";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

const { width } = Dimensions.get("window");

const Video = ({ index, data, item }: any) => {
  const { video } = item;
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      id: video._id,
    });
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
            {video.title}
          </Text>
          <Text style={styles.username} numberOfLines={1}>
            {video.user.username}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const HorizontalSlider = ({ data }) => {
  return (
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
        <Video index={index} data={data} item={item} />
      )}
    />
  );
};

export default HorizontalSlider;

const styles = StyleSheet.create({
  thumbnailContainer: {
    position: "relative",
  },
  container: {
    borderColor: "#fff",
    borderWidth: 1,
    width: width * 0.7,
    height: 205,
    marginHorizontal: 5,
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
    width: width * 0.56,
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
