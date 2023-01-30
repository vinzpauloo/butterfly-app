import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import Container from "components/Container";
import Feather from "react-native-vector-icons/Feather";
import banner2 from "assets/images/banner2.jpg";
import girl from "assets/images/girl.jpg";
import { globalStyle } from "globalStyles";
import Octicons from "react-native-vector-icons/Octicons";

const { width } = Dimensions.get("window");

const HeaderComponent = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Image source={girl} style={styles.modelImg} />
        <View>
          <Text style={styles.headerTitle}>FC2</Text>
          <Text style={styles.headerSubTitle}>SubTitle</Text>
          <Text style={styles.headerSubTitle}>Description</Text>
        </View>
      </View>
      <Pressable style={styles.followBtn}>
        <Feather name="plus" color="#fff" />
        <Text style={styles.followText}>关注</Text>
      </Pressable>
    </View>
  );
};

const VideoContainer = () => {
  return (
    <View style={styles.videoContainer}>
      <View style={styles.videoContent}>
        <Image source={banner2} style={styles.video} />
        <View style={styles.watchCount}>
          <Octicons name="video" size={15} color="#fff" />
          <Text style={styles.watchCountText}>105.1w</Text>
        </View>
        <Text style={styles.watchDurationText}>52:49</Text>
      </View>
      <Text style={styles.title}>Search Videos Layout</Text>
    </View>
  );
};

const ModelVideosContainer = () => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <HeaderComponent />
      <View style={styles.modelVideosContainer}>
        {[1, 2, 3].map((_, index) => (
          <VideoContainer key={index} />
        ))}
      </View>
      <Text style={styles.seeMoreBtn}>See more videos button</Text>
    </View>
  );
};

const Users = () => {
  return (
    <Container>
      <ScrollView>
        {[...Array(6)].map((_, index) => (
          <ModelVideosContainer key={index} />
        ))}
      </ScrollView>
    </Container>
  );
};

export default Users;

const styles = StyleSheet.create({
  //Header component
  headerContainer: {
    flexDirection: "row",
    marginVertical: 10,

    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
  },
  modelImg: {
    marginRight: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
  },
  headerSubTitle: {
    color: "#aaa",
    fontSize: 12,
  },
  followBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: globalStyle.secondaryColor,
  },
  followText: {
    color: "#fff",
    marginHorizontal: 5,
  },
  //Video Container
  videoContainer: {
    // marginHorizontal: 5,
  },
  videoContent: {
    position: "relative",
  },
  watchCount: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 5,
    left: 5,
    zIndex: 5,
  },
  watchDurationText: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 7,
    right: 5,
    zIndex: 5,
    color: "#fff",
    fontSize: 10,
  },
  watchCountText: {
    color: "#fff",
    fontSize: 10,
    marginHorizontal: 5,
  },
  video: {
    borderRadius: 5,
    width: width * 0.3,
    height: 80,
    resizeMode: "cover",
  },
  //Model Videos Container
  modelVideosContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#aaa",
    marginVertical: 2,
  },
  seeMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    color: globalStyle.secondaryColor,
    textAlign: "center",
  },
});
