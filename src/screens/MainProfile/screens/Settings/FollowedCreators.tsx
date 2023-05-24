import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";

import { Avatar, Pressable, VStack } from "native-base";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";

import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import Loading from "components/Loading";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../../zustand/userStore";
import CommentListSkeleton from "components/skeletons/CommentListSkeleton";
import FollowerSkeleton from "components/skeletons/FollowerSkeleton";
import { useNavigation } from "@react-navigation/native";

interface IContentCreator {
  pictureURL: string;
  name: string;
  id: string;
}

const ContentCreator = ({ pictureURL, name, id }: IContentCreator) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() => navigation.navigate("SingleUser", { userID: id })}
    >
      <VStack space={2} alignItems="center" m={6}>
        <Avatar source={{ uri: BASE_URL_FILE_SERVER + pictureURL }} />
        <Text style={styles.whiteText}>{name}</Text>
      </VStack>
    </Pressable>
  );
};

export default function FollowedCreators() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshingId, setRefreshingId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [startScroll, setStartScroll] = useState(true);
  // ** global state
  const { api_token, _id } = userStore((store) => store);
  // ** api
  const { getFollowedCreators } = CustomerService();
  const { isLoading, isRefetching } = useQuery({
    queryKey: ["FollowedCreators", page, refreshingId],
    queryFn: () => getFollowedCreators({ customer_id: _id, token: api_token }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
  });

  const reachEnd = () => {
    if (startScroll) return null;
    if (!isLoading) {
      if (lastPage !== page) {
        setPage((prev) => prev + 1);
        setStartScroll(true);
      }
    }
  };

  const onRefresh = useCallback(() => {
    setStartScroll(true);
    setRefreshing(true);
    setTimeout(() => {
      setData([]);
      setPage(1);
      setRefreshingId((prev) => prev + 1);
      setRefreshing(false);
    }, 2000);
  }, []);

  if (isLoading || isRefetching) {
    return (
      <Container>
        <FollowerSkeleton />
      </Container>
    );
  }

  return (
    <View style={[styles.wrapper]}>
      <FlashList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
        onTouchStart={() => setStartScroll(false)}
        onEndReached={reachEnd}
        estimatedItemSize={121}
        data={data}
        numColumns={4}
        renderItem={({ item, index }: any) => (
          <ContentCreator
            key={index}
            pictureURL={item?.photo}
            name={item?.username}
            id={item.id}
          />
        )}
        keyExtractor={(item, index) => "" + index}
        ListEmptyComponent={!!data.length ? null : <NoCacheMessage />}
        ListFooterComponent={
          <>
            {/* the gap will be remove if the lastpage is been fetch */}
            {lastPage !== page || (lastPage === page && isLoading) ? (
              <View style={{ marginBottom: 60 }}>
                {/* to have a gap in bottom part of section to see the loading icon */}
                {isLoading ? <Loading /> : null}
              </View>
            ) : null}
            {lastPage === page && !isLoading && !!data.length ? (
              <BottomMessage />
            ) : null}
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  followButton: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 3,
    marginLeft: "auto",
  },
  whiteText: {
    color: "white",
  },
  unfollowButton: {
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.inactiveTextColor,
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRadius: 3,
    marginLeft: "auto",
  },
  unfollowText: {
    color: GLOBAL_COLORS.inactiveTextColor,
  },
  wrapper: {
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
});
