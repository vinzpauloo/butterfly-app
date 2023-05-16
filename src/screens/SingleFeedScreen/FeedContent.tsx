import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";

import { Divider, HStack, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

import CommentIcon from "assets/images/commentIcon.png";
import CustomModal from "components/CustomModal";
import FeedContentLikeBtn from "./FeedContentLikeBtn";
import ShareIcon from "assets/images/shareIcon.png";
import VideoPlayer from "components/VideoPlayer";
import VIPModalContent from "components/VIPModalContent";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";

import moment from "moment";

const Header = ({ item, setOpen }) => {
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
      <Pressable style={styles.privateBtn} onPress={openVIPModal}>
        <Text style={styles.privateText}>{translations.chat}</Text>
      </Pressable>
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
  return (
    <View style={styles.captionContainer}>
      <View style={styles.tagsContainer}>
        {tags.map((item, index) => (
          <Pressable key={index} onPress={() => navigateSingleTag(item)}>
            <Text style={styles.tag}>#{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.contentText}>{story}</Text>
    </View>
  );
};

const Images = ({ images }) => {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation<any>();

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
    <View style={styles.imagesContainer}>
      {images?.map((item, index) => (
        <Pressable
          onPress={() =>
            navigation.navigate("PhotoGallery", {
              imageList: images,
              fromFeedItem: true,
              index: index,
            })
          }
        >
          <Image
            key={index}
            source={{ uri: BASE_URL_FILE_SERVER + item.url }}
            style={[styles.image, columnImageWidth(images.length)]}
          />
        </Pressable>
      ))}
    </View>
  );
};

const Video = ({ url }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <VideoPlayer url={url} isFocus={false} />
    </View>
  );
};

const BottomContent = ({ totalComments, id, like, setLike }) => {
  const { translations } = translationStore((store) => store);
  const navigation = useNavigation<any>();

  return (
    <>
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
        <View style={styles.bottomItem}>
          <Image source={CommentIcon} style={styles.icon} />
          <Text style={styles.bottomText}>{totalComments}</Text>
        </View>
        <FeedContentLikeBtn id={id} like={like} setLike={setLike} />
      </View>
      <Divider style={styles.divider} />
    </>
  );
};

const FeedContent = ({ data, like, setLike }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Header item={data} setOpen={setOpen} />
      <Captions
        tags={data.tags}
        story={data.string_story}
        id={data._id}
        like={like}
        setLike={setLike}
      />
      {!!data?.videos && <Video url={data?.videos.url} />}
      {!!data?.images && <Images images={data?.images} />}
      <BottomContent
        totalComments={data.comment?.total_comments || 0}
        like={like}
        setLike={setLike}
        id={data._id}
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
    paddingHorizontal: 0,
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
  //BOTTOMCONTENT
  bottomContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    paddingBottom: 10,
    // borderBottomColor: 'white',
    // borderBottomWidth: 1,
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
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  divider: {
    marginVertical: 12,
    backgroundColor: "white",
    opacity: 0.1,
  },
});
