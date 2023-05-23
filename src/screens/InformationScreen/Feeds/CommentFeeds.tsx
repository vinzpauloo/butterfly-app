import { Pressable, StyleSheet } from "react-native";
import React from "react";

import { Avatar, HStack, Image, Text, VStack, View } from "native-base";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

import commentIcon from "assets/images/commentIcon.png";
import vincent from "assets/images/vincent-avatar.png";
import { GLOBAL_COLORS } from "global";

export default function CommentFeeds({ data }) {
  return (
    <View>
      {data?.map((item, index) => (
        <HStack
          style={[styles.cardContainer, { alignItems: "flex-start" }]}
          space={2}
          key={index}
        >
          <Avatar size={12} source={vincent} />
          <VStack space={1} flexShrink={1}>
            <HStack space={2} flexShrink={1}>
              <Text style={styles.whiteText}>{item.feeds.username}</Text>
              <Text style={styles.redText}>UP</Text>
            </HStack>
            <Text style={styles.subtext} numberOfLines={1}>
              Comment：{item.message}
            </Text>
            <Pressable style={styles.replyButton}>
              <HStack alignItems="center" space={1}>
                <Image source={commentIcon} style={styles.icon} />
                <Text style={styles.subtext}>回复评论</Text>
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
    width: 100,
    height: 28,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
});
