import { StyleSheet } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import CommentList from "features/commentList";
import GridVideos from "features/sectionList/components/GridVideos";
import StickyTabs from "layouts/StickyTabs";
import { Header } from "./Header";
import { Work } from "hooks/useWork";
import { useState } from "react";
import StickyTabsGridVideos from "features/sectionList/components/StickyTabsGridVideos";
import CommentTextInput from "components/CommentTextInput";
import Container from "components/Container";
import { Tab, Tabs } from "react-native-collapsible-tab-view";

const OthersLayout = ({ userId }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const { getWorkAll } = Work();
  const { isLoading } = useQuery({
    queryKey: ["allWork", userId, page],
    queryFn: () =>
      getWorkAll({
        user_id: userId,
        with: "user",
        creator_only: true,
        ads: true,
        page: page,
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
      setPage={setPage}
      lastPage={lastPage}
      layout={<GridVideos data={data} />}
    />
  );
};

const RecommendedData = ({ recommendedData, id }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const { getWorkRecommended } = Work();
  const { isLoading } = useQuery({
    queryKey: ["recommendedSingleVideo", id, page],
    queryFn: () =>
      getWorkRecommended({
        tags: recommendedData.tags.toString(),
        with: "user",
        ads: true,
        page: page,
        user_id: id,
        recommended: true,
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
      setPage={setPage}
      lastPage={lastPage}
      layout={<GridVideos data={data} />}
    />
  );
};

const SingleVideoTab = ({ data }) => {
  const route = useRoute<any>();

  const tabsData = {
    Header: () => <Header data={data} />,
    tabItems: [
      {
        name: "TabOthers",
        label: "TA的视频",
        Content: <OthersLayout userId={route.params.userId} />,
      },
      {
        name: "TabRecommended",
        label: "更多推荐",
        Content: (
          <RecommendedData recommendedData={data} id={route.params.userId} />
        ),
      },
      {
        name: "TabComments",
        label: "评论",
        Content: (
            <Container>
            <Tabs.ScrollView accessibilityComponentType={undefined} accessibilityTraits={undefined}>
                <CommentList workID={data._id} />
              </Tabs.ScrollView>
              <CommentTextInput workID={data._id} keyboardAvoidBehavior="position" />
            </Container>

        ),
      },
    ],
  };
  return <StickyTabs data={tabsData} />;
};

export default SingleVideoTab;

const styles = StyleSheet.create({});
