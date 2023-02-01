import { StyleSheet, Text, View } from "react-native";
import React from "react";

import FeedList from "layouts/FeedList";
import { feedListData } from "data/feedListData";

type Props = {};

const Moment = (props: Props) => {
  return <FeedList feedListData={feedListData} />;
};

export default Moment;

const styles = StyleSheet.create({});
