import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

import CommentIcon from "assets/images/commentIcon.png";
import CustomModal from "components/CustomModal";
import FeedContentLikeBtn from "./FeedContentLikeBtn";
import PlayIcon from "assets/images/playIcon.png";
import ShareIcon from "assets/images/shareIcon.png";
import VideoPlaceholder from "assets/images/videoPlaceholder.png";
import VIPModalContent from "components/VIPModalContent";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";
import { useNavigation } from "@react-navigation/native";
import { HStack, VStack } from "native-base";

import moment from "moment";

const { height, width } = Dimensions.get("window");

const Header = ({ item, setOpen, isFromSingleUserScreen }) => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();
  const navigateSingleUser = () => {
    navigation.navigate(`SingleUser`, {
      userID: item.user_id,
    });
  };
  const openVIPModal = () => {
    setOpen(true);
  };
  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.profileContent} onPress={navigateSingleUser}>
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + item.user.photo }}
          style={styles.profilePhoto}
        />
        <VStack>
          <Text style={styles.username}>{item.user.username}</Text>
          <HStack>
            <Text style={styles.timeDate}>
              {moment(item.created_at).format("h:mm A")}{" "}
              {moment(item.created_at).format("MM/DD/YYYY")}
            </Text>
          </HStack>
        </VStack>
      </Pressable>
      {isFromSingleUserScreen ? null : (
        <Pressable style={styles.privateBtn} onPress={openVIPModal}>
          <Text style={styles.privateText}>{translations.chat}</Text>
        </Pressable>
      )}
    </View>
  );
};

