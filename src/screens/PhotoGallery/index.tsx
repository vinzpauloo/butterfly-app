import React from "react";
import { StyleSheet, View, Image, Dimensions, FlatList } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { useRoute } from "@react-navigation/native";
import { GLOBAL_COLORS } from "global";

const { width } = Dimensions.get("window");

const PhotoGallery = () => {
  const route = useRoute<any>();
  const { imageList, index } = route.params;

  return (
    <View style={styles.container}>
      {!!route?.params.fromFeedItem ? (
        <FlatList
          data={imageList}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={index}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                style={styles.postImage}
                source={{ uri: item.url, cache: "only-if-cached" }}
              />
            </View>
          )}
        />
      ) : (
        <FlashList
          data={imageList}
          renderItem={({ item }: any) => (
            <View style={styles.imageContainer}>
              <Image
                style={styles.postImage}
                source={{ uri: item.url, cache: "only-if-cached" }}
              />
            </View>
          )}
          estimatedItemSize={319}
          initialScrollIndex={index}
        />
      )}
    </View>
  );
};

export default PhotoGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    minHeight: 100,
  },
  imageContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
  postImage: {
    width: width,
    resizeMode: "contain",
    height: "100%",
  },
});
