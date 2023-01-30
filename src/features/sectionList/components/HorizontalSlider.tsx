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

import Ionicons from "react-native-vector-icons/Ionicons";

import { bannerImage } from "data/bannerImages";

const { width } = Dimensions.get("window");

const Video = ({ navigation, index, data, item }: any) => {
  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      image: item.video,
      title: "Mark",
      subTitle: "123456789",
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
      <Image source={item.video} style={styles.image} />
      <View style={styles.content}>
        <Ionicons
          name="person-circle-outline"
          size={40}
          color={"#fff"}
          onPress={() => navigation.navigate("SingleUser")}
        />
        <View style={styles.texts}>
          <Text style={styles.text}>The Color Green Frog</Text>
          <Text style={styles.text}>Frog</Text>
        </View>
      </View>
    </Pressable>
  );
};

const HorizontalSlider = ({ navigation }) => {
  return (
    <VirtualizedList
      horizontal
      showsHorizontalScrollIndicator={false}
      initialNumToRender={bannerImage.length}
      getItem={(_data: unknown, index: number) => ({
        id: index,
        video: bannerImage[index],
      })}
      getItemCount={() => bannerImage.length}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item, index }) => (
        <Video
          navigation={navigation}
          index={index}
          data={bannerImage}
          item={item}
        />
      )}
    />
  );
};

export default HorizontalSlider;

const styles = StyleSheet.create({
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
  },
  texts: {
    justifyContent: "space-evenly",
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
});
