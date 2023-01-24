import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { FlatList } from "react-native-gesture-handler";
import { reelsImages } from "data/reelsImages";

const { width } = Dimensions.get("window");

const Video = ({ item, index, data, navigation }: any) => {
  const handlePress = () => {
    navigation.navigate("shortVideo");
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
      <Image source={item} style={styles.image} />
      <View style={styles.textContent}>
        <Text style={styles.text}>Title and Description</Text>
      </View>
    </TouchableOpacity>
  );
};

const VerticalSlider = ({ navigation }) => {
  return (
    <FlatList
      alwaysBounceHorizontal={true}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={reelsImages}
      renderItem={({ item, index }) => (
        <Video
          key={index}
          item={item}
          index={index}
          data={reelsImages}
          navigation={navigation}
        />
      )}
      keyExtractor={(_, index) => "" + index}
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
  textContent: {
    position: "absolute",
    bottom: 0,
    height: 40,
    width: width * 0.33,
    backgroundColor: "rgba(0,0,0, 0.3)",
    padding: 3,
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
});
