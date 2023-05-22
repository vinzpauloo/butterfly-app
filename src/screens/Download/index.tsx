import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import * as FileSystem from "expo-file-system";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { FlashList } from "@shopify/flash-list";
import { HStack, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import Container from "components/Container";
import VideoComponent from "components/VideoComponent";
import { downloadStore } from "../../zustand/downloadStore";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import { readAsString } from "lib/expoFileSystem";
import { translationStore } from "../../zustand/translationStore";

const DEFAULT_DIRECTORY = FileSystem.documentDirectory + "downloads/";

const SingleVideo = ({ item, fullPathURl }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const translations = translationStore((state) => state.translations);
  const WIDTH_IMG = width < GLOBAL_SCREEN_SIZE.mobileMedium ? "40%" : "30%";
  const WIDTH_CONTENT = width < GLOBAL_SCREEN_SIZE.mobileMedium ? "60%" : "70%";

  const handlePress = () => {
    navigation.navigate("DownloadVideo", {
      previousScreen: "Downloads",
      postTitle: item.title,
      url: fullPathURl,
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        paddingHorizontal: 10,
        backgroundColor: GLOBAL_COLORS.primaryColor,
      }}
    >
      <HStack width="full" height="20" my="1.5">
        <VStack width={WIDTH_IMG} height="full" position="relative">
          <VideoComponent item={item} />
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + item.thumbnail_url }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%", borderRadius: 4 }}
          />
        </VStack>
        <VStack
          width={WIDTH_CONTENT}
          height="full"
          py="0.5"
          pl="2"
          justifyContent="space-between"
        >
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.subtitle}>
            {translations.duration}: {item.duration}
          </Text>
          <HStack alignItems="center" justifyContent="space-between">
            <Text style={styles.subtitle}>{item.user.username}</Text>
          </HStack>
        </VStack>
      </HStack>
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
  title: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  subtitle: {
    color: GLOBAL_COLORS.inactiveTextColor,
  },
});