const Captions = ({ tags, story, id, like, setLike }) => {
  const navigation = useNavigation<any>();
  const navigateSingleTag = (tag) => {
    navigation.navigate(`SingleTag`, {
      postTitle: tag,
    });
  };
  const navigateSingleFeed = () => {
    navigation.navigate("SingleFeedScreen", {
      feedId: id,
      like: like,
      setLike: setLike,
    });
  };
  return (
    <View style={styles.captionContainer}>
      <View style={styles.tagsContainer}>
        {tags.map((item, index) => (
          <Pressable key={index} onPress={() => navigateSingleTag(item)}>
            <Text style={styles.tag}>#{item}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={navigateSingleFeed}>
        <Text style={styles.contentText}>{story}</Text>
      </Pressable>
    </View>
  );
};

const Images = ({ images, video, id, like, setLike }) => {
  const navigation = useNavigation<any>();
  const data = !!video ? [{ url: VideoPlaceholder }, ...images] : images;

  const navigateSingleFeed = () => {
    navigation.navigate("SingleFeedScreen", {
      feedId: id,
      like: like,
      setLike: setLike,
    });
  };

  const columnImageWidth = (picCount) => {
    switch (picCount) {
      case 1:
        return { width: width * 0.65, height: height * 0.5, marginVertical: 5 };
      case 2:
        return { width: width * 0.44, height: width * 0.45, marginVertical: 5 };
      case 4:
        return { width: width * 0.44, height: width * 0.45, marginVertical: 3 };
      default:
        return { width: width * 0.29, height: width * 0.3, marginVertical: 3 };
    }
  };

  const columnImageWidthForVid = (picCount) => {
    switch (picCount) {
      case 1:
        return { width: width * 0.65, height: height * 0.5 };
      case 2:
        return { width: width * 0.44, height: width * 0.45 };
      case 4:
        return { width: width * 0.44, height: width * 0.45 };
      default:
        return { width: width * 0.29, height: width * 0.3 };
    }
  };

  return (
    <View style={styles.imagesContainer}>
      {data.map((item, index) => (
        <Pressable
          onPress={
            !!video
              ? index === 0
                ? navigateSingleFeed
                : () =>
                    navigation.navigate("PhotoGallery", {
                      imageList: images,
                      fromFeedItem: true,
                      index: index - 1,
                    })
              : () =>
                  navigation.navigate("PhotoGallery", {
                    imageList: images,
                    fromFeedItem: true,
                    index: index,
                  })
          }
        >
          {!!video && index === 0 ? (
            <View
              key={index}
              style={[
                styles.videoWithImagesCont,
                columnImageWidthForVid(data.length),
              ]}
            >
              <Image
                source={item.url}
                style={[styles.image, columnImageWidth(data.length)]}
              />
              <Image source={PlayIcon} style={styles.videoWithImages} />
            </View>
          ) : (
            <Image
              key={index}
              source={{ uri: BASE_URL_FILE_SERVER + item.url }}
              style={[styles.image, columnImageWidth(data.length)]}
            />
          )}
        </Pressable>
      ))}
    </View>
  );
};

const Video = ({ id, like, setLike }) => {
  const navigation = useNavigation<any>();

  const navigateSingleFeed = () => {
    navigation.navigate("SingleFeedScreen", {
      feedId: id,
      like: like,
      setLike: setLike,
    });
  };

  return (
    <Pressable style={styles.videoCont} onPress={navigateSingleFeed}>
      {/* <VideoPlayer url={url} isFocus={false} /> */}
      <View style={styles.images}>
        <Image style={styles.video} source={VideoPlaceholder} />
        <Image source={PlayIcon} style={styles.playIcon} />
      </View>
    </Pressable>
  );
};

const BottomContent = ({ totalComments, id, like, setLike }) => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();
  const navigateSingleFeed = () => {
    navigation.navigate("SingleFeedScreen", {
      feedId: id,
      like: like,
      setLike: setLike,
    });
  };

  return (
    <View style={styles.bottomContentContainer}>
      <Pressable
        style={styles.bottomItem}
        onPress={() =>
          navigation.navigate("SharingPromotion", {
            postTitle: translations.sharingPromotion,
          })
        }
      >
        <Image source={ShareIcon} style={styles.icon} />
      </Pressable>
      <Pressable style={styles.bottomItem} onPress={navigateSingleFeed}>
        <Image source={CommentIcon} style={styles.icon} />
        <Text style={styles.bottomText}>{totalComments}</Text>
      </Pressable>
      <FeedContentLikeBtn id={id} like={like} setLike={setLike} />
    </View>
  );
};

const FeedContent = ({ data, isFromSingleUserScreen = false }) => {
  const item = !!data.item ? data.item : data;
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState({
    isAlreadyLike: item.is_liked,
    likeCount: item.like?.total_likes || 0,
  });

  return (
    <View style={styles.mainContainer}>
      <Header
        item={item}
        setOpen={setOpen}
        isFromSingleUserScreen={isFromSingleUserScreen}
      />
      <Captions
        tags={item.tags}
        story={item.string_story}
        id={item._id}
        like={like}
        setLike={setLike}
      />
      {!!item?.images && (
        <Images
          images={item?.images}
          video={item.videos}
          like={like}
          setLike={setLike}
          id={item._id}
        />
      )}
      {!!item?.videos && !!!item?.images && (
        <Video like={like} setLike={setLike} id={item._id} />
      )}
      <BottomContent
        totalComments={item.comment?.total_comments || 0}
        like={like}
        setLike={setLike}
        id={item._id}
      />
      <CustomModal open={open} setOpen={setOpen}>
        <VIPModalContent setOpen={setOpen} />
      </CustomModal>
    </View>
  );
};

export default FeedContent;

const styles = StyleSheet.create({
  //FEEDCONTENT
  mainContainer: {
    paddingVertical: 10,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    marginHorizontal: 15,
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
    height: 34,
    width: 34,
    borderRadius: 17,
    marginRight: 5,
  },
  username: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 15,
  },
  timeDate: {
    color: GLOBAL_COLORS.inactiveTextColor,
    fontSize: 12,
    marginRight: 5,
  },
  privateBtn: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  privateText: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  //CAPTIONS
  captionContainer: {
    marginTop: 10,
    marginBottom: 5,
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
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  image: {
    borderRadius: 4,
  },
  videoWithImagesCont: {
    position: "relative",
  },
  videoWithImages: {
    position: "absolute",
    height: 40,
    width: 40,
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  // VIDEO
  videoCont: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  images: {
    position: "relative",
  },
  video: {
    // alignItems: "center",
    // justifyContent: "center",
    width: width - 30, // minus the mainContainer horizontal margin
    height: 200,
    resizeMode: "cover",
    borderRadius: 4,
  },
  playIcon: {
    top: 100,
    left: width / 2 - 15,
    transform: [{ translateX: -30 }, { translateY: -30 }],
    position: "absolute",
    height: 60,
    width: 60,
    resizeMode: "contain",
  },
  //BOTTOMCONTENT
  bottomContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingBottom: 10,
    // borderBottomColor: GLOBAL_COLORS.inactiveTextColor,
    // borderBottomWidth: 8,
  },
  bottomItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  bottomText: {
    color: GLOBAL_COLORS.inactiveTextColor,
    marginHorizontal: 3,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});
