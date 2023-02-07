import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Alert,
  Pressable,
  Image,
  ActivityIndicator
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, useDisclose } from "native-base";
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import BottomComment from "components/BottomComment";
import Container from "components/Container";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

interface PortraitVideoDataType {
  reelsVideos?: any[];
  bottomTabHeight?: number;
  hasBackButton?: boolean;
}

type Props = {
  uri: string;
  userName: string;
  description: string;
  isPortrait: boolean;
  tags: string[];
  likes: number;
  amountOfComments: number;
  userImage: string;
  isActive: boolean;
  activeVideoIndex: number;
  tabBarHeight: number;
  openComments: () => void;
};

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const PortraitVideoContent = (props: Props) => {
  const navigation = useNavigation<any>();
  
  const [isVideoPlaying, setisVideoPlaying] = useState(false) 
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false) 

  useEffect(() => {
    setisVideoPlaying(true)
  }, [props.isActive]);

  function pausePlayVideo() {
    setisVideoPlaying((prev) => !prev)
  }

  function pressedRecently() {
    setShowPlayPauseButton((prev) => !prev)
  }

  return (
    <View style={[styles.container, { height: windowHeight - props.tabBarHeight }]}>
      {props.isActive && (
        <Pressable style={styles.videoContainer} onPress={pressedRecently}>
          <Video
            source={{ uri: props.uri }}
            style={styles.video}
            resizeMode={
              props.isPortrait ? ResizeMode.STRETCH : ResizeMode.CONTAIN
            }
            isLooping={true}
            shouldPlay={isVideoPlaying}
            useNativeControls={false}
          />
          {showPlayPauseButton ?
            <Animated.View style={styles.playPauseIcon} entering={ZoomIn} exiting={ZoomOut} >
              <Pressable onPress={pausePlayVideo}>
                {isVideoPlaying ?
                  <AntDesign name="pausecircleo" size={72} color="white" />
                  :
                  <AntDesign name="playcircleo" size={72} color="white" />
                }
              </Pressable>
            </Animated.View>
            : null
          }
        </Pressable>
      )}
      <VStack space={2} style={styles.bottomSection}>
        <Pressable
          onPress={() => {
            Alert.alert("Go to user Profile!");
          }}
        >
          <Text style={[styles.userName, styles.iconText]}>
            @{props.userName}
          </Text>
        </Pressable>
        <Text style={styles.iconText}>{props.description}</Text>
        <View style={styles.tags}>
          {props.tags.map((item, index) => (
            <Pressable
              key={index}
              style={styles.tag}
              onPress={() => {
                navigation.navigate("SingleTag", { tag: item });
              }}
            >
              <Text style={styles.iconText}>#{item}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          onPress={() => {
            Alert.alert("Go to VIP purchase");
          }}
        >
          <Text style={styles.subscribe}>Subscription needed or gold coin</Text>
        </Pressable>
      </VStack>
      <VStack space={2} style={styles.verticalBar}>
        <View style={styles.verticalBarItem}>
          <Pressable
            onPress={() => {
              Alert.alert("Go to user Profile!");
            }}
          >
            <Image style={styles.userLogo} source={{ uri: props.userImage }} />
          </Pressable>
          <View style={styles.followButton}>
            <Pressable
              onPress={() => {
                Alert.alert("Follow User!");
              }}
            >
              <Feather name="plus" color={"white"} size={16} />
            </Pressable>
          </View>
        </View>
        <View style={styles.verticalBarItem}>
          <Pressable
            onPress={() => {
              Alert.alert("Like!");
            }}
          >
            <Ionicons name="heart" color={"white"} size={40} />
          </Pressable>
          <Text style={styles.iconText}>{props.likes}</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Pressable onPress={() => props.openComments()}>
            <MaterialCommunityIcons name="comment" color={"white"} size={40} />
          </Pressable>
          <Text style={styles.iconText}>{props.amountOfComments}</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Pressable
            onPress={() => {
              Alert.alert("Add to Fave");
            }}
          >
            <Ionicons name="star" color={"white"} size={40} />
          </Pressable>
          <Text style={styles.iconText}>Fave</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Pressable
            onPress={() => {
              Alert.alert("Download Video");
            }}
          >
            <MaterialCommunityIcons name="download" color={"white"} size={40} />
          </Pressable>
          <Text style={styles.iconText}>DL</Text>
        </View>
      </VStack>
    </View>
  );
};

const PortraitVideo: React.FC<PortraitVideoDataType> = ({
  reelsVideos,
  bottomTabHeight = 0, // default value
  hasBackButton = false, // default value
}) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [vlogIsLoaded, setVlogIsLoaded] = useState(false)

  const [videoCount, setVideoCount] = useState(1)
  let localStoredVlog = reelsVideos.slice(0, videoCount)

  useEffect(() => {
    setTimeout(() => setVlogIsLoaded(true), 1000);
  });

  return (
    <Container>
      {hasBackButton ? (
        <Ionicons
          name="chevron-back-outline"
          size={35}
          color={"#fff"}
          style={{ position: "absolute", top: 10, left: 10, zIndex: 999 }}
          onPress={() => navigation.goBack()}
        />
      ) : null}
      {vlogIsLoaded ? 
        <>
          <FlatList
            // estimatedItemSize={15}
            onEndReached={() => setVideoCount(videoCount + 1)}
            maxToRenderPerBatch={1}
            initialNumToRender={1}
            windowSize={2}
            data={localStoredVlog || route.params?.reelsVideos}
            pagingEnabled
            removeClippedSubviews={true}
            renderItem={({ item, index }) => (
              <PortraitVideoContent
                key={item.id}
                uri={item.uri}
                isPortrait={item.isPortrait}
                userName={item.userName}
                description={item.description}
                tags={item.tags}
                likes={item.likes}
                amountOfComments={item.amountOfComments}
                userImage={item.avatarUri}
                isActive={activeVideoIndex === index}
                activeVideoIndex={activeVideoIndex}
                tabBarHeight={bottomTabHeight}
                openComments={onOpen}
              />
            )}
            onScroll={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.y / (windowHeight - bottomTabHeight)
              );
              setActiveVideoIndex(index);
            }}
          />
          <BottomComment isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
      :
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      }
    </Container>
  );
};

export default PortraitVideo;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#191d26",
  },
  blackLayer: {
    height: "50%",
    marginBottom: "auto",
    backgroundColor: "#191d26",
    opacity: 0.5,
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 20,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  userName: {
    fontWeight: "bold",
  },
  verticalBar: {
    position: "absolute",
    right: 8,
    bottom: 0,
    paddingBottom: 16,
  },
  verticalBarItem: {
    alignItems: "center",
  },
  iconText: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  followButton: {
    position: "relative",
    bottom: 12,
    backgroundColor: "red",
    borderRadius: 8,
  },
  subscribe: {
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    padding: 5,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  userLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  modalContainer: {
    height: "50%",
    marginTop: "auto",
    backgroundColor: "#191d26",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    color: "#999",
    textAlign: "center",
    marginVertical: 6,
    marginBottom: 48,
  },

  // Tags list
  tags: {
    flexDirection: "row",
    gap: 10,
  },
  tag: {
    marginRight: 5,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  playPauseIcon: {
    zIndex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    elevation: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 36,
    opacity: 0.9
  },
  videoContainer: {
    width: "100%",
    height: "100%" 
  }
});
