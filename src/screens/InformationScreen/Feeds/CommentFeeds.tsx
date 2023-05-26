import { Pressable, StyleSheet } from "react-native";
import React from "react";

import { HStack, Image, Text, VStack, View } from "native-base";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

import commentIcon from "assets/images/commentIcon.png";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../../zustand/translationStore";

export default function CommentFeeds({ data }) {
  const { translations } = translationStore((store) => store);
  return (
    <View>
      {data?.map((item, index) => (
        <HStack
          style={[styles.cardContainer, { alignItems: "flex-start" }]}
          space={2}
          key={index}
        >
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + item.user.photo }}
            style={styles.profile}
            resizeMode="contain"
          />
          <VStack space={1} flexShrink={1}>
            <HStack space={2} flexShrink={1}>
              <Text style={styles.whiteText}>{item.feeds.username}</Text>
              <Text style={styles.redText}>UP</Text>
            </HStack>
            <Text style={styles.subtext} numberOfLines={1}>
              {translations.comment}：{item.message}
            </Text>
            <Pressable style={styles.replyButton}>
              <HStack alignItems="center" space={1}>
                <Image source={commentIcon} style={styles.icon} />
                <Text style={styles.subtext}>
                  {translations.replyToComment}
                </Text>
              </HStack>
            </Pressable>
          </VStack>
        </HStack>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
    marginHorizontal: 15,
    marginVertical: 7,
  },
  whiteText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontWeight: "600",
  },
  subtext: {
    color: GLOBAL_COLORS.inactiveTextColor,
  },
  replyButton: {
    height: 28,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  icon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },
  redText: {
    backgroundColor: "#FF644A",
    color: "white",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    fontWeight: "600",
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
