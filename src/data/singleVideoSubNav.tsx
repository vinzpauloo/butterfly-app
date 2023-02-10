import React from "react";

import GridVideos from "features/sectionList/components/GridVideos";
import CommentList from "features/commentList";
import SingleVideoHeader from "components/headers/SingleVideoHeader";

import { followImages } from "./gridImages";

export const singleVideoSubNav = {
  Header: SingleVideoHeader,
  tabItems: [
    {
      name: "TabOthers",
      label: "TA的视频",
      Content: <GridVideos videos={followImages} isFollowingScreen={true} />,
    },
    {
      name: "TabRecommended",
      label: "更多推荐",
      Content: <GridVideos videos={followImages} isFollowingScreen={true} />,
    },
    {
      name: "TabComments",
      label: "评论",
      Content: <CommentList />
    },
  ],
};