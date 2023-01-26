import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Entypo from "react-native-vector-icons/Entypo";
import { MasonryFlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import Container from "components/Container";
import girl from "assets/images/girl.jpg";
import GridVideos from "features/sectionList/components/GridVideos";
import NoFollowingImg from "assets/images/nofollowing.png";
import { followImages } from "data/gridImages";
import { globalStyle } from "globalStyles";
import { multipleImages } from "data/gridImages";
import DividerContainer from "features/sectionList/components/DividerContainer";

const { width } = Dimensions.get("window");

const Video = ({ item, index }: any) => {
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate("SingleVideo", {
      image: item,
      title: "Mark",
      subTitle: "123456789",
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.videoContainer,
        index % 2 === 0 ? { marginRight: 5 } : { marginLeft: 5 },
      ]}
      onPress={handlePress}
    >
      <View>
        <Image source={item.video} style={styles.video} />
        <Text style={[styles.text, styles.title]}>Title and Description</Text>
      </View>
      <View style={styles.textContent}>
        <Text style={styles.text}>Nana Taipei</Text>
        <Entypo name="dots-three-vertical" color={"#fff"} />
      </View>
    </TouchableOpacity>
  );
};

const NoFollowing = () => {
  return (
    <>
      <Image source={NoFollowingImg} style={styles.image} />
      <Text style={styles.popular}>近期热门用户</Text>
      {[...Array(6)].map((_, index) => (
        <React.Fragment key={index}>
          <View style={styles.usersCategoryContainer}>
            <View style={styles.headerContent}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={girl} style={styles.modelImg} />
                <Text style={styles.modelName}>Applecptv</Text>
              </View>
              <TouchableOpacity activeOpacity={1} style={styles.followBtn}>
                <Text style={styles.followText}>关注</Text>
              </TouchableOpacity>
            </View>
            <MasonryFlashList
              numColumns={2}
              data={multipleImages.slice(0, 2)}
              renderItem={({ item, index }: any) => (
                <Video item={item} index={index} />
              )}
              keyExtractor={(_, index) => "" + index}
            />
          </View>
          <DividerContainer />
        </React.Fragment>
      ))}
    </>
  );
};

const Following = () => {
  const noFollowing = true;
  return (
    <ScrollView>
      <Container>
        {noFollowing ? (
          <NoFollowing />
        ) : (
          <GridVideos videos={followImages} isFollowingScreen={true} />
        )}
      </Container>
    </ScrollView>
  );
};

export default Following;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 150,
    resizeMode: "contain",
  },
  popular: {
    color: "#fff",
    borderLeftColor: globalStyle.secondaryColor,
    borderLeftWidth: 3,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  usersCategoryContainer: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modelImg: {
    height: 26,
    width: 26,
    borderRadius: 13,
  },
  modelName: {
    color: "#fff",
    marginHorizontal: 5,
  },
  followBtn: {
    backgroundColor: globalStyle.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 2,
  },
  followText: {
    color: "#fff",
    textAlign: "center",
  },
  videoContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#fff",
  },
  video: {
    width: "100%",
    height: width * 0.3,
  },
  textContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  title: {
    paddingHorizontal: 5,
    fontSize: 16,
  },
  text: {
    color: "#fff",
  },
});
