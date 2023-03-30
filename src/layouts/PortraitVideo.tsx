import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import { useDisclose } from "native-base";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";
import BottomComment from "components/BottomComment";
import BottomOverlay from "components/forms/portraitVideoOverlay/BottomOverlay";
import Container from "components/Container";
import RightOverlay from "components/forms/portraitVideoOverlay/RightOverlay";
import VideoOverlay from "components/forms/portraitVideoOverlay/VideoOverlay";
import { commentGlobalStore } from "../zustand/commentGlobalStore";

interface PortraitVideoDataType {
  reelsVideos?: any[];
  bottomTabHeight?: number;
  hasBackButton?: boolean;
  onUserScrollDown?: any;
  workId?: string; // for bottom comments reference as foreign_id
}

type Props = {
  videoID: string;
  userID: number;
  videoURL: string;
  userName: string;
  title: string;
  thumbnail: string;
  tags: string[];
  likes: number;
  amountOfComments: number;
  userImage: string;
  isActive: boolean;
  tabBarHeight: number;
  openComments: () => void;
  isFollowed: boolean;
  isFavorite: boolean;
  isLiked: boolean;
};

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const PortraitVideoContent = (props: Props) => {
  const [isFollowed, setIsFollowed] = useState(props.isFollowed);
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [likeCount, setLikeCount] = useState(props.likes);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);

  useEffect(() => {
    if (props.isActive) {
      setCurrentVLOGWorkID(props.videoID);
    }
  }, [props.isActive]);

  // subscribe to comment global store
  const [setCurrentVLOGWorkID] = commentGlobalStore((state) => [
    state.setCurrentVLOGWorkID,
  ]);

  return (
    <View
      style={[styles.container, { height: windowHeight - props.tabBarHeight }]}
    >
      {props.isActive && (
        <>
          <VideoOverlay
            isActive={props.isActive}
            videoURL={props.videoURL}
            thumbnail={props.thumbnail}
          />
          <BottomOverlay
            userID={props.userID}
            userName={props.userName}
            title={props.title}
            tags={props.tags}
          />
          <RightOverlay
            videoID={props.videoID}
            userID={props.userID}
            userImage={props.userImage}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
            amountOfComments={props.amountOfComments}
            openComments={props.openComments}
            isFollowed={isFollowed}
            setIsFollowed={setIsFollowed}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
          />
        </>
      )}
    </View>
  );
};

const PortraitVideo: React.FC<PortraitVideoDataType> = ({
  reelsVideos,
  bottomTabHeight = 0, // default value
  hasBackButton = false, // default value
  onUserScrollDown = null, // default value
}) => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclose();

  // subscribe to comment global store
  const [currentVLOGWorkID] = commentGlobalStore((state) => [
    state.currentVLOGWorkID,
  ]);

  useEffect(() => {
    console.log("reelsVideos", reelsVideos);
  }, []);

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
      <FlatList
        onEndReached={onUserScrollDown}
        maxToRenderPerBatch={1}
        initialNumToRender={1}
        windowSize={2}
        data={reelsVideos}
        pagingEnabled
        removeClippedSubviews={true}
        renderItem={({ item, index }) => (
          <PortraitVideoContent
            key={item.id}
            videoID={item._id}
            userID={item.user.id}
            userName={item.user.username}
            userImage={item.user.photo}
            // videoURL={item.video_url}
            videoURL={item.trial_video_hls} // Temporarily change to trial videos only
            thumbnail={item.thumbnail_url}
            title={item.title}
            tags={item.tags}
            likes={item.like.total_likes}
            amountOfComments={item.comment.total_comments}
            isFollowed={item.is_followed}
            isLiked={item.is_liked}
            isFavorite={item.is_favorite}
            isActive={activeVideoIndex === index && isFocused}
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
      <BottomComment
        workID={currentVLOGWorkID}
        isOpen={isOpen}
        onClose={onClose}
      />
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
});
