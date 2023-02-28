import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, FlatList, Pressable, Image, ActivityIndicator } from "react-native";
import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDisclose, Progress } from "native-base";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

import BottomComment from "components/BottomComment";
import Container from "components/Container";

import Ionicons from "react-native-vector-icons/Ionicons";
import { GLOBAL_COLORS } from "global";

import { useQuery } from "@tanstack/react-query";
import WorkService from "services/api/WorkService";

import BottomOverlay from "components/forms/portraitVideoOverlay/BottomOverlay";
import RightOverlay from "components/forms/portraitVideoOverlay/RightOverlay";

interface PortraitVideoDataType {
  reelsVideos?: any[];
  bottomTabHeight?: number;
  hasBackButton?: boolean;
}

type Props = {
  videoID: string
  userID: number
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
  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false);
  const [videoOrientation, setVideoOrientation] = useState("");
  const [videoIsLoaded, setVideoIsLoaded] = useState(false);

  const [videoTotalDuration, setVideoTotalDuration] = useState(0);
  
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
              <Ionicons name={isVideoPlaying? "play" : "pause"} size={48} color="white" />
            </Animated.View>
          ) : null}
        </Pressable>
      )}
      <BottomOverlay 
        userID={props.userID}
        userName={props.userName}
        description={props.description}
        tags={props.tags} />
      <RightOverlay
        videoID={props.videoID}
        userID={props.userID}
        userImage={props.userImage}
        likes={props.likes}
        amountOfComments={props.amountOfComments}
        openComments={props.openComments} />
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

  // if reelsVideos props is passed, this becomes true
  const isReelsFromSpecificList = !!reelsVideos;
  const [localStoredVlog, setLocalStoredVlog] = useState([])

  // only enable this random video query if no reelsVideos props is passed
  const [isQueryEnable, setIsQueryEnable] = useState(!isReelsFromSpecificList);

  const { getWorks } = WorkService();
  const { isLoading, isError, data, error, status, refetch } = useQuery({
    queryKey: ["portraitWorks"],
    queryFn: () => getWorks({
      orientation: "Portrait",
    }),
    onSuccess: (data) => {
      console.log("=== random portrait video fetched from backend! ===");
      let newElement = {
        // workID of the video (which is also the foreignID to refer to)
        workID: data[0]._id,
        userID: data[0].user.id,
        userName: data[0].user.username,
        videoURL: data[0].video_url,
        thumbnailURL: data[0].thumbnail_url,
        description: data[0].description,
        tags: data[0].tags,
        amountOflikes: data[0].like.total_likes,
        amountOfComments: data[0].comment.total_comments,
        userPhoto: data[0].user.photo,
      }
      setLocalStoredVlog(oldArray => [...oldArray, newElement])
      setVlogIsLoaded(true)
    },
    onError: (error) => {
      console.log("Error", error);
    },
    enabled: isQueryEnable,
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
            onEndReached={onUserScrollDown}
            maxToRenderPerBatch={1}
            initialNumToRender={1}
            windowSize={2}
            data={!!reelsVideos ? reelsVideos : localStoredVlog}
            pagingEnabled
            removeClippedSubviews={true}
            renderItem={({ item, index }) => (
              <PortraitVideoContent
                videoID={item.workID}
                userID={item.userID}
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
          <BottomComment workID={data[0]._id} isOpen={isOpen} onClose={onClose} />
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
  bottomSliderContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    paddingVertical: 6,
    alignItems: "center",
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
