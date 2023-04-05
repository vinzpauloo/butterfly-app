import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import VideoPlayer from "components/VideoPlayer";
import CustomModal from "components/CustomModal";
import Fontisto from "react-native-vector-icons/Fontisto";
import VIPModalContent from "components/VIPModalContent";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";
import { useNavigation } from "@react-navigation/native";
import FeedContentLikeBtn from "./FeedContentLikeBtn";

const { height, width } = Dimensions.get("window");

const Header = ({ user, userId, setOpen }) => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();
  const navigateSingleUser = () => {
    navigation.navigate(`SingleUser`, {
      userID: userId,
    });
  };
  const openVIPModal = () => {
    setOpen(true);
  };
  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.profileContent} onPress={navigateSingleUser}>
        <Image source={{ uri: user.photo }} style={styles.profilePhoto} />
        <Text style={styles.username}>{user.username}</Text>
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
      tag: tag,
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
  const navigation = useNavigation<any>();

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
            source={{ uri: item.url }}
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
  const navigation = useNavigation<any>();

  return (
    <View style={styles.bottomContentContainer}>
      <Pressable
        style={styles.bottomItem}
        onPress={() => navigation.navigate("SharingPromotion")}
      >
        <MaterialCommunityIcons
          name="share"
          size={20}
          color={GLOBAL_COLORS.inactiveTextColor}
        />
      </Pressable>
      <View style={styles.bottomItem}>
        <Fontisto
          name="commenting"
          size={16}
          color={GLOBAL_COLORS.inactiveTextColor}
        />
        <Text style={styles.bottomText}>{totalComments}</Text>
      </View>
      <FeedContentLikeBtn id={id} like={like} setLike={setLike} />
    </View>
  );
};

const FeedContent = ({ data, like, setLike }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Header user={data.user} userId={data.user_id} setOpen={setOpen} />
      <Captions
        tags={data.tags}
        story={data.string_story}
        id={data._id}
        like={like}
        setLike={setLike}
      />
      {!!data?.images && <Images images={data?.images} />}
      {!!data?.videos && <Video url={data?.videos[0].url} />}
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
