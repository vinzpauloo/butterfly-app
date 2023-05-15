import Moment from "./tabs/Moment";
import Projects from "./tabs/Projects";
import React, { useState } from "react";
import SingleUserHeader from "components/headers/SingleUserHeader";
import StickyTabs from "layouts/StickyTabs";
import { translationStore } from "../../zustand/translationStore";
import { Text, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import { HStack, VStack } from "native-base";
import chatInactive from "assets/images/chatInactive.png";
import coinIcon from "assets/images/coinIcon.png";
import CustomModal from "components/CustomModal";
import DonateModalContent from "components/DonateModalContent";
import VIPModalContent from "components/VIPModalContent";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomerService from "services/api/CustomerService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userStore } from "../../zustand/userStore";
import UserService from "services/api/UserService";

const { width } = Dimensions.get("window");

const SingleUserScreen = () => {
  // ** GLOBAL STORE
  const translations = translationStore((state) => state.translations);
  const { api_token, is_Vip } = userStore((store) => store);

  // ** STATES
  const [openVIPModal, setVIPModalOpen] = useState<boolean>(false);
  const [openDonateModal, setOpenDonateModal] = useState<boolean>(false);
  const [isCreatorFollowed, setIsCreatorFollowed] = useState<boolean | null>(
    null
  );

  // ** HOOKS
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const userID = route?.params?.userID;

  // ** API
  // get specific content creators data
  const { getSpecificContentCreator } = UserService();
  const { data, isFetching } = useQuery({
    queryKey: ["specificContentCreatorData", userID],
    queryFn: () =>
      getSpecificContentCreator({
        data: { user_id: userID },
        token: api_token,
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

  // ** EVENTS
  const followContentCreator = () => {
    mutateFollowCreator({
      user_id: { user_id: userID },
      token: api_token,
    });
  };

  const unfollowContentCreator = () => {
    mutateUnfollowCreator({
      user_id: { user_id: userID },
      token: api_token,
    });
  };

  const handleChatPress = () => {
    if (is_Vip) {
      navigation.navigate("SingleChatScreen", {
        postTitle: "CC ID: " + userID,
      });
    } else {
      setVIPModalOpen(true);
    }
  };

  const tabsData = {
    Header: () => (
      <SingleUserHeader
        cover_photo={data?.cover_photo}
        photo={data?.photo}
        username={data?.username}
        biography={data?.biography}
        follower_count={data?.follower_count}
        isLoading={isFetching}
      />
    ),
    tabItems: [
      {
        name: "moment",
        label: translations.moment,
        Content: <Moment />,
      },
      {
        name: "projects",
        label: translations.work,
        Content: <Projects />,
      },
    ],
  };

  return (
    <React.Fragment>
      <StickyTabs data={tabsData} />
      {!isFetching && (
        <React.Fragment>
          <HStack
            style={styles.bottomBar}
            space={2}
            justifyContent="center"
            alignItems="center"
          >
            <Pressable
              onPress={handleChatPress}
              style={{ marginRight: "auto" }}
            >
              <VStack alignItems="center" space={0.5}>
                <Image style={styles.image} source={chatInactive} />
                <Text style={styles.whiteText}>{translations.chat}</Text>
              </VStack>
            </Pressable>
            <Pressable
              style={[styles.donateButton, styles.button]}
              onPress={() => setOpenDonateModal(true)}
            >
              <HStack space={1.5}>
                <Image style={styles.image} source={coinIcon} />
                <Text style={styles.whiteText}>{translations.reward}</Text>
              </HStack>
            </Pressable>
            <Pressable
              onPress={
                isCreatorFollowed
                  ? unfollowContentCreator
                  : followContentCreator
              }
              style={[
                styles.button,
                isCreatorFollowed ? styles.unfollowBG : styles.followBG,
              ]}
            >
              <Text style={styles.whiteText}>
                {isCreatorFollowed ? "-" : "+"}{" "}
                {isCreatorFollowed
                  ? translations.unfollow
                  : translations.follow}
              </Text>
            </Pressable>
          </HStack>
          <CustomModal open={openVIPModal} setOpen={setVIPModalOpen}>
            <VIPModalContent setOpen={setVIPModalOpen} />
          </CustomModal>
          <CustomModal open={openDonateModal} setOpen={setOpenDonateModal}>
            <DonateModalContent setOpen={setOpenDonateModal} userID={userID} />
          </CustomModal>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SingleUserScreen;

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    paddingLeft: 34,
    paddingRight: 16,
    paddingVertical: 12,
  },
  image: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  whiteText: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    width: width < GLOBAL_SCREEN_SIZE.mobile ? 100 : 136,
    height: 28,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  donateButton: {
    backgroundColor: "#FF644A",
  },
  followBG: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
  },
  unfollowBG: {
    backgroundColor: GLOBAL_COLORS.inactiveTextColor,
  },
});
