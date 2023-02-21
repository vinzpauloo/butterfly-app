import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { VStack, HStack, Avatar, Divider, Box, Flex } from "native-base";
import { Video, ResizeMode } from "expo-av";

import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";

import { GLOBAL_COLORS } from "global";
import {useNavigation} from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

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

const FeedItem = ({item}) => {
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
              <Text style={styles.whiteText}>{item?.user.username }</Text>
            </HStack>
          </Pressable>
          <Pressable style={styles.privateMessageButton} onPress={()=> {Alert.alert("Send " + item?.userName + " message")}}>
            <Text style={styles.privateMessageText}>私信</Text>
          </Pressable>
        </HStack>
        <HStack space={2}>
          {item?.tags ? (
              item.tags.map((tag, index) =>
                  <Pressable key={index} onPress={()=>{navigation.navigate(`SingleTag`, {
                    id: item?.user_id
                  })}}>
                    <Text style={styles.tags}>#{tag}</Text>
                  </Pressable>
              )
          ): null}
        </HStack>
        <VStack space={2}>
          <Pressable onPress={()=>{navigation.navigate(`SingleFeedScreen`,{
            id: item?.user_id
          })}}>
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
          <Pressable onPress={()=> Alert.alert("Share Post")}>
            <FontAwesome name="share-square-o" color={"#999"} size={16} />
          </Pressable>
          <Pressable onPress={() => item?.openComments === undefined ? null : item.openComments()}>
            <HStack space={1} style={styles.bottomIcon}>
              <Fontisto name="commenting" color={"#999"} size={16} />
              <Text style={styles.bottomText}>{item?.comment.total_comments}</Text>
            </HStack>
          </Pressable>
          <Pressable onPress={() => Alert.alert("Like Post")}>
            <HStack space={1} style={styles.bottomIcon}>
              <AntDesign name="hearto" color={"#999"} size={16} />
              <Text style={styles.bottomText}>{item?.like.total_likes}</Text>
            </HStack>
          </Pressable>
        </HStack>
        <Divider style={styles.divider} color='#999'/>
      </VStack>
  );
};

export default FeedItem;

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
});
