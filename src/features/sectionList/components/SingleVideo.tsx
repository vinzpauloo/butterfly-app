import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import banner10 from "assets/images/banner10.jpg";
import girl from "assets/images/girl.jpg";

const SingleVideo = () => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      image: girl,
      title: "Mark",
      subTitle: "123456789",
    });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handlePress}
    >
      <Image source={banner10} style={styles.image} />
      <View style={styles.content}>
        <Ionicons name="person-circle-outline" size={40} color={"#fff"} />
        <View style={styles.texts}>
          <Text style={styles.text}>The Color Green Frog</Text>
          <Text style={styles.text}>Frog</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SingleVideo;

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginHorizontal: 15,
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
