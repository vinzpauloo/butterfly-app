import React from "react";
import { StyleSheet } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { reelsVideos } from "data/reelsVideos";
import PortraitVideo from "layouts/PortraitVideo";

type Props = {};

const Vlog = (props: Props) => {
  const bottomTabHeight = useBottomTabBarHeight();
  return (
    <PortraitVideo
      reelsVideos={reelsVideos}
      bottomTabHeight={bottomTabHeight}
    />
  );
};

export default Vlog;

const styles = StyleSheet.create({});
