import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { MasonryFlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Modal, Text as TextBase, VStack } from "native-base";

import VideoPlayer from "components/VideoPlayer";
import CustomModal from "components/CustomModal";
import { GLOBAL_COLORS } from "global";
import { useNavigation } from "@react-navigation/native";
import FeedContentLikeBtn from "./FeedContentLikeBtn";

const { height, width } = Dimensions.get("window");

const Header = ({ user, userId, setOpen }) => {
  const navigation = useNavigation<any>();
  const navigateSingleUser = () => {
    navigation.navigate(`SingleUser`, {
      id: userId,
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
        <Text style={styles.privateText}>私信</Text>
      </Pressable>
    </View>
  );
};

const Captions = ({ tags, story, id }) => {
  const navigation = useNavigation<any>();
  const navigateSingleTag = (tag) => {
    navigation.navigate(`SingleTag`, {
      tag: tag,
    });
  };
  const navigateSingleFeed = () => {
    navigation.navigate("SingleFeedScreen", { feedId: id });
  };
  return (
    <View style={styles.captionContainer}>
      <View style={styles.tagsContainer}>
        {tags.map((item, index) => (
          <Pressable key={index} onPress={() => navigateSingleTag(item)}>
            <Text style={styles.tag}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={navigateSingleFeed}>
        <Text style={styles.contentText}>{story}</Text>
      </Pressable>
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
    <MasonryFlashList
      estimatedItemSize={9}
      numColumns={columnsCount(images.length)}
      data={images}
      renderItem={({ item, index }: any) => (
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
      )}
    />
  );
};

const Video = ({ url }) => {
  return <VideoPlayer url={url} isFocus={false} />;
};

const BottomContent = ({ totalComments, totalLikes, id }) => {
  const navigation = useNavigation<any>();
  const navigateSingleFeed = () => {
    navigation.navigate("SingleFeedScreen", { feedId: id });
  };

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
      <Pressable style={styles.bottomItem} onPress={navigateSingleFeed}>
        <MaterialCommunityIcons
          name="comment-processing-outline"
          size={20}
          color={GLOBAL_COLORS.inactiveTextColor}
        />
        <Text style={styles.bottomText}>{totalComments}</Text>
      </Pressable>
      <FeedContentLikeBtn totalLikes={totalLikes} id={id} />
    </View>
  );
};

const Content = ({ setOpen }) => {
  return (
    <Modal.Content bgColor={GLOBAL_COLORS.headerBasicBg}>
      <Modal.CloseButton />
      <Modal.Body>
        <VStack space={8} alignItems="center" margin={0} py={5}>
          <TextBase color="white">Upgrade membership first!</TextBase>
          <Button
            size="sm"
            style={styles.button}
            onPress={() => setOpen(false)}
          >
            Purchase VIP
          </Button>
        </VStack>
      </Modal.Body>
    </Modal.Content>
  );
};

const FeedContent = ({ data }) => {
  const { item } = data;
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Header user={item.user} userId={item.user_id} setOpen={setOpen} />
      <Captions tags={item.tags} story={item.string_story} id={item._id} />
      {!!item?.images && <Images images={item?.images} />}
      {!!item?.videos && <Video url={item?.videos[0].url} />}
      <BottomContent
        totalComments={item.comment.total_comments}
        totalLikes={item.like.total_likes}
        id={item._id}
      />
      <CustomModal open={open} setOpen={setOpen}>
        <Content setOpen={setOpen} />
      </CustomModal>
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
  //CONTENT
  button: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 20,
    width: 120,
  },
});
