import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialTopTabs from "../../layouts/navigators/MaterialTopTabs";
import Feeds from "./tabs/Feeds";
import Home from "./tabs/Home";
import Moment from "./tabs/Moment";
import Photography from "./tabs/Photography";
import Date from "./tabs/Date";

const mainTopNav = [
  {
    name: "关注",
    component: Feeds,
  },
  {
    name: "首页",
    component: Home,
  },
  {
    name: "动态",
    component: Moment,
  },
  {
    name: "约会",
    component: Photography,
  },
  {
    name: "写真",
    component: Date,
  },
];

const HomeTab = () => {
  return <MaterialTopTabs data={mainTopNav} />;
};

export default HomeTab;

const styles = StyleSheet.create({});
