import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";

import CustomModal from "components/CustomModal";
import CustomerService from "services/api/CustomerService";
import DonateModalContent from "components/DonateModalContent";
import Loading from "components/Loading";
import UserService from "services/api/UserService";
import VIPModalContent from "components/VIPModalContent";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";
import { userStore } from "../../zustand/userStore";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

type Props = {};

const SingleUserHeader = (props: Props) => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const userID = route?.params?.userID;
  const [openVIPModal, setVIPModalOpen] = useState(false);
  const [openDonateModal, setOpenDonateModal] = useState(false);

  const [isCreatorFollowed, setIsCreatorFollowed] = useState(null);
  const token = userStore((state) => state.api_token);

  // get specific content creators data
  const { getSpecificContentCreator } = UserService();
  const { data: creatorData, isLoading } = useQuery({
    queryKey: ["specificContentCreatorData", userID],
    queryFn: () =>
      getSpecificContentCreator({
        data: { user_id: userID },
        token: token,
      }),
    onSuccess: (data) => {
      setIsCreatorFollowed(data?.is_followed);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { followCreator, unfollowCreator } = CustomerService();
  // follow content creator
  const { mutate: mutateFollowCreator } = useMutation(followCreator, {
    onSuccess: (data) => {
      if (data?.isFollowed) {
        setIsCreatorFollowed(true);
        route.params.setIsFollowed(true); // this is use to update the vlog screen status when followed the model
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // unfollow content creator
  const { mutate: mutateUnfollowCreator } = useMutation(unfollowCreator, {
    onSuccess: (data) => {
      if (data?.isUnfollowed) {
        setIsCreatorFollowed(false);
        route.params.setIsFollowed(false); // this is use to update the vlog screen status when unfollowed the model
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const goToFansScreen = () => {
    navigation.navigate("FollowersScreen", {
      postTitle: "粉丝",
      userID: userID,
    });
  };

  const followContentCreator = () => {
    mutateFollowCreator({
      user_id: { user_id: userID },
      token: token,
    });
  };

  const unfollowContentCreator = () => {
    mutateUnfollowCreator({
      user_id: { user_id: userID },
      token: token,
    });
  };

  return (
    <View style={styles.headerContainer} pointerEvents="box-none">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ImageBackground
            source={{ uri: BASE_URL_FILE_SERVER + creatorData?.cover_photo }}
            resizeMode="cover"
          >
            <View style={styles.bannerContent} pointerEvents="box-none">
              <Ionicons
                name="chevron-back"
                color="#fff"
                size={30}
                style={styles.backIcon}
                onPress={() => navigation.goBack()}
              />
              <Ionicons
                name="md-chatbox-ellipses-outline"
                color="#fff"
                size={35}
                style={styles.messageIcon}
                onPress={() => setVIPModalOpen(true)}
              />
              <Image
                source={{ uri: BASE_URL_FILE_SERVER + creatorData?.photo }}
                style={styles.profileImg}
              />
              <View style={styles.usernameContainer} pointerEvents="box-none">
                <View style={styles.usernameContent}>
                  <Text style={styles.usernameText}>
                    {creatorData?.username}
                  </Text>
                  <Text style={styles.usernameUp}>UP</Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={
                    isCreatorFollowed
                      ? unfollowContentCreator
                      : followContentCreator
                  }
                >
                  {isCreatorFollowed === null ? (
                    <></>
                  ) : (
                    <View
                      style={
                        isCreatorFollowed
                          ? styles.unfollowBtn
                          : styles.followBtn
                      }
                      pointerEvents="box-none"
                    >
                      <Text style={styles.followText}>
                        {isCreatorFollowed
                          ? translations.unfollow
                          : translations.follow}
                      </Text>
                    </View>
                  )}
                </TouchableWithoutFeedback>
              </View>
              <Text style={styles.description}>{creatorData?.biography}</Text>
              <View style={styles.summaryContainer}>
                <TouchableWithoutFeedback onPress={goToFansScreen}>
                  <View
                    style={styles.summaryContentMiddle}
                    pointerEvents="box-none"
                  >
                    <Text style={styles.summaryNumber}>
                      {creatorData?.follower_count}
                    </Text>
                    <Text style={styles.summaryText}>{translations.fan}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.summaryContent}>
                  <Text style={styles.summaryNumber}>TBD</Text>
                  <Text style={styles.summaryText}>
                    {translations.wonPraise}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.donatorContainer} pointerEvents="box-none">
            <View style={styles.profilesImagesContent}>
              {creatorData?.donator_list?.map((item, index) => (
                <Image
                  source={{ uri: BASE_URL_FILE_SERVER + item?.photo }}
                  style={[
                    styles.profileImgs,
                    { zIndex: index, left: index * 20 },
                  ]}
                />
              ))}
            </View>
            <View style={styles.buttons} pointerEvents="box-none">
              <Text style={styles.donateText}>
                {creatorData?.donator_count} {translations.people}
              </Text>
              <TouchableWithoutFeedback
                onPress={() => setOpenDonateModal(true)}
              >
                <View style={styles.donateBtn} pointerEvents="box-none">
                  <Text style={styles.donateText}>{translations.reward}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <CustomModal open={openVIPModal} setOpen={setVIPModalOpen}>
            <VIPModalContent setOpen={setVIPModalOpen} />
          </CustomModal>
          <CustomModal open={openDonateModal} setOpen={setOpenDonateModal}>
            <DonateModalContent setOpen={setOpenDonateModal} />
          </CustomModal>
        </>
      )}
    </View>
  );
};

export default SingleUserHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: GLOBAL_COLORS.primaryColor,
    height: 290,
    justifyContent: "center",
  },
  bannerContent: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  backIcon: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  messageIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    transform: [{ scaleX: -1 }],
  },
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: GLOBAL_COLORS.secondaryColor,
  },
  usernameContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  usernameContent: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  usernameText: {
    color: "#fff",
    fontSize: 16,
  },
  usernameUp: {
    color: "#fff",
    fontSize: 10,
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingHorizontal: 4,
    borderRadius: 3,
    fontWeight: "bold",
    top: -6,
    left: 2,
  },
  followBtn: {
    paddingHorizontal: 16,
    paddingVertical: 2,
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 12,
  },
  unfollowBtn: {
    paddingHorizontal: 16,
    paddingVertical: 2,
    backgroundColor: GLOBAL_COLORS.inactiveTextColor,
    borderRadius: 12,
  },
  followText: {
    color: "#fff",
    fontSize: 14,
  },
  description: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  summaryContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  summaryContent: {
    width: "33%",
    alignItems: "center",
  },
  summaryContentMiddle: {
    width: "33%",
    alignItems: "center",
    borderRightColor: "#bbb",
    borderRightWidth: 1,
  },
  summaryNumber: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  summaryText: {
    color: "#bbb",
  },
  donatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#262632",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  profilesImagesContent: {
    position: "relative",
    height: 40,
  },
  profileImgs: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
  },
  donateBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 4,
    marginLeft: 10,
  },
  donateText: {
    color: "#fff",
  },
});
