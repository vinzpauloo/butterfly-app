import React from "react";

import Moment from "screens/SingleUser/tabs/Moment";
import Projects from "screens/SingleUser/tabs/Projects";
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
      name: "projects",
      label: "作品",
      Content: <Projects />,
    },
    {
      name: "collection",
      label: "收藏",
      Content: <Collection />,
    },
  ],
};