import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { GLOBAL_COLORS } from "global";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import VideoPlayer from "components/VideoPlayer";

const profile =
  "http://192.168.50.9/storage/resources/images/customer/Zetsuen-No-Tempest.png";

const images = [
  profile,
  profile,
  profile,
  profile,
  profile,
  profile,
  profile,
  //   profile,
  //   profile,
];

const { height, width } = Dimensions.get("window");

const Header = ({ user }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.profileContent}>
        <Image source={{ uri: user.photo }} style={styles.profilePhoto} />
        <Text style={styles.username}>{user.username}</Text>
      </View>
      <Pressable style={styles.privateBtn}>
        <Text style={styles.privateText}>私信</Text>
      </Pressable>
    </View>
  );
};

const Captions = ({ tags, story }) => {
  return (
    <View style={styles.captionContainer}>
      <View style={styles.tagsContainer}>
        {tags.map((item, index) => (
          <Text key={index} style={styles.tag}>
            {item}
          </Text>
        ))}
      </View>
      <Text style={styles.contentText}>{story}</Text>
    </View>
  );
};

const Images = ({ images }) => {
  const columnsCount = (picCount) => {
    switch (picCount) {
      case 1:
        return 1; // column
      case 2:
        return 2;
      case 4:
        return 2;
      default:
        return 3;
    }
  };
  const columnImageWidth = (picCount) => {
    switch (picCount) {
      case 1:
        return { width: width * 0.65, height: height * 0.5, marginVertical: 5 };
      case 2:
        return { width: width * 0.45, height: width * 0.45, marginVertical: 5 };
      case 4:
        return { width: width * 0.45, height: width * 0.45, marginVertical: 5 };
      default:
        return { width: width * 0.3, height: width * 0.3, marginVertical: 3 };
    }
  };

  return (
    <MasonryFlashList
      estimatedItemSize={9}
      numColumns={columnsCount(images.length)}
      data={images}
      renderItem={({ item, index }: any) => (
        <Image
          key={index}
          source={{ uri: item.url }}
          style={[styles.image, columnImageWidth(images.length)]}
        />
      )}
    />
  );
};

const Video = ({ url }) => {
  return <VideoPlayer url={url} isFocus={false} />;
};

const BottomContent = ({ totalComments, totalLikes }) => {
  return (
    <View style={styles.bottomContentContainer}>
      <View style={styles.bottomItem}>
        <MaterialCommunityIcons
          name="share"
          size={20}
          color={GLOBAL_COLORS.inactiveTextColor}
        />
      </View>
      <View style={styles.bottomItem}>
        <MaterialCommunityIcons
          name="comment-processing-outline"
          size={20}
          color={GLOBAL_COLORS.inactiveTextColor}
        />
        <Text style={styles.bottomText}>{totalComments}</Text>
      </View>
      <View style={styles.bottomItem}>
        <MaterialCommunityIcons
          name="heart-outline"
          size={20}
          color={GLOBAL_COLORS.inactiveTextColor}
        />
        <Text style={styles.bottomText}>{totalLikes}</Text>
      </View>
    </View>
  );
};

const FeedContent = ({ data }) => {
  const { item } = data;

  return (
    <View style={styles.mainContainer}>
      <Header user={item.user} />
      <Captions tags={item.tags} story={item.string_story} />
      {!!item?.images && <Images images={item?.images} />}
      {!!item?.videos && <Video url={item?.videos[0].url} />}
      <BottomContent
        totalComments={item.comment.total_comments}
        totalLikes={item.like.total_likes}
      />
    </View>
  );
};

export default FeedContent;

const styles = StyleSheet.create({
  //FEEDCONTENT
  mainContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  //HEADER
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  profileContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePhoto: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  username: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
  },
  privateBtn: {
    borderColor: GLOBAL_COLORS.inactiveTextColor,
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  privateText: {
    color: GLOBAL_COLORS.inactiveTextColor,
  },
  //CAPTIONS
  captionContainer: {
    marginVertical: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  tag: {
    fontSize: 16,
    color: GLOBAL_COLORS.secondaryColor,
    paddingRight: 10,
  },
  constentText: {
    fontSize: 16,
    color: GLOBAL_COLORS.primaryTextColor,
  },
  contentText: {
    fontSize: 16,
    color: GLOBAL_COLORS.primaryTextColor,
  },
  //   IMAGES
  image: {
    // height: width * 0.3,
    // width: width * 0.3,
    borderWidth: 1,
    borderColor: "#fff",
  },
  //BOTTOMCONTENT
  bottomContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    paddingBottom: 10,
    borderBottomColor: GLOBAL_COLORS.inactiveTextColor,
    borderBottomWidth: 2,
  },
  bottomItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bottomText: {
    color: GLOBAL_COLORS.inactiveTextColor,
    marginHorizontal: 3,
  },
});
