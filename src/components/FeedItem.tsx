import React, {useState} from "react";
import {
  StyleSheet,
  Pressable,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import {VStack, HStack, Avatar, Divider, Box, Flex, Modal, Button, Text} from "native-base";

import {useNavigation} from "@react-navigation/native";

import { Video, ResizeMode } from "expo-av";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";

import { GLOBAL_COLORS } from "global";
import CustomModal from "./CustomModal";
import LikeButton from "./forms/feeds/LikeButton";

type Props = {
  userPictureURL: string;
  userName: string;
  tags: string[];
  description: string;
  location?: string;
  // single picture landscape, 2, 3, 4 - 8, 9 portrait / grid picture, single landscape video, single portrait video
  addedContentType?: string;
  addedContent?: { contentURL: string }[];
  totalComments: number;
  totalLikes: number;
  openComments?: () => void;
};

const Content = ({ setOpen }) => {
  return (
      <Modal.Content bgColor={GLOBAL_COLORS.headerBasicBg}>
        <Modal.CloseButton />
        <Modal.Body>
          <VStack space={8} alignItems="center" margin={0} py={5}>
            <Text color="white">Upgrade membership first!</Text>

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

const FeedItem = ({item}) => {
  const [open, setOpen] = useState(false);
  const openVIPModal = () => {
    setOpen(true);
  };

  const video = React.useRef(null);
  const navigation = useNavigation<any>();
  const goToPhotoGallery = (index) => {
    navigation.navigate("PhotoGallery", {
      imageList: item?.images,
      fromFeedItem: true,
      index: index
    })
  }

  return (
      <VStack p={4} space={2}>
        <HStack>
          <Pressable onPress={() => {navigation.navigate(`SingleUser`, {
            id: item?.user_id,
          })}}>
            <HStack space={2} style={styles.top}>
              <Avatar source={{uri:  item?.user.photo}} size={28} />
              <Text style={styles.whiteText}>{item?.user.username}</Text>
            </HStack>
          </Pressable>
          <Pressable style={styles.privateMessageButton} onPress={openVIPModal}>
            <Text style={styles.privateMessageText}>私信</Text>
          </Pressable>
        </HStack>
        <HStack space={2}>
          {item?.tags ? (
              item.tags.map((tag, index) =>
                  <Pressable key={index} onPress={()=>{navigation.navigate(`SingleTag`, {
                    tag: tag
                  })}}>
                    <Text style={styles.tags}>#{tag}</Text>
                  </Pressable>
              )
          ): null}
        </HStack>
        <VStack space={2}>
          <Pressable onPress={()=>{navigation.navigate(`SingleFeedScreen`,
              {
                postTitle: `详情`,
                user: {
                  photo: item?.user.photo,
                  username: item?.user.username
                },
                comment: {
                  total_comments: item?.comment.total_comments,
                },
                like: {
                  total_likes: item?.like.total_likes,
                  foreign_id: item?.like.foreign_id
                },
                tags: item?.tags,
                string_story: item?.string_story,
                foreign_id: item?.like.foreign_id,
                comments: [
                  {
                    customer_id: item?.user_id,
                    comment: 'Great content',
                    username: item?.user.username,
                    photo: item?.user.photo,
                    replies: [
                      {
                        replyId: '1',
                        customerId: '2',
                        username: 'User 2',
                        photo: item?.user.photo,
                        comment: 'Great post!',
                      },
                      {
                        replyId: '2',
                        customerId: '3',
                        username: 'User 3',
                        photo: item?.user.photo,
                        comment: 'Nice one!',
                      },
                      {
                        replyId: '3',
                        customerId: '4',
                        username: 'User 4',
                        photo: item?.user.photo,
                        comment: 'Amazing!',
                      },
                    ],
                  },
                ],
                total_comments: item?.comment.total_comments,
                total_likes: item?.like.total_likes,
              }
              )}}>
            <Text style={styles.whiteText}>{item?.string_story}</Text>
          </Pressable>
            <Flex wrap="wrap" direction="row">
              {item?.images ? (
                  item.images.map((item, index)=>(
                        <Box style={
                          item.length === 1 ? styles.singleContent
                              :item.length % 3 === 0 ? styles.tripleContent
                                  :styles.doubleContent} m={0.5} key={index}>
                          <Pressable onPress={()=>goToPhotoGallery(index)}>
                            <Image source={{uri: item.url}} style={item.url ? styles.imageInBox : null}/>
                          </Pressable>
                        </Box>
                  ))
              ): item?.videos ? (
                  <Video
                      ref = { video }
                      style={styles.singleContent}
                      source = {{uri: item.videos[0].url}}
                      useNativeControls
                      resizeMode={ResizeMode.STRETCH}
                  />
              ): null}
            </Flex>
          {item?.location?
              <HStack style={styles.locationButton}>
                <Entypo name="location-pin" color={"#fff"} size={16} />
                <Text style={styles.whiteText}>{item.location}</Text>
              </HStack> : null}
        </VStack>
        <HStack style={styles.bottom}>
          <Pressable onPress={()=>{navigation.navigate(`SharingPromotion`)}}>
            <FontAwesome name="share-square-o" color={"#999"} size={16} />
          </Pressable>
          <Pressable onPress={() => item?.openComments === undefined ? null : item.openComments()}>
            <HStack space={1} style={styles.bottomIcon}>
              <Fontisto name="commenting" color={"#999"} size={16} />
              <Text style={styles.bottomText}>{item?.comment.total_comments}</Text>
            </HStack>
          </Pressable>
          <LikeButton data={item} id={item?.like.foreign_id}/>
        </HStack>
        <Divider style={styles.divider} color='#999'/>
        <CustomModal open={open} setOpen={setOpen}>
          <Content setOpen={setOpen} />
        </CustomModal>
      </VStack>
  );
};

export default FeedItem;

const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  top: {
    alignItems: "center",
  },
  whiteText: {
    color: "white",
  },
  privateMessageButton: {
    marginLeft: "auto",
  },
  privateMessageText: {
    color: "#999",
    borderWidth: 1,
    borderColor: "#999",
    paddingHorizontal: 4,
    marginLeft: "auto",
  },
  tags: {
    marginTop: 16,
    color: GLOBAL_COLORS.secondaryColor,
  },
  locationButton: {
    alignItems: "center",
  },
  bottom: {
    marginTop: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  bottomIcon: {
    alignItems: "center",
  },
  bottomText: {
    color: "#999",
    fontSize: 12,
  },
  divider: {
    marginTop: 12,
  },
  imageInBox: {
    width: "100%",
    height: "100%",
  },
  singleContent: {
    height: 200,
    width: "100%",
  },
  doubleContent: {
    height: windowWidth / 2 - 20,
    width: windowWidth / 2 - 20,
  },
  tripleContent: {
    height: windowWidth / 3 - 15,
    width: windowWidth / 3 - 15,
  },
  button: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 20,
    width: 120,
  },
});
