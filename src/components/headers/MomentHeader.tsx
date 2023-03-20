import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

import { Divider } from "native-base";
import { useNavigation } from "@react-navigation/native";

import MomentHeaderSkeleton from "components/skeletons/MomentHeaderSkeleton";
import { GLOBAL_COLORS } from "global";

const MomentHeader = ({ data, isLoading }) => {
  const navigation = useNavigation<any>();

  if (isLoading) {
    return (
      <View style={styles.certificateContainerSkeleton}>
        <MomentHeaderSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.certificateContainer} pointerEvents="box-none">
      {data?.featured?.map((item, index) => (
        <View key={index}>
          <View style={styles.content}>
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
          </View>
          {index === data?.featured?.length - 1 ? null : (
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
