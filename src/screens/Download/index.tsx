import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { FlashList } from "@shopify/flash-list";
import * as FileSystem from "expo-file-system";

import Container from "components/Container";
import VideoComponent from "components/VideoComponent";
import { downloadStore } from "../../zustand/downloadStore";
import { GLOBAL_COLORS } from "global";
import { readAsString } from "lib/expoFileSystem";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

const DEFAULT_DIRECTORY = FileSystem.documentDirectory + "downloads/";

const SingleVideo = ({ item, fullPathURl }) => {
  const navigation = useNavigation<any>();

  const navigatoToWatchDownloadVideo = () => {
    navigation.navigate("DownloadVideo", {
      previousScreen: "Downloads",
      postTitle: item.title,
      url: fullPathURl,
    });
  };

  return (
    <Pressable style={styles.container} onPress={navigatoToWatchDownloadVideo}>
      <View style={styles.thumbnailContainer}>
        <VideoComponent item={item} />
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + item.thumbnail_url }}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Image
          source={{ uri: BASE_URL_FILE_SERVER + item.user.photo }}
          style={styles.modelImg}
        />
        <View style={styles.texts}>
          <Text style={styles.text} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.username} numberOfLines={1}>
            {item.user.username}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const VideoContainer = ({ data }) => {
  const fullPathURL = DEFAULT_DIRECTORY + data + ".mp4";

  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const readAsStringData = async () => {
    const item = await readAsString(data + ".txt");
    setItem(item);
    setIsLoading(false);
  };

  useEffect(() => {
    readAsStringData();
  }, [data]);

  if (isLoading) return null;

  return <SingleVideo item={item} fullPathURl={fullPathURL} />;
};

const DownloadScreen = () => {
  const { downloaded } = downloadStore((state) => state);
  const [data, setData] = useState([]);

  useEffect(() => {
    const removeExtension = downloaded.map((item) => {
      const id = item.split("."); // [id, extension]
      return id[0]; // return the id only
    });
    const removeDuplicateID = [...new Set(removeExtension)];
    setData(removeDuplicateID);
  }, []);

  return (
    <Container>
      <FlashList
        data={data}
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
  //SINGLE VIDEO
  thumbnailContainer: {
    position: "relative",
  },
  container: {
    marginVertical: 10,
    height: 220,
    marginHorizontal: 15,
  },
  image: {
    height: 180,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  modelImg: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginHorizontal: 5,
  },
  texts: {
    justifyContent: "space-evenly",
  },
  text: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 15,
  },
  username: {
    color: GLOBAL_COLORS.usernameTextColor,
    fontSize: 15,
  },
});
