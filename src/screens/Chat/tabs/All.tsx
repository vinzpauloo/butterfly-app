import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import ModelGroupService from "services/api/ModelGroupService";
import UserProfilePicList from "features/sectionList/components/UserProfilePicList";
import UserProfilePicListSkeleton from "components/skeletons/UserProfilePicListSkeleton";
import { GLOBAL_COLORS } from "global";

const All = () => {
  const { getAllModelGroup } = ModelGroupService();
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: ["allModelGroup"],
    queryFn: () => getAllModelGroup({}),
    onSuccess: () => {
      console.log("=== model group fetched from backend! ===");
    },
    onError: (error) => {
      console.log("=== error fetching model group from backend! ===", error);
    },
  });

  if (isLoading || isRefetching) {
    return (
      <Container>
        <UserProfilePicListSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.userContainer}>
        <FlashList
          estimatedItemSize={399}
          data={data}
          renderItem={({ item }: any) => (
            <>
              <Text style={styles.categoryText}>{item.name}</Text>
              <UserProfilePicList userInfo={item.users} />
            </>
          )}
          keyExtractor={(item, index) => "" + index}
          ListFooterComponent={<BottomMessage />}
        />
      </View>
    </Container>
  );
};

export default All;

const styles = StyleSheet.create({
  categoryText: {
    color: GLOBAL_COLORS.primaryTextColor,
    borderLeftColor: GLOBAL_COLORS.secondaryColor,
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginTop: 12,
  },
  userContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
