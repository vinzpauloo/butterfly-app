import { Pressable, StyleSheet, Text, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Zocial from "react-native-vector-icons/Zocial";
import { useQuery } from "@tanstack/react-query";
import { useNavigation, useRoute } from "@react-navigation/native";

import BannerAds from "features/ads/components/BannerAds";
import { SubNav } from "hooks/useSubNav";
import { globalStyle } from "globalStyles";

export const Header = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { getWork } = SubNav();
  const { data, isLoading } = useQuery({
    queryKey: ["work", route.params.id],
    queryFn: () => getWork(route.params.id),
    onError: (error) => {
      //error handler
      console.log("Error", error);
    },
  });

  // navigate to single tag screen
  const handleNavigate = () => {
    navigation.navigate("SingleTag", { id: route.params.id });
  };

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
            <Pressable key={index} onPress={handleNavigate}>
              <Text style={styles.tag}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.buttonsContent}>
          <View style={styles.buttonItem}>
            <AntDesign
              name="heart"
              color="#999"
              size={15}
              style={styles.icon}
            />
            <Text style={styles.text}>{data?.likes}</Text>
          </View>
          <View style={styles.buttonItem}>
            <MaterialIcons
              name="star"
              color="#999"
              size={18}
              style={styles.icon}
            />
            <Text style={styles.text}>收藏</Text>
          </View>
          <View style={[styles.buttonItem, { flexDirection: "column" }]}>
            <Zocial
              name="bitcoin"
              color="#ff9900"
              size={18}
              style={styles.icon}
            />
            <Text style={[styles.text, { marginVertical: 3 }]}>22金币</Text>
          </View>
          <View style={styles.buttonItem}>
            <MaterialCommunityIcons
              name="download"
              color="#999"
              size={18}
              style={styles.icon}
            />
            <Text style={styles.text}>下载</Text>
          </View>
          <View style={styles.buttonItem}>
            <Fontisto
              name="share-a"
              color="#999"
              size={15}
              style={styles.icon}
            />
            <Text style={styles.text}>分享</Text>
          </View>
        </View>
      </View>
      <BannerAds />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.primaryColor,
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
