import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Zocial from "react-native-vector-icons/Zocial";
import { useNavigation, useRoute } from "@react-navigation/native";

import BannerAds from "features/ads/components/BannerAds";
import FavoriteButton from "components/forms/singleVideo/FavoriteButton";
import LikeButton from "components/forms/singleVideo/LikeButton";
import { downloadFile } from "lib/expoFileSystem";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../../zustand/translationStore";

export const Header = ({
  data,
  like,
  setLike,
  isAlreadyFavorite,
  setIsAlreadyFavorite,
}) => {
  const translations = translationStore((state) => state.translations);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  // navigate to single tag screen
  const handleNavigate = (item) => {
    navigation.navigate("SingleTag", {
      id: route.params.id,
      tag: item,
      userId: route.params.userId,
    });
  };

  const handleDownload = () => {
    // const fileUrl = data.video_url;
    const fileUrl = "http://techslides.com/demos/sample-videos/small.mp4"; // Temporary file for testing
    const fileName = data._id + ".mp4"; // Work ID + video extension

    console.log("Downloading ...", fileName);

    downloadFile(fileUrl, fileName);
  };

  return (
    <>
      <View style={styles.container} pointerEvents="box-none">
        <Text style={styles.title}>{data?.title}</Text>
        {data?.description && (
          <Text style={styles.description}>{data?.description}</Text>
        )}
        <View style={styles.watchContent}>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name="play-box-outline"
              color="#999"
              size={15}
              style={styles.icon}
            />
            <Text style={styles.text}>
              {data?.statistic?.watched} | {translations.duration}:{" "}
              {data?.duration}
            </Text>
          </View>
          <View style={styles.item}>
            <AntDesign
              name="exclamationcircleo"
              color="#999"
              size={13}
              style={styles.icon}
            />
            <Text style={styles.text} numberOfLines={2}>
              {translations.reprinting}
            </Text>
          </View>
        </View>
        <View style={styles.tags} pointerEvents="box-none">
          {data?.tags?.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleNavigate(item)}
            >
              <Text style={styles.tag}>{item}</Text>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <View style={styles.buttonsContent} pointerEvents="box-none">
          <LikeButton id={route.params.id} like={like} setLike={setLike} />
          <FavoriteButton
            id={route.params.id}
            isAlreadyFavorite={isAlreadyFavorite}
            setIsAlreadyFavorite={setIsAlreadyFavorite}
          />
          <View style={[styles.buttonItem, { flexDirection: "column" }]}>
            <Zocial
              name="bitcoin"
              color="#ff9900"
              size={18}
              style={styles.icon}
            />
            <Text style={[styles.text, { marginVertical: 3 }]}>
              22{translations.coin}
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={handleDownload}>
            <View style={styles.buttonItem} pointerEvents="box-none">
              <MaterialCommunityIcons
                name="download"
                color="#999"
                size={18}
                style={styles.icon}
              />
              <Text style={styles.text}>{translations.download}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("SharingPromotion")}
          >
            <View style={styles.buttonItem} pointerEvents="box-none">
              <Fontisto
                name="share-a"
                color="#999"
                size={15}
                style={styles.icon}
              />
              <Text style={styles.text}>{translations.share}</Text>
            </View>
          </TouchableWithoutFeedback>
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
  description: {
    color: "#fff",
    fontSize: 12,
    paddingBottom: 10,
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
