import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import React from "react";

import { GLOBAL_COLORS } from "global";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Video = ({ item, index, data, all }: any) => {
  const { video } = item;

  const prevArray = all.slice(0, index); // the prev id of the works
  const nextArray = all.slice(index, all.length); // the work id that been click and the next id of that videos

  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate("VlogScreen", {
      id: video._id,
      // all: nextArray.concat(prevArray), // add the prev id's to the next id's and it will go to the end part of the array
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.feedContent,
        index === 0 ? { marginLeft: 15 } : null,
        index === data.length - 1 ? { marginRight: 15 } : null,
      ]}
      activeOpacity={1}
    >
      <Image source={{ uri: video.thumbnail_url }} style={styles.image} />
      <Image source={{ uri: video.user.photo }} style={styles.modelImg} />
      <View style={styles.textContent}>
        <Text style={styles.text} numberOfLines={2}>
          {video.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const VerticalSlider = ({ data, all }) => {
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
        <Video key={index} item={item} index={index} data={data} all={all} />
      )}
    />
  );
};

export default VerticalSlider;

const styles = StyleSheet.create({
  feedContent: {
    height: 250,
    width: width * 0.33,
    marginHorizontal: 3,
    position: "relative",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  modelImg: {
    position: "absolute",
    height: 40,
    width: 40,
    borderRadius: 20,
    top: 15,
    left: 15,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    borderWidth: 1,
  },
  textContent: {
    position: "absolute",
    bottom: 0,
    height: 40,
    width: width * 0.33,
    backgroundColor: "rgba(0,0,0, 0.3)",
    padding: 3,
  },
  text: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 14,
  },
});
