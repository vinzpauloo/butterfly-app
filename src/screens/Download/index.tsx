import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import { FlashList } from "@shopify/flash-list";
import * as FileSystem from "expo-file-system";

import Container from "components/Container";
import VideoPlayer from "components/VideoPlayer";
import { downloadStore } from "../../zustand/downloadStore";

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
  const { downloaded } = downloadStore((state) => state);

  return (
    <Container>
      <FlashList
        data={downloaded}
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
