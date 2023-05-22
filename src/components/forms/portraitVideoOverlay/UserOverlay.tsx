import React, { useState } from "react";
import { Pressable, StyleSheet, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { userStore } from "../../../zustand/userStore";

import CustomerService from "services/api/CustomerService";
import Feather from "react-native-vector-icons/Feather";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { GLOBAL_COLORS } from "global";
import { Spinner } from "native-base";

type Props = {
  customerID: string;
  userID: number;
  userImage: string;
  isFollowed: boolean;
  setIsFollowed: (boolean) => void;
};

const UserOverlay = (props: Props) => {
  const navigation = useNavigation<any>();
  // const [isCreatorFollowed, setIsCreatorFollowed] = useState(props.isFollowed)
  const token = userStore((state) => state.api_token);

  const { followCreator, unfollowCreator } = CustomerService();
  const { mutate: mutateFollowCreator, isLoading: isFollowCreatorLoading } =
    useMutation(followCreator, {
      onSuccess: (data) => {
        if (data?.isFollowed) props.setIsFollowed(true);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const { mutate: mutateUnfollowCreator, isLoading: isUnfollowCreatorLoading } =
    useMutation(unfollowCreator, {
      onSuccess: (data) => {
        if (data?.isUnfollowed) props.setIsFollowed(false);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  function followVideoCreator() {
    mutateFollowCreator({
      user_id: { user_id: props.userID },
      token: token,
    });
  }

  function unfollowVideoCreator() {
    mutateUnfollowCreator({
      user_id: { user_id: props.userID },
      token: token,
    });
  }

  return (
    <View style={styles.verticalBarItem}>
      <Pressable
        onPress={() => {
          navigation.navigate("SingleUser", {
            userID: props.userID,
            setIsFollowed: props.setIsFollowed, // this will pass to the user screen to update the vlog screen when click the followed and unfollowed in user profile
          });
        }}
      >
        <Image
          style={styles.userLogo}
          source={{ uri: BASE_URL_FILE_SERVER + props.userImage }}
        />
      </Pressable>
      <Pressable
        style={styles.followButton}
        onPress={props.isFollowed ? unfollowVideoCreator : followVideoCreator}
        disabled={isFollowCreatorLoading || isUnfollowCreatorLoading}
      >
        {isFollowCreatorLoading || isUnfollowCreatorLoading ? (
          <Spinner
            size="sm"
            style={styles.icon}
            color={GLOBAL_COLORS.primaryTextColor}
          />
        ) : (
          <Feather
            name={props.isFollowed ? "check" : "plus"}
            color={"white"}
            size={26}
          />
        )}
      </Pressable>
    </View>
  );
};

export default UserOverlay;

const styles = StyleSheet.create({
  verticalBarItem: {
    width: "100%",
    alignItems: "center",
  },
  userLogo: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 3,
    borderColor: "white",
  },
  followButton: {
    position: "relative",
    bottom: 12,
    backgroundColor: GLOBAL_COLORS.errorColor,
    borderRadius: 13,
  },
  icon: {
    height: 27,
    width: 27,
    resizeMode: "contain",
  },
});
