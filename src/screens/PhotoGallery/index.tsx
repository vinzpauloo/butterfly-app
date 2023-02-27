import React from "react";
import {StyleSheet, View, Image, Dimensions, FlatList} from "react-native";
import { FlashList } from "@shopify/flash-list";

import { useRoute } from "@react-navigation/native";
import { GLOBAL_COLORS } from "global";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type Props = {};

const PhotoGallery = () => {
  const route = useRoute<any>();
  const { imageList, index } = route.params;

  const imageWidth = windowWidth;
  const horizontalPadding = (windowWidth - imageWidth) / 2;

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
              getItemLayout={(data, index) => ({
                length: imageWidth + horizontalPadding * 2,
                offset: (imageWidth + horizontalPadding * 2) * index,
                index,
              })}
              renderItem={({ item, index }) => (
                  <View style={[
                    styles.imageContainer,
                    { marginLeft: index === 0 ? horizontalPadding : 0 },
                  ]}>
                    <Image
                        style={[styles.postImage, styles.imageContained]}
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
                  style={[styles.postImage, styles.imageCovered]}
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
    justifyContent: 'center',
    alignContent: 'center',
  },
  postImage: {
    minHeight: windowHeight,
    minWidth: windowWidth,
  },
  imageCovered: {
    resizeMode: "cover",
  },
  imageContained: {
    resizeMode: "cover",
  },
});
