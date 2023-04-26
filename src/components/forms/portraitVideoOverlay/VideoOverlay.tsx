import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Image } from "react-native";
import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Progress } from "native-base";
import { GLOBAL_COLORS } from "global";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

type Props = {
  isActive: boolean;
  videoURL: string;
  thumbnail: string;
};

const VideoOverlay = (props: Props) => {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false);
  const [videoOrientation, setVideoOrientation] = useState("");
  const [videoIsLoaded, setVideoIsLoaded] = useState(false);
  const [videoTotalDuration, setVideoTotalDuration] = useState(0);

  // VIDEO WATCH TIME AND BUFFERED TIME (FOR FUTURE)
  const [totalWatchTime, setTotalWatchTime] = useState(0);
  const [totalBufferedTime, setTotalBufferedTime] = useState(0);

  useEffect(() => {
    setisVideoPlaying(true);
  }, [props.isActive]);

  const pausePlayVideo = () => {
    setisVideoPlaying((prev) => !prev);
    isVideoPlaying
      ? setShowPlayPauseButton(true)
      : setTimeout(() => setShowPlayPauseButton(false), 500);
  };

  return (
    <>
      <Pressable style={styles.videoContainer} onPress={pausePlayVideo}>
        <Video
          source={{ uri: BASE_URL_FILE_SERVER + props.videoURL }}
          style={styles.video}
          resizeMode={
            videoOrientation === "portrait"
              ? ResizeMode.STRETCH
              : ResizeMode.CONTAIN
          }
          isLooping={false}
          shouldPlay={isVideoPlaying && videoIsLoaded}
          usePoster={true}
          PosterComponent={() => (
            <View style={styles.videoThumbnail}>
              <Image
                style={styles.videoThumbnail}
                source={{ uri: BASE_URL_FILE_SERVER + props.thumbnail }}
              />
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
            status.isLoaded ? setTotalWatchTime(status.positionMillis) : null;
            setTotalBufferedTime(status.playableDurationMillis);

            // LOG THE VIDEO WATCH TIME AND TOTAL VIDEO BUFFERED TIME (FOR FUTURE)
            // status.isPlaying ?
            //   console.log("\nwatch time: " + totalWatchTime + "\n" + "buffered time:" + totalBufferedTime)
            //   : null
          }}
        />
        {showPlayPauseButton ? (
          <Animated.View
            style={styles.playPauseIcon}
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <Ionicons
              name={isVideoPlaying ? "play" : "pause"}
              size={48}
              color="white"
            />
          </Animated.View>
        ) : null}
      </Pressable>
      <Progress
        h={0.5}
        value={(totalWatchTime / videoTotalDuration) * 100}
        bottom={0.5}
        _filledTrack={{ borderRadius: 0, bg: GLOBAL_COLORS.secondaryColor }}
        backgroundColor={GLOBAL_COLORS.inactiveTextColor}
        rounded="none"
      />
    </>
  );
};

export default VideoOverlay;

const styles = StyleSheet.create({
  videoContainer: {
    width: "100%",
    height: "100%",
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
});
