import { StyleSheet, Text, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { Header } from "./Header";
import { SingleVideo } from "hooks/useSingleVideo";
import GridVideos from "features/sectionList/components/GridVideos";
import CommentList from "features/commentList";

type Props = {};

const GridVideosLayout = ({ isAll = false }) => {
  const route = useRoute<any>();
  const { getWorkAll, getWorkRecommended } = SingleVideo();
  const { data, isLoading, isError, isSuccess } = useQuery(
    [`work-grid-videos-${isAll}`],
    () =>
      isAll
        ? getWorkAll({ user_id: route.params.userId }) // use user_id as params to get ALL data related on that user_id -> api/work?user_id={user_id}
        : getWorkRecommended() // get all recommended video -> api/work/recommended
  );

  if (isLoading) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  console.log("@@@@", data.data);

  return <GridVideos data={data.data} />;
};

const CommentListLayout = () => {
  const route = useRoute<any>();
  const { getWorkComments } = SingleVideo();
  const { data, isLoading, isError, isSuccess } = useQuery(
    [`work-comments-${route.params.id}`],
    () => getWorkComments(route.params.id)
  );
  return <CommentList />;
};

const index = {
  Header: Header,
  tabItems: [
    {
      name: "TabOthers",
      label: "TA的视频",
      Content: <GridVideosLayout isAll />,
    },
    {
      name: "TabRecommended",
      label: "更多推荐",
      Content: <GridVideosLayout />,
    },
    {
      name: "TabComments",
      label: "评论",
      Content: <CommentListLayout />,
    },
  ],
};

export default index;

const styles = StyleSheet.create({});
