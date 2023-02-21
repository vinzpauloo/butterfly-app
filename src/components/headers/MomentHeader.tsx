import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { HStack, Divider } from "native-base";
import { useNavigation } from "@react-navigation/native";

import {useQuery} from "@tanstack/react-query";

import { GLOBAL_COLORS } from "global";

import {Feeds} from "hooks/useFeeds";

import MomentHeaderSkeleton from "components/skeletons/MomentHeaderSkeleton";

type Props = {};

const MomentHeader = (props: Props) => {
  const navigation = useNavigation<any>();

  const {getFeeds} = Feeds();
  const {data, isLoading} = useQuery({
    queryKey:['featuredFeeds'],
    queryFn: () => getFeeds({featured: true, site_id: 1})
  })
  if(isLoading){
    return (
        <View style={styles.certificateContainer}>
          <MomentHeaderSkeleton />
        </View>
    )
  }

  return (
      <View style={styles.certificateContainer}>
        {data.featured.map((item, index) =>
            <Pressable key={index} onPress={() => navigation.navigate("SingleFeedScreen", { postTitle: "详情" })}>
              <HStack space={2} alignItems="center" marginRight={5}>
                <View style={styles.dot}></View>
                <Text style={styles.whiteText} numberOfLines={1}>{item.title}</Text>
              </HStack>
              {index === data.featured.length - 1 ? null
                  : <Divider style={styles.divider} color="#999" />}
            </Pressable>
        )}
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
