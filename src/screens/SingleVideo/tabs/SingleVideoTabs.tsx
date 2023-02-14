import { StyleSheet, Text, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { Header } from "./Header";
import { SingleVideo } from "hooks/useSingleVideo";
import CommentList from "features/commentList";
import GridVideos from "features/sectionList/components/GridVideos";
import StickyTabs from "layouts/StickyTabs";

const GridVideosLayout = ({ api_func }) => {
  const { data, isLoading } = useQuery(
    [`work-grid-videos-${api_func}`],
    () => api_func,
    {
      onError: () => {
        //error handler
      },
    }
  );

  if (isLoading) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  return <GridVideos data={data.data} />;
};

const CommentListLayout = () => {
  const route = useRoute<any>();
  const { getWorkComments } = SingleVideo();
  const { data, isLoading, isError, isSuccess } = useQuery(
    [`work-comments-${route.params.id}`],
    () => getWorkComments(route.params.id),
    {
      onError: () => {
        //error handler
      },
    }
  );
  return <CommentList />;
};

const SingleVideoTab = () => {
  const route = useRoute<any>();
  const { getWorkAll, getWorkRecommended } = SingleVideo();

  const tabsData = {
    Header: Header,
    tabItems: [
      {
        name: "TabOthers",
        label: "TA的视频",
        Content: (
          <GridVideosLayout
            api_func={getWorkAll({ user_id: route.params.userId })}
          />
        ), // use user_id as params to get ALL data related on that user_id -> api/work?user_id={user_id}
      },
      {
        name: "TabRecommended",
        label: "更多推荐",
        Content: <GridVideosLayout api_func={getWorkRecommended()} />, // get all recommended video -> api/work/recommended
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
