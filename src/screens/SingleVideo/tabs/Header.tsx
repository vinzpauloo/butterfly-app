import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Zocial from "react-native-vector-icons/Zocial";
import { useNavigation, useRoute } from "@react-navigation/native";

import BannerAds from "features/ads/components/BannerAds";
import CoinIcon from "assets/images/coinIcon.png";
import CustomModal from "components/CustomModal";
import DownloadIcon from "assets/images/downloadIcon.png";
import DownloadedIcon from "assets/images/downloadedIcon.png";
import FavoriteButton from "components/forms/singleVideo/FavoriteButton";
import LikeButton from "components/forms/singleVideo/LikeButton";
import ShareIcon from "assets/images/shareIcon.png";
import WatchVideo from "services/api/WatchVideo";
import VideoIcon from "assets/images/videoIcon.png";
import VIPModalContent from "components/VIPModalContent";
import { downloadFile, writeAsString } from "lib/expoFileSystem";
import { downloadStore } from "../../../zustand/downloadStore";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../../zustand/translationStore";
import { userStore } from "../../../zustand/userStore";
import { useQuery } from "@tanstack/react-query";

export const Header = ({
  data,
  like,
  setLike,
  isAlreadyFavorite,
  setIsAlreadyFavorite,
}) => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const translations = translationStore((state) => state.translations);
  const token = userStore((store) => store.api_token);
  const isVIP = userStore((state) => state.is_Vip);
  const { downloaded, downloading, setDownloaded, setDownloading } =
    downloadStore((state) => state);
  const { getDownloadVideo } = WatchVideo();
  const [open, setOpen] = useState(false);
  const [toDownload, setToDownload] = useState(false);

  // navigate to single tag screen
  const handleNavigate = (item) => {
    navigation.navigate("SingleTag", {
      id: route.params.id,
      postTitle: item,
      userId: route.params.userId,
    });
  };

  const { isLoading } = useQuery({
    queryKey: ["download-video-single-video"],
    queryFn: () =>
      getDownloadVideo({ data: { work_id: data._id }, token: token }),
    onSuccess: async (res: any) => {
      const fileUrl = res.url;
      const fileName = data._id + ".mp4"; // Work ID + video extension
      console.log("Downloading ...", fileUrl);
      const result = await downloadFile(fileUrl, fileName);
      if (result.status === 200) {
        // remove the video id in downloading
        const newDownloadingVideoIDS = downloading.filter(
          (item) => item !== data._id
        );

        writeAsString(data._id + ".txt", data); //write the data for the downloaded file
        setDownloading(newDownloadingVideoIDS); // add the new array of downloading that been remove the id
        setDownloaded([...downloaded, data._id]); // add the id in downloaded video
      }
      setToDownload(false);
    },
    enabled: toDownload,
  });

  const handleDownload = () => {
    if (isVIP) {
      setDownloading([...downloading, data._id]); // add the id in downloading
      setToDownload(true);
    } else {
      setOpen(true);
    }
  };

  const DownloadStatus = ({ videoID }) => {
    if (!downloaded.includes(videoID) && !downloading.includes(videoID)) {
      // if the video is not download yet
      return (
        <Pressable onPress={handleDownload}>
          <View style={styles.buttonItem} pointerEvents="box-none">
            {/* <MaterialCommunityIcons
              name="download"
              color="#999"
              size={18}
              style={styles.icon}
            /> */}
            <Image source={DownloadIcon} style={styles.icon} />
            <Text style={styles.text}>{translations.download}</Text>
          </View>
        </Pressable>
      );
    } else if (!downloaded.includes(videoID) && downloading.includes(videoID)) {
      // if the video is downloading
      return (
        <View style={styles.buttonItem} pointerEvents="box-none">
          <Image source={DownloadIcon} style={styles.icon} />
          <Text style={styles.text}>{translations.downloading}...</Text>
        </View>
      );
    } else if (downloaded.includes(videoID) && !downloading.includes(videoID)) {
      // if the video is downloaded
      return (
        <View style={styles.buttonItem} pointerEvents="box-none">
          <Image source={DownloadedIcon} style={styles.icon} />
          <Text style={styles.text}>{translations.downloaded}</Text>
        </View>
      );
    }
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
            <Image source={VideoIcon} style={styles.videoIcon} />
            {/* <MaterialCommunityIcons
              name="play-box-outline"
              color="#999"
              size={15}
              style={styles.icon}
            /> */}
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
            <Pressable key={index} onPress={() => handleNavigate(item)}>
              <Text style={styles.tag}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.buttonsContent} pointerEvents="box-none">
          <LikeButton id={route.params.id} like={like} setLike={setLike} />
          <FavoriteButton
            id={route.params.id}
            isAlreadyFavorite={isAlreadyFavorite}
            setIsAlreadyFavorite={setIsAlreadyFavorite}
          />
          <View style={styles.buttonItem}>
            <Image source={CoinIcon} style={styles.icon} />
            <Text style={styles.text}>
              {/* 22{translations.coin} */}
              {translations.donate}
            </Text>
          </View>
          <DownloadStatus videoID={data._id} />
          <Pressable onPress={() => navigation.navigate("SharingPromotion")}>
            <View style={styles.buttonItem} pointerEvents="box-none">
              <Image source={ShareIcon} style={styles.icon} />
              <Text style={styles.text}>{translations.share}</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <BannerAds />
      <CustomModal open={open} setOpen={setOpen}>
        <VIPModalContent setOpen={setOpen} />
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBAL_COLORS.primaryColor,
    paddingBottom: 5,
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
  // icon: {
  //   marginHorizontal: 3,
  //   height: 20,
  //   width: 20,
  //   resizeMode: "contain",
  // },
  icon: {
    marginHorizontal: 3,
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  videoIcon: {
    width: 12,
    height: 12,
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
    color: GLOBAL_COLORS.secondaryColor,
    paddingTop: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderColor: GLOBAL_COLORS.secondaryColor,
    borderWidth: 1,
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
