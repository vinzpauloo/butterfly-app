import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList, Alert, Pressable, Image, ActivityIndicator } from "react-native";
import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av";
import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, useDisclose, Progress } from "native-base";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

import BottomComment from "components/BottomComment";
import Container from "components/Container";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GLOBAL_COLORS } from "global";

import { downloadFile } from "utils/downloadFile";

import { useQuery } from "@tanstack/react-query";
import { Work } from "hooks/useWork";

interface PortraitVideoDataType {
  reelsVideos?: any[];
  bottomTabHeight?: number;
  hasBackButton?: boolean;
}

type Props = {
  videoURL: string;
  userName: string;
  description: string;
  thumbnail: string;
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

  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false);
  const [videoOrientation, setVideoOrientation] = useState("");
  const [videoIsLoaded, setVideoIsLoaded] = useState(false);

  const [videoTotalDuration, setVideoTotalDuration] = useState(0);
  
  const [videoIsLiked, setVideoIsLiked] = useState(false);
  const [videoIsFaved, setVideoIsFaved] = useState(false);
  
  // VIDEO WATCH TIME AND BUFFEREED TIME (WIP)
  const [totalWatchTime, setTotalWatchTime] = useState(0)
  const [totalBufferedTime, setTotalBufferedTime] = useState(0)

  useEffect(() => {
    setisVideoPlaying(true);
  }, [props.isActive]);
  
  function pausePlayVideo() {
    setisVideoPlaying((prev) => !prev);
    isVideoPlaying
      ? setShowPlayPauseButton(true)
      : setTimeout(() => setShowPlayPauseButton(false), 500);
  }

  function testDownload() {
    const fileName = "test-file-name"
    alert("start downloading!")
    downloadFile('http://techslides.com/demos/sample-videos/small.mp4', fileName)
  }

  return (
    <View style={[styles.container, { height: windowHeight - props.tabBarHeight }]} >
      {props.isActive && (
        <Pressable style={styles.videoContainer} onPress={pausePlayVideo}>
          <Video
            source={{ uri: props.videoURL }}
            style={styles.video}
            resizeMode={videoOrientation === "portrait" ? ResizeMode.STRETCH : ResizeMode.CONTAIN}
            isLooping={false}
            shouldPlay={isVideoPlaying && videoIsLoaded}
            usePoster={true}
            PosterComponent={() => (
              <View style={styles.videoThumbnail}>
                <Image style={styles.videoThumbnail} source={{ uri: props.thumbnail }}/>
              </View>
            )}
            useNativeControls={false}
            onReadyForDisplay={(event: any) => {
              setVideoIsLoaded(event.status.isLoaded);
              setVideoOrientation(event.naturalSize.orientation);
              setVideoTotalDuration(event.status.durationMillis);
              setTotalWatchTime(event.status.positionMillis);
            }}
            progressUpdateIntervalMillis={100}
            onPlaybackStatusUpdate={(status: AVPlaybackStatusSuccess) => {
              status.isLoaded ? setTotalWatchTime(status.positionMillis) : null
              setTotalBufferedTime(status.playableDurationMillis)
              
              // LOG THE VIDEO WATCH TIME AND TOTAL VIDEO BUFFERED TIME (WIP)
              // status.isPlaying ?
              //   console.log("\nwatch time: " + totalWatchTime + "\n" + "buffered time:" + totalBufferedTime)
              //   : null
            }}
          />
          {showPlayPauseButton ? (
            <Animated.View style={styles.playPauseIcon} entering={ZoomIn} exiting={ZoomOut}>
              {isVideoPlaying ? (
                <Ionicons name="play" size={48} color="white" />
              ) : (
                <Ionicons name="pause" size={48} color="white" />
              )}
            </Animated.View>
          ) : null}
        </Pressable>
      )}
      <VStack space={2} style={[styles.bottomSection, isVideoPlaying ? { bottom: 0 } : { bottom: 0 }]}>
        <Pressable onPress={() => {Alert.alert("Go to user Profile!")}}>
          <Text style={[styles.userName, styles.iconText]}>
            @{props.userName}
          </Text>
        </Pressable>
        <Text style={styles.iconText}>{props.description}</Text>
        <View style={styles.tags}>
          {props.tags.map((item, index) => (
            <Pressable key={index} style={styles.tag} onPress={() => {navigation.navigate("SingleTag", {tag: item})}}>
              <Text style={styles.iconText}>#{item}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={() => {Alert.alert("Go to VIP purchase")}}>
          <Text style={styles.subscribe}>Subscription needed or gold coin</Text>
        </Pressable>
      </VStack>
      <VStack space={2} style={[styles.verticalBar, isVideoPlaying ? { bottom: 0 } : { bottom: 0 }]}>
        <View style={styles.verticalBarItem}>
          <Pressable onPress={() => {Alert.alert("Go to user Profile!")}}>
            <Image style={styles.userLogo} source={{ uri: props.userImage }} />
          </Pressable>
          <View style={styles.followButton}>
            <Pressable onPress={() => {Alert.alert("Follow User!")}}>
              <Feather name="plus" color={"white"} size={16} />
            </Pressable>
          </View>
        </View>
        <View style={styles.verticalBarItem}>
          <Pressable onPress={() => setVideoIsLiked((prev) => !prev)}>
            {videoIsLiked ? (
              <Ionicons
                name="heart"
                color={GLOBAL_COLORS.secondaryColor}
                size={40}
              />
            ) : (
              <Ionicons name="heart" color={"white"} size={40} />
            )}
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
          <Pressable onPress={() => setVideoIsFaved((prev) => !prev)}>
            {videoIsFaved ? (
              <Ionicons name="star" color={"yellow"} size={40} />
            ) : (
              <Ionicons name="star" color={"white"} size={40} />
            )}
          </Pressable>
          <Text style={styles.iconText}>Fave</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Pressable onPress={testDownload}>
            <MaterialCommunityIcons name="download" color={"white"} size={40} />
          </Pressable>
          <Text style={styles.iconText}>DL</Text>
        </View>
      </VStack>
      <Progress h={0.5} value={(totalWatchTime/videoTotalDuration) * 100} bottom={0.5} _filledTrack={{ borderRadius: 0, bg:GLOBAL_COLORS.secondaryColor }} backgroundColor={GLOBAL_COLORS.inactiveTextColor} rounded="none" />
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
  const [vlogIsLoaded, setVlogIsLoaded] = useState(false);

  const [localStoredVlog, setLocalStoredVlog] = useState([])
  const [isQueryEnable, setIsQueryEnable] = useState(true);

  // if reelsVideos props is passed, this becomes true
  const isReelsFromSpecificList = !!reelsVideos;

  const { getWorkAll } = Work();
  const { isLoading, isError, data, error, status, refetch } = useQuery({
    queryKey: ["portraitWorks"],
    queryFn: () => getWorkAll({
      orientation: "Portrait",
    }),
    onSuccess: (data) => {
      console.log("=== random portrait video fetched from backend! ===");
      let newElement = {
        id: data.id,
        userName: data.user.username,
        videoURL: data.video_url,
        thumbnailURL: data.thumbnail_url,
        description: data.description,
        tags: data.tags,
        amountOflikes: data.like.total_likes,
        amountOfComments: data.comment.total_comments,
        userPhoto: data.user.photo,
      }
      setLocalStoredVlog(oldArray => [...oldArray, newElement])
    },
    onError: (error) => {
      console.log("Error", error);
    },
    enabled: isQueryEnable,
  });

  useEffect(() => {
    setTimeout(() => setVlogIsLoaded(true), 1000);
  });

  // if reelsVideos props is passed, use that data list, else use a temporary array with randomly fetch videos
  function onUserScrollDown() {
    isReelsFromSpecificList ?
      null : refetch(); console.log("total vids in VLOG: ", localStoredVlog.length)
  }

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
      {vlogIsLoaded ? (
        <>
          <FlatList
            // estimatedItemSize={15}
            onEndReached={onUserScrollDown}
            maxToRenderPerBatch={1}
            initialNumToRender={1}
            windowSize={2}
            data={!!reelsVideos ? reelsVideos : localStoredVlog}
            pagingEnabled
            removeClippedSubviews={true}
            renderItem={({ item, index }) => (
              <PortraitVideoContent
                key={item.id}
                videoURL={item.videoURL}
                description={item.description}
                userName={item.userName}
                thumbnail={item.thumbnailURL}
                tags={item.tags}
                likes={item.amountOflikes}
                amountOfComments={item.amountOfComments}
                userImage={item.userPhoto}
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
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
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
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  videoThumbnail: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 20,
  },
  bottomSection: {
    position: "absolute",
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomSliderContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    paddingVertical: 6,
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
  },
  verticalBar: {
    position: "absolute",
    right: 8,
    paddingBottom: 16,
  },
  verticalBarItem: {
    width: "100%",
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
  videoTimeStamp: {
    color: "white",
    paddingHorizontal: 6,
  },
  subText: {
    color: "#999",
    textAlign: "center",
    marginVertical: 6,
    marginBottom: 48,
  },
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
    flex: 1,
  },
  playPauseIcon: {
    zIndex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    elevation: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    width: 64,
    height: 64,
    borderRadius: 32,
    opacity: 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    width: "100%",
    height: "100%",
  },
});
