import Moment from "./tabs/Moment";
import Projects from "./tabs/Projects";
import React, { useState } from "react";
import SingleUserHeader from "components/headers/SingleUserHeader";
import StickyTabs from "layouts/StickyTabs";
import { translationStore } from "../../zustand/translationStore";
import { Text, Pressable, StyleSheet, Image } from "react-native";
import { GLOBAL_COLORS } from "global";
import { HStack, VStack } from "native-base";
import chatInactive from "assets/images/chatInactive.png";
import coinIcon from "assets/images/coinIcon.png";
import CustomModal from "components/CustomModal";
import DonateModalContent from "components/DonateModalContent";
import VIPModalContent from "components/VIPModalContent";
import { useRoute } from "@react-navigation/native";
import CustomerService from "services/api/CustomerService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userStore } from "../../zustand/userStore";
import UserService from "services/api/UserService";

const SingleUserScreen = () => {
  const translations = translationStore((state) => state.translations);
  const token = userStore((state) => state.api_token);
  const [openVIPModal, setVIPModalOpen] = useState<boolean>(false);
  const [openDonateModal, setOpenDonateModal] = useState<boolean>(false);
  const [isCreatorFollowed, setIsCreatorFollowed] = useState<boolean | null>(null);
  const route = useRoute<any>();
  const userID = route?.params?.userID;

  // get specific content creators data
  const { getSpecificContentCreator } = UserService();
  const { data, isLoading } = useQuery({
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
  
  const tabsData = {
    Header: () =>
      <SingleUserHeader
        cover_photo={data?.cover_photo}
        photo={data?.photo}
        username={data?.username}
        biography={data?.biography}
        follower_count={data?.follower_count}
        isLoading={isLoading}
      />,
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
      <HStack style={styles.bottomBar} space={2} justifyContent='center' alignItems='center'>
        <Pressable onPress={() => setVIPModalOpen(true)} style={{marginRight: 'auto'}}>
          <VStack alignItems='center' space={0.5}>
            <Image style={styles.image} source={chatInactive}/>
            <Text style={styles.whiteText}>私信</Text>
          </VStack>
        </Pressable>
        <Pressable style={styles.donateButton} onPress={() => setOpenDonateModal(true)}>
          <HStack space={1.5}>
            <Image style={styles.image} source={coinIcon} />
            <Text style={styles.whiteText}>{translations.reward}</Text>
          </HStack>
        </Pressable>
        <Pressable
          onPress={isCreatorFollowed ? unfollowContentCreator : followContentCreator}
          style={[styles.followButton, isCreatorFollowed ? styles.unfollowBG : styles.followBG]}
        >
          <Text style={styles.whiteText}>+ {isCreatorFollowed ? translations.unfollow : translations.follow}</Text>
        </Pressable>
      </HStack>
      <CustomModal open={openVIPModal} setOpen={setVIPModalOpen}>
        <VIPModalContent setOpen={setVIPModalOpen} />
      </CustomModal>
      <CustomModal open={openDonateModal} setOpen={setOpenDonateModal}>
        <DonateModalContent setOpen={setOpenDonateModal} userID={userID} />
      </CustomModal>
    </React.Fragment>
  );
};

export default SingleUserScreen;

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    paddingLeft: 34,
    paddingRight: 16,
    paddingVertical: 12
  },
  image: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  whiteText: {
    color: 'white',
    fontWeight: 'bold'
  },
  donateButton: {
    backgroundColor: '#FF644A',
    width: 136,
    height: 28,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  followButton: {
    width: 136,
    height: 28,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto'
  },
  followBG: {
    backgroundColor: GLOBAL_COLORS.secondaryColor
  },
  unfollowBG:{
    backgroundColor: GLOBAL_COLORS.inactiveTextColor
  }
})