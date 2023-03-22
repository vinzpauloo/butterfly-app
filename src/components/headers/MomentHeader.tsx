import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

import { Divider } from "native-base";
import { useNavigation } from "@react-navigation/native";

import MomentHeaderSkeleton from "components/skeletons/MomentHeaderSkeleton";
import { GLOBAL_COLORS } from "global";

const SpecificMoment = ({ index, item, data }) => {
  const navigation = useNavigation<any>();
  const [like, setLike] = useState({
    isAlreadyLike: item.is_liked,
    likeCount: item.total_likes,
  });
  return (
    <View key={index}>
      <View style={styles.content}>
        <View style={styles.dot} />
        <TouchableWithoutFeedback
          key={index}
          onPress={() =>
            navigation.navigate(`SingleFeedScreen`, {
              feedId: item?.feed_id,
              fromMomentHeader: true,
              like: like,
              setLike: setLike,
            })
          }
        >
          <Text style={styles.whiteText} numberOfLines={1}>
            {item.title}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      {index === data?.featured?.length - 1 ? null : (
        <Divider style={styles.divider} color="#999" />
      )}
    </View>
  );
};

const MomentHeader = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <View style={styles.certificateContainerSkeleton}>
        <MomentHeaderSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.certificateContainer} pointerEvents="box-none">
      {data?.map((item, index) => (
        <SpecificMoment key={index} item={item} index={index} data={data} />
      ))}
    </View>
  );
};

export default MomentHeader;

const styles = StyleSheet.create({
  certificateContainer: {
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
    padding: 12,
    // flex: 1,
  },
  certificateContainerSkeleton: {
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
    padding: 12,
    flex: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
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
    marginLeft: 5,
    marginRight: 10,
  },
});
