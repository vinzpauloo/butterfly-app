import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FeedList from "layouts/FeedList";
import { feedListData } from "data/feedListData";

type Props = {};

const Feeds = (props: Props) => {
  return <FeedList feedListData={feedListData} />;
};

export default Feeds;

const styles = StyleSheet.create({});
