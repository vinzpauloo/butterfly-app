import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { HStack, Divider } from "@react-native-material/core";

import FeedList from "layouts/FeedList";
import { officialCertificateList } from "./officialCertificateList";
import { feedListData } from "data/feedListData";
import { globalStyle } from "globalStyles";

const Header = () => {
  return (
    <View style={styles.certificateContainer}>
      <FlatList
        data={officialCertificateList}
        renderItem={({ item }) => (
          <Pressable onPress={() => Alert.alert("asdsad")}>
            <HStack spacing={12} style={styles.certificateItem}>
              <View style={styles.dot}></View>
              <Text style={styles.whiteText}>{item.certificateName}</Text>
            </HStack>
          </Pressable>
        )}
        keyExtractor={(item, index) => "" + index}
        ItemSeparatorComponent={() => (
          <Divider style={styles.divider} color="#999" />
        )}
      />
    </View>
  );
};

export const momentSubNav = {
  Header,
  tabItems: [
    {
      name: "recommended",
      label: "推荐",
      Content: <FeedList feedListData={feedListData} />,
    },
    {
      name: "latest",
      label: "最新",
      Content: <FeedList feedListData={feedListData} />,
    },
    {
      name: "videos",
      label: "视频",
      Content: <FeedList feedListData={feedListData} />,
    },
    {
      name: "photo",
      label: "图片",
      Content: <FeedList feedListData={feedListData} />,
    },
    {
      name: "services",
      label: "服务",
      Content: <FeedList feedListData={feedListData} />,
    },
  ],
};

const styles = StyleSheet.create({
  certificateContainer: {
    backgroundColor: globalStyle.headerBasicBg,
    padding: 12,
  },
  whiteText: {
    color: "white",
  },
  divider: {
    marginVertical: 12,
  },
  dot: {
    backgroundColor: globalStyle.secondaryColor,
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  certificateItem: {
    alignItems: "center",
  },
});
