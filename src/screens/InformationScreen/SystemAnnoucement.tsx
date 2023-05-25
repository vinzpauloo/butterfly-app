import { useCallback, useState } from "react";
import {
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import { Button, HStack, Modal, Pressable, VStack } from "native-base";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";

import AnnoucementService from "services/api/AnnoucementService";
import BottomMessage from "components/BottomMessage";
import Container from "components/Container";
import CustomModal from "components/CustomModal";
import Loading from "components/Loading";
import MessageItemSkeleton from "components/skeletons/MessageItemSkeleton";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import SystemIcon from "assets/images/SystemIcon.png";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";

const Announcement = ({ open, setOpen, data }) => {
  const { translations } = translationStore((store) => store);
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <Modal.Content>
        <Modal.Body>
          {/* Icon & Title */}
          <VStack alignItems="center" space={5} style={{ marginBottom: 10 }}>
            <FontAwesome
              name="bell"
              size={30}
              color={GLOBAL_COLORS.secondaryColor}
            />
            <Text numberOfLines={2}>{data?.title}</Text>
          </VStack>

          {/* Announcement details */}
          <VStack space={2} style={{ marginBottom: 20 }}>
            <Text>{data?.description}</Text>
          </VStack>

          {/* Button */}
          <HStack space={3} justifyContent="center">
            <Button
              size="sm"
              style={styles.button}
              onPress={() => setOpen(false)}
            >
              {translations.close}
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </CustomModal>
  );
};

const Content = ({ data }) => {
  const { width } = useWindowDimensions();
  // ** state
  const [open, setOpen] = useState(false);

  const handlePress = () => {
    setOpen(true);
  };

  return (
    <>
      <Pressable onPress={handlePress}>
        <HStack style={styles.cardContainer} space={2}>
          <Image source={SystemIcon} style={styles.systemIcon} />
          <VStack space={2} flexShrink={1}>
            <HStack w="full" alignItems="center" justifyContent="space-between">
              <Text
                style={[styles.whiteText, { width: width * 0.5 }]}
                numberOfLines={1}
              >
                {data?.title}
              </Text>
              {width < GLOBAL_SCREEN_SIZE.mobile ? (
                <Text style={{ opacity: 0.5, color: "white", fontSize: 10 }}>
                  {moment(data.updated_at).calendar().includes("Today")
                    ? moment(data.updated_at).format("h:mm A")
                    : moment(data.updated_at).format("MM/DD/YYYY")}
                </Text>
              ) : (
                <Text style={{ opacity: 0.5, color: "white", fontSize: 10 }}>
                  {moment(data.updated_at).format("h:mm A")}{" "}
                  {moment(data.updated_at).format("MM/DD/YYYY")}
                </Text>
              )}
            </HStack>
            <Text style={styles.subtext} numberOfLines={3}>
              {data?.description}
            </Text>
          </VStack>
        </HStack>
      </Pressable>
      <Announcement open={open} setOpen={setOpen} data={data} />
    </>
  );
};

export default function SystemAnnouncement() {
  const [paginate, setPaginate] = useState(10);
  const [lastPage, setLastPage] = useState(0);
  const [startScroll, setStartScroll] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);
  // ** global store
  const { api_token } = userStore((store) => store);
  // ** api
  const { getAnnouncementLists } = AnnoucementService();

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["announcement-list", page, refreshingId],
    queryFn: () =>
      getAnnouncementLists({
        token: api_token,
        data: {
          sort: "asc",
          sort_by: "created_at",
          page: page,
          paginate: paginate,
        },
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
  });

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

  const reachEnd = () => {
    if (startScroll) return null;
    if (!isLoading) {
      if (lastPage !== page) {
        setPage((prev) => prev + 1);
        setStartScroll(true);
      }
    }
  };

  if (isLoading || isRefetching) {
    return (
      <Container>
        <MessageItemSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <FlashList
        refreshControl={
          <RefreshControl
            colors={[GLOBAL_COLORS.secondaryColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={data}
        onEndReachedThreshold={0.01} // always make this default to 0.01 to have no bug for fetching data for the onEndReached -> https://github.com/facebook/react-native/issues/14015#issuecomment-346547942
        onMomentumScrollBegin={() => setStartScroll(false)}
        onEndReached={reachEnd}
        contentContainerStyle={{ paddingVertical: 15 }}
        renderItem={({ item, index }) => <Content key={index} data={item} />}
        ListEmptyComponent={!!data.length ? null : <NoCacheMessage />}
        ListFooterComponent={() => (
          <>
            {/* the gap will be remove if the lastpage is been fetch */}
            {lastPage !== page || (lastPage === page && isLoading) ? (
              <View style={{ marginBottom: 60 }}>
                {/* to have a gap in bottom part of section to see the loading icon */}
                {isLoading ? <Loading /> : null}
              </View>
            ) : null}
            {lastPage === page && !isLoading && data.length ? (
              <BottomMessage />
            ) : null}
          </>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  whiteText: {
    color: "white",
    fontWeight: "600",
  },
  subtext: {
    color: "#8F9399",
  },
  systemIcon: {
    height: 38,
    width: 38,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 20,
    width: 80,
  },
});
