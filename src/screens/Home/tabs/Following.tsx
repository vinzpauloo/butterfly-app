import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Entypo from "react-native-vector-icons/Entypo";
import { MasonryFlashList } from "@shopify/flash-list";
import { Center, NativeBaseProvider, useDisclose } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import Container from "components/Container";
import DividerContainer from "features/sectionList/components/DividerContainer";
import girl from "assets/images/girl.jpg";
import GridVideos from "features/sectionList/components/GridVideos";
import NoFollowingImg from "assets/images/nofollowing.png";
import { followImages } from "data/gridImages";
import { globalStyle } from "globalStyles";
import { NoFollowingImages } from "data/gridImages";
import { reelsVideos } from "data/reelsVideos";
import Modal from "components/BottomModal";
import VIPTag from "components/VIPTag";
import BottomMessage from "components/BottomMessage";

const { width } = Dimensions.get("window");

const Video = ({ item, index, onOpen }: any) => {
  const navigation = useNavigation<any>();
  const handlePress = () => {
    if (item.type === "horizontal") {
      navigation.navigate("SingleVideo", {
        image: item.video,
        title: "Mark",
        subTitle: "123456789",
      });
    } else {
      navigation.navigate("VlogScreen", {
        reelsVideos: reelsVideos,
      });
    }
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
      <View style={styles.thumbnailContainer}>
        <VIPTag isAbsolute={true} />
        <Image source={item.video} style={styles.video} />
      </View>
      <Text style={[styles.text, styles.title]}>Title and Description</Text>
      <View style={styles.textContent}>
        <Text style={styles.text}>Nana Taipei</Text>
        <Pressable
          style={{
            height: 15,
            width: 15,
            alignItems: "center",
          }}
          onPress={onOpen}
        >
          <Entypo name="dots-three-vertical" color={"#fff"} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const sampleData = [1, 2, 3, 4, 5, 6];

const NoFollowing = ({ onOpen }) => {
  return (
    <>
      <Image source={NoFollowingImg} style={styles.image} />
      <Text style={styles.popular}>近期热门用户</Text>
      {[...Array(6)].map((_, index) => (
        <View key={index}>
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
              data={NoFollowingImages}
              renderItem={({ item, index }: any) => (
                <Video item={item} index={index} onOpen={onOpen} />
              )}
              keyExtractor={(_, index) => "" + index}
            />
          </View>
          {sampleData.length - 1 !== index ? <DividerContainer /> : null}
        </View>
      ))}
      <BottomMessage />
    </>
  );
};

const Following = () => {
  const noFollowing = true;
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      <ScrollView>
        <Container>
          {noFollowing ? (
            <NoFollowing onOpen={onOpen} />
          ) : (
            <GridVideos videos={followImages} isFollowingScreen={true} />
          )}
        </Container>
      </ScrollView>
      <Center flex={1} px="3">
        <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Center>
    </>
  );
};

export default Following;

const styles = StyleSheet.create({
  thumbnailContainer: {
    position: "relative",
  },
  image: {
    width: width,
    height: 150,
    resizeMode: "cover",
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
