import React from "react";

import Moment from "screens/SingleUser/tabs/Moment";
import Work from "screens/SingleUser/tabs/Work";
import Collection from "screens/SingleUser/tabs/Collection";
import SingleUserHeader from "components/headers/SingleUserHeader";

export const singleUserSubNav = {
  Header: SingleUserHeader,
  tabItems: [
    {
      name: "moment",
      label: "动态",
      Content: <Moment />,
    },
    {
      name: "work",
      label: "作品",
      Content: <Work />,
    },
    {
      name: "collection",
      label: "收藏",
      Content: <Collection />,
    },
  ],
};
