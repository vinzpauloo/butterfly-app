import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

import { HStack, Divider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import MomentHeaderSkeleton from "components/skeletons/MomentHeaderSkeleton";
import { GLOBAL_COLORS } from "global";
import FeedService from "services/api/FeedService";
import { userStore } from "../../zustand/userStore";

const MomentHeader = () => {
  const token = userStore((state) => state.api_token);
  const navigation = useNavigation<any>();
  const { getFeeds } = FeedService();
  const { data, isLoading } = useQuery({
    queryKey: ["featuredFeeds"],
    queryFn: () => getFeeds({ data: { featured: true }, token }),
  });

  if (isLoading) {
    return (
      <View style={styles.certificateContainer}>
        <MomentHeaderSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.certificateContainer} pointerEvents="box-none">
      {data.featured.map((item, index) => (
        <View key={index}>
          <HStack
            space={2}
            alignItems="center"
            marginRight={5}
            pointerEvents="box-none"
          >
            <View style={styles.dot} />
            <TouchableWithoutFeedback
              key={index}
              onPress={() =>
                navigation.navigate(`SingleFeedScreen`, {
                  feedId: item?.feed_id,
                })
              }
            >
              <Text style={styles.whiteText} numberOfLines={1}>
                {item.title}
              </Text>
            </TouchableWithoutFeedback>
          </HStack>
          {index === data.featured.length - 1 ? null : (
            <Divider style={styles.divider} color="#999" />
          )}
        </View>
      ))}
    </View>
  );
};

export default MomentHeader;

const styles = StyleSheet.create({
  certificateContainer: {
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
    padding: 12,
    flex: 1,
  },
  whiteText: {
    color: "white",
  },
  divider: {
    marginVertical: 12,
  },
  dot: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    height: 8,
    width: 8,
    borderRadius: 4,
  },
});
