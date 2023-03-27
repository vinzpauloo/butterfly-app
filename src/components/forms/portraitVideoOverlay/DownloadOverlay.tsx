import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useQuery } from "@tanstack/react-query";

import CustomModal from "components/CustomModal";
import VIPModalContent from "components/VIPModalContent";
import WatchVideo from "services/api/WatchVideo";
import { downloadFile } from "utils/downloadFile";
import { readFileDirectory } from "lib/expoFileSystem";
import { userStore } from "../../../zustand/userStore";

type Props = { videoID: string };

const DownloadOverlay: React.FC<Props> = ({ videoID }) => {
  const token = userStore((store) => store.api_token);
  const isVIP = userStore((state) => state.is_Vip);
  const { getDownloadVideo } = WatchVideo();
  const [open, setOpen] = useState(false);
  const [toDownload, setToDownload] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ["download-video-vlog"],
    queryFn: () =>
      getDownloadVideo({ data: { work_id: videoID }, token: token }),
    onSuccess: (data: any) => {
      const fileUrl = data.url;
      // const fileUrl = "http://techslides.com/demos/sample-videos/small.mp4"; // Temporary file for testing
      const fileName = videoID + ".mp4"; // Work ID + video extension
      console.log("Downloading ...", fileUrl);
      downloadFile(fileUrl, fileName);
      setToDownload(false);
    },
    enabled: toDownload,
  });

  const handleDownload = () => {
    if (isVIP) {
      setToDownload(true);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    readFileDirectory();
  }, []);

  return (
    <>
      <View style={styles.verticalBarItem}>
        <Pressable onPress={handleDownload}>
          <MaterialCommunityIcons name="download" color={"white"} size={40} />
        </Pressable>
        <Text style={styles.iconText}>DL</Text>
      </View>
      <CustomModal open={open} setOpen={setOpen}>
        <VIPModalContent setOpen={setOpen} />
      </CustomModal>
    </>
  );
};

export default DownloadOverlay;

const styles = StyleSheet.create({
  verticalBarItem: {
    width: "100%",
    alignItems: "center",
  },
  iconText: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
});
