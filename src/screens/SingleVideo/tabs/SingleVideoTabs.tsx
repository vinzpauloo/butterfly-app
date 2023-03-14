import { useState } from "react";
import { StyleSheet } from "react-native";

import { Tabs } from "react-native-collapsible-tab-view";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import CommentTextInput from "components/CommentTextInput";
import Container from "components/Container";
import CommentList from "features/commentList";
import GridVideos from "features/sectionList/components/GridVideos";
import StickyTabs from "layouts/StickyTabs";
import StickyTabsGridVideos from "features/sectionList/components/StickyTabsGridVideos";
import WorkService from "services/api/WorkService";
import { Header } from "./Header";
import { userStore } from "../../../zustand/userStore";

const OthersLayout = ({ userId, workID, token }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);

  const { getWorks } = WorkService();

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["allWork", userId, page, refreshingId],
    queryFn: () =>
      getWorks({
        data: {
          user_id: userId,
          with: "user",
          creator_only: true,
          ads: true,
          page: page,
          exclude: workID,
        },
        token: token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      //error handler
      console.log("Error", error);
    },
  });

  return (
    <StickyTabsGridVideos
      isLoading={isLoading}
      page={page}
      refreshing={refreshing}
      setData={setData}
      setRefreshing={setRefreshing}
      setRefreshingId={setRefreshingId}
      setPage={setPage}
      lastPage={lastPage}
      layout={<GridVideos data={data} />}
      isRefetching={isRefetching}
    />
  );
};

const RecommendedData = ({ id, recommendedData, workID, token }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(0);
  const { getWorks } = WorkService();

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["recommendedSingleVideo", id, page, refreshingId],
    queryFn: () =>
      getWorks({
        data: {
          tags: recommendedData.tags.toString(),
          with: "user",
          ads: true,
          page: page,
          user_id: id,
          recommended: true,
          exclude: workID,
        },
        token: token,
      }),
    onSuccess: (data) => {
      setLastPage(data.last_page);
      setData((prev) => [...prev].concat(data.data));
    },
    onError: (error) => {
      //error handler
      console.log("Error", error);
    },
  });

  return (
    <StickyTabsGridVideos
      isLoading={isLoading}
      page={page}
      refreshing={refreshing}
      setData={setData}
      setRefreshing={setRefreshing}
      setRefreshingId={setRefreshingId}
      setPage={setPage}
      lastPage={lastPage}
      layout={<GridVideos data={data} />}
      isRefetching={isRefetching}
    />
  );
};

const SingleVideoTab = ({ data }) => {
  const token = userStore((state) => state.api_token);
  const route = useRoute<any>();

  const tabsData = {
    Header: () => <Header data={data} />,
    tabItems: [
      {
        name: "TabOthers",
        label: "TA的视频",
        Content: (
          <OthersLayout
            userId={route.params.userId}
            workID={data._id}
            token={token}
          />
        ),
      },
      {
        name: "TabRecommended",
        label: "更多推荐",
        Content: (
          <RecommendedData
            workID={data._id}
            recommendedData={data}
            id={route.params.userId}
            token={token}
          />
        ),
      },
      {
        name: "TabComments",
        label: "评论",
        Content: (
          <Container>
            {/* TEMPORARY BUGGY UI - FOR NOW COMMENT PAGING SHOULD WORK */}
            {/*
            <Tabs.Tab name="asd">
              <CommentList workID={data._id} />
              <CommentTextInput workID={data._id} keyboardAvoidBehavior="position" />
            </Tabs.Tab>
            */}
            <Tabs.ScrollView
              accessibilityComponentType={undefined}
              accessibilityTraits={undefined}
            >
              <CommentList workID={data._id} />
            </Tabs.ScrollView>
            <CommentTextInput
              workID={data._id}
              keyboardAvoidBehavior="position"
            />
          </Container>
        ),
      },
    ],
  };
  return <StickyTabs data={tabsData} />;
};

export default SingleVideoTab;

const styles = StyleSheet.create({});
