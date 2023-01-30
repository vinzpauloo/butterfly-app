import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Container from "components/Container";
import Banner10 from "assets/images/banner10.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfilePhoto from "assets/images/profilePhoto.jpg";
import { useNavigation } from "@react-navigation/native";
import { globalStyle } from "globalStyles";

const { height, width } = Dimensions.get("window");

const sampleData = [
  {
    number: 7,
    text: "Following",
  },
  {
    number: 12724,
    text: "Fans",
  },
  {
    number: 0,
    text: "Total Likes",
  },
];

const ProfileBanner = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.bannerContainer}>
      <ImageBackground
        source={Banner10}
        resizeMode="cover"
        style={styles.bgImg}
      />
      <Ionicons
        name="chevron-back"
        color="#fff"
        size={30}
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      <Ionicons
        name="md-chatbox-ellipses-outline"
        color="#fff"
        size={25}
        style={styles.messageIcon}
        onPress={() => navigation.goBack()}
      />
      <Image source={ProfilePhoto} style={styles.profileImg} />
      <View style={styles.usernameContainer}>
        <View style={styles.usernameContent}>
          <Text style={styles.usernameText}>Nana Taipie</Text>
          <Text style={styles.usernameUp}>UP</Text>
        </View>
        <Pressable style={styles.followBtn}>
          <Text style={styles.followText}>关注</Text>
        </Pressable>
      </View>
      <Text style={styles.description}>
        To work or act as a fashion or art model
      </Text>
      <View style={styles.summaryContainer}>
        {sampleData.map((item, index) => (
          <View
            style={[
              styles.summaryContent,
              index === 1
                ? {
                    borderLeftColor: "#bbb",
                    borderRightColor: "#bbb",
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  }
                : null,
            ]}
          >
            <Text style={styles.summaryNumber}>{item.number}</Text>
            <Text style={styles.summaryText}>{item.text}</Text>
          </View>
        ))}
        {/* <View style={styles.summaryContent}>
          <Text style={styles.summaryNumber}>7</Text>
          <Text style={styles.summaryText}>Following</Text>
        </View>
        <View
          style={[
            styles.summaryContent,
            {
              borderLeftColor: "#bbb",
              borderRightColor: "#bbb",
              borderLeftWidth: 1,
              borderRightWidth: 1,
            },
          ]}
        >
          <Text style={styles.summaryNumber}>12724</Text>
          <Text style={styles.summaryText}>Fans</Text>
        </View>
        <View style={styles.summaryContent}>
          <Text style={styles.summaryNumber}>0</Text>
          <Text style={styles.summaryText}>Total Likes</Text>
        </View> */}
      </View>
    </View>
  );
};

const Donators = () => {
  return (
    <View style={styles.donatorContainer}>
      <View style={styles.profilesImagesContent}>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <Image
            source={ProfilePhoto}
            style={[styles.profileImgs, { zIndex: index, left: index * 20 }]}
          />
        ))}
      </View>
      <View style={styles.buttons}>
        <Text style={styles.donateText}>5 Donator Count</Text>
        <Pressable style={styles.donateBtn}>
          <Text style={styles.donateText}>Donate</Text>
        </Pressable>
      </View>
    </View>
  );
};

const index = () => {
  return (
    <Container>
      <ProfileBanner />
      <Donators />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  //ProfileBanner
  bannerContainer: {
    height: height * 0.3,
    width: width,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  bgImg: {
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    width: width,
    position: "absolute",
  },
  backIcon: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  messageIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    transform: [{ scaleX: -1 }],
  },
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: globalStyle.secondaryColor,
  },
  usernameContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  usernameContent: {
    flexDirection: "row",
  },
  usernameText: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  usernameUp: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#fff",
    fontSize: 10,
    backgroundColor: globalStyle.secondaryColor,
    paddingHorizontal: 4,
    borderRadius: 3,
    fontWeight: "bold",
  },
  followBtn: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: globalStyle.secondaryColor,
    borderRadius: 12,
  },
  followText: {
    color: "#fff",
    fontSize: 14,
  },
  description: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  summaryContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  summaryContent: {
    width: width / 3,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  summaryText: {
    color: "#bbb",
  },

  //Donators
  donatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#262632",
    marginTop: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  profilesImagesContent: {
    position: "relative",
    height: 40,
  },
  profileImgs: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
  donateBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: globalStyle.secondaryColor,
    borderRadius: 4,
    marginLeft: 10,
  },
  donateText: {
    color: "#fff",
  },
});
