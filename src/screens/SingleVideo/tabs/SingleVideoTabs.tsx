import { useState } from "react";
import { StyleSheet } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import CommentTextInput from "components/CommentTextInput";
import CommentList from "features/commentList";
import GridVideos from "features/sectionList/components/GridVideos";
import StickyTabs from "layouts/StickyTabs";
import StickyTabsGridVideos from "features/sectionList/components/StickyTabsGridVideos";
import WorkService from "services/api/WorkService";
import { Header } from "./Header";
import { userStore } from "../../../zustand/userStore";
import { translationStore } from "../../../zustand/translationStore";

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
  const translations = translationStore((state) => state.translations);
  const route = useRoute<any>();

  const tabsData = {
    Header: () => <Header data={data} />,
    tabItems: [
      {
        name: "TabOthers",
        label: translations.others,
        Content: (
          <OthersLayout
            userId={data.user?.id}
            workID={data._id}
            token={token}
          />
        ),
      },
      {
        name: "TabRecommended",
        label: translations.recommended,
        Content: (
          <RecommendedData
            workID={data._id}
            recommendedData={data}
            id={data.user?.id}
            token={token}
          />
        ),
      },
      {
        name: "TabComments",
        label: translations.comments,
        Content: (
          <>
            <CommentList workID={data._id} isFromSingleVideo />
            <CommentTextInput
              workID={data._id}
              keyboardAvoidBehavior="position"
            />
          </>
        ),
      },
    ],
  };
  return <StickyTabs data={tabsData} />;
};

export default SingleVideoTab;

const styles = StyleSheet.create({});
