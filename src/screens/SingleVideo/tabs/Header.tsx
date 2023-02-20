import { Pressable, StyleSheet, Text, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Zocial from "react-native-vector-icons/Zocial";
import { useNavigation, useRoute } from "@react-navigation/native";

import BannerAds from "features/ads/components/BannerAds";
import { GLOBAL_COLORS } from "global";
import LikeButton from "components/forms/singleVideo/LikeButton";
import FavoriteButton from "components/forms/singleVideo/FavoriteButton";
import { downloadFile } from "utils/downloadFile";

export const Header = ({ data }) => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  // navigate to single tag screen
  const handleNavigate = (item) => {
    navigation.navigate("SingleTag", { id: route.params.id, tag: item });
  };

  function testDownload() {
    const fileName = "test-file-name"
    alert("start downloading!")
    downloadFile('http://techslides.com/demos/sample-videos/small.mp4', fileName)
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{data?.title}</Text>
        <View style={styles.watchContent}>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name="play-box-outline"
              color="#999"
              size={15}
              style={styles.icon}
            />
            <Text style={styles.text}>
              {data?.statistic.watched} | 时长: {data?.duration}
            </Text>
          </View>
          <View style={styles.item}>
            <AntDesign
              name="exclamationcircleo"
              color="#999"
              size={13}
              style={styles.icon}
            />
            <Text style={styles.text}>未经作者允许禁止转载</Text>
          </View>
        </View>
        <View style={styles.tags}>
          {data?.tags.map((item, index) => (
            <Pressable key={index} onPress={() => handleNavigate(item)}>
              <Text style={styles.tag}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.buttonsContent}>
          <LikeButton data={data} id={route.params.id} />
          <FavoriteButton id={route.params.id} />
          <View style={[styles.buttonItem, { flexDirection: "column" }]}>
            <Zocial
              name="bitcoin"
              color="#ff9900"
              size={18}
              style={styles.icon}
            />
            <Text style={[styles.text, { marginVertical: 3 }]}>22金币</Text>
          </View>
          <Pressable onPress={testDownload} style={styles.buttonItem}>
            <MaterialCommunityIcons
              name="download"
              color="#999"
              size={18}
              style={styles.icon}
            />
            <Text style={styles.text}>下载</Text>
          </Pressable>
          <Pressable
            style={styles.buttonItem}
            onPress={() => navigation.navigate("SharingPromotion")}
          >
            <Fontisto
              name="share-a"
              color="#999"
              size={15}
              style={styles.icon}
            />
            <Text style={styles.text}>分享</Text>
          </Pressable>
        </View>
      </View>
      <BannerAds />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  // Video summary
  watchContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#999",
    fontSize: 12,
  },
  icon: {
    marginHorizontal: 3,
  },

  // Video tags list
  tags: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  tag: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    color: "#999",
    paddingTop: 2,
    paddingHorizontal: 5,
    borderColor: "#999",
    borderWidth: 2,
    borderRadius: 20,
    textAlign: "center",
    marginHorizontal: 3,
    marginVertical: 5,
  },

  // Video additional options
  buttonsContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  buttonItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});
