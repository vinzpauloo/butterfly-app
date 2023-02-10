import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { HStack, Divider,  } from "native-base";

import FeedList from "layouts/FeedList";
import { officialCertificateList } from "./officialCertificateList";
import { feedListData } from "data/feedListData";
import { globalStyle } from "globalStyles";
import MomentHeaderSkeleton from "components/skeletons/MomentHeaderSkeleton";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation<any>();
  const [certificateListIsLoaded, setCertificateListIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setCertificateListIsLoaded(true), 1000);
  });

  return (
    <View style={styles.certificateContainer}>
      {certificateListIsLoaded ?  
        officialCertificateList.map((certificate, index) => 
          <Pressable key={index} onPress={() => navigation.navigate("SingleFeedScreen", { postTitle: "详情" })}>
            <HStack space={3} alignItems="center">
              <View style={styles.dot}></View>
              <Text style={styles.whiteText}>{certificate.certificateName}</Text>
            </HStack>
            {index === officialCertificateList.length - 1 ? null
              : <Divider style={styles.divider} color="#999" />}
          </Pressable>)
      :
        <MomentHeaderSkeleton/>
      }
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
    flex: 1,
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
});
