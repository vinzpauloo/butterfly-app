import { StyleSheet } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import CommentList from "features/commentList";
import GridVideos from "features/sectionList/components/GridVideos";
import StickyTabs from "layouts/StickyTabs";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import { Header } from "./Header";
import { Work } from "hooks/useWork";
import CommentListSkeleton from "components/skeletons/CommentListSkeleton";

const OthersLayout = ({ userId }) => {
  const { getWorkAll } = Work();
  const { data: workAllData, isLoading } = useQuery({
    queryKey: ["allWork", userId],
    queryFn: () =>
      getWorkAll({
        user_id: userId,
        with: "user",
      }),
    onSuccess: (data) => {
      console.log("Success", data);
    },
    onError: (error) => {
      //error handler
      console.log("Error", error);
    },
  });

  if (isLoading) {
    return <VideoListSkeleton />;
  }

  return <GridVideos data={workAllData.data} />;
};

const RecommendedData = ({ data, id }) => {
  const { getWorkRecommended } = Work();
  const { data: recommendedData, isLoading } = useQuery({
    queryKey: ["recommendedSingleVideo", id],
    queryFn: () =>
      getWorkRecommended({
        tags: data.tags.toString(),
        with: "user",
        ads: true,
        page: 1, // will code later for the pagination
        user_id: id,
      }),
    onSuccess: (data) => {
      console.log("Success", data);
    },
    onError: (error) => {
      //error handler
      console.log("Error", error);
    },
  });

  if (isLoading) {
    return <VideoListSkeleton />;
  }

  return <GridVideos data={recommendedData.data} />;
};

const CommentListLayout = () => {
  const route = useRoute<any>();
  const { getWorkComments } = Work();
  const { data, isLoading } = useQuery(
    ["workComments", route.params.id],
    () => getWorkComments({ foreign_id: route.params.id, skip: 0, limit: 5 }),
    {
      onError: () => {
        //error handler
      },
    }
  );

  if (isLoading) {
    return <CommentListSkeleton />;
  }

  return <CommentList data={data} />;
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
        Content: <RecommendedData data={data} id={route.params.userId} />,
      },
      {
        name: "TabComments",
        label: "评论",
        Content: <CommentListLayout />,
      },
    ],
  };
  return <StickyTabs data={tabsData} />;
};

export default SingleVideoTab;

const styles = StyleSheet.create({});
