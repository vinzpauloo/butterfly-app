import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import { FlashList } from "@shopify/flash-list";

import Container from "components/Container";
import * as FileSystem from "expo-file-system";
import VideoPlayer from "components/VideoPlayer";
import { readFileDirectory } from "lib/expoFileSystem";

const DEFAULT_DIRECTORY = FileSystem.documentDirectory + "downloads/";

const VideoContainer = ({ data }) => {
  const fullPathURL = DEFAULT_DIRECTORY + data;
  return (
    <View style={styles.container}>
      <VideoPlayer url={fullPathURL} isFocus={false} />
    </View>
  );
};

const DownloadScreen = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const directories = await readFileDirectory();
      setVideos(directories);
    })();
  }, []);

  return (
    <Container>
      <FlashList
        data={videos}
        keyExtractor={(_, index) => "" + index}
        renderItem={({ item, index }) => (
          <VideoContainer key={index} data={item} />
        )}
      />
    </Container>
  );
};

export default DownloadScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
