import { StyleSheet } from "react-native";
import React from "react";

import FeedList from "layouts/FeedList";
import { feedListData } from "data/feedListData";

const Moment = () => {
  return <FeedList feedListData={feedListData} />;
};

export default Moment;

const styles = StyleSheet.create({});
