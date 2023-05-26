import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loading from "components/Loading";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../zustand/translationStore";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { HStack, VStack } from "native-base";

type Props = {
  cover_photo: string;
  photo: string;
  username: string;
  biography: string;
  follower_count: number;
  isLoading: boolean;
};

const SingleUserHeader = (props: Props) => {
  const translations = translationStore((state) => state.translations);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const userID = route?.params?.userID;

  const goToFansScreen = () => {
    navigation.navigate("FollowersScreen", {
      postTitle: translations.fan,
      userID: userID,
    });
  };

  return (
    <View style={styles.headerContainer} pointerEvents="box-none">
      {props.isLoading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <ImageBackground
            source={{ uri: BASE_URL_FILE_SERVER + props?.cover_photo }}
            resizeMode="stretch"
            style={{ height: "100%" }}
          >
            <View style={styles.bannerContent} pointerEvents="box-none">
              <HStack alignItems="center" justifyContent="center">
                <Ionicons
                  name="chevron-back"
                  color="#fff"
                  size={24}
                  style={styles.backIcon}
                  onPress={() => navigation.goBack()}
                />
                <Text style={[styles.usernameText, { marginRight: "auto" }]}>
                  UP {translations.profile}
                </Text>
              </HStack>
              <HStack alignItems="center" space={3} mt="auto" mb={4}>
                <Image
                  source={{ uri: BASE_URL_FILE_SERVER + props?.photo }}
                  style={styles.profileImg}
                />
                <VStack space={1} flexShrink={1}>
                  <HStack alignItems="center" space={1.5}>
                    <Text style={styles.usernameText}>{props?.username}</Text>
                    <Text style={styles.usernameUp}>UP</Text>
                  </HStack>
                  <Text style={styles.description}>
                    {props?.biography === null
                      ? "Aut totam nihil cumque odit omnis."
                      : props?.biography}
                  </Text>
                </VStack>
              </HStack>
              <View style={styles.summaryContainer}>
                <TouchableWithoutFeedback onPress={goToFansScreen}>
                  <View style={styles.summaryContent} pointerEvents="box-none">
                    <Text style={styles.summaryNumber}>
                      {props?.follower_count}
                    </Text>
                    <Text style={styles.summaryText}>{translations.fan}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.summaryContentMiddle}>
                  <Text style={styles.summaryNumber}>2321</Text>
                  <Text style={styles.summaryText}>
                    {translations.wonPraise}
                  </Text>
                </View>
                <View style={styles.summaryContent}>
                  <Text style={styles.summaryNumber}>32</Text>
                  <Text style={styles.summaryText}>{translations.reward}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </React.Fragment>
      )}
    </View>
  );
};

export default SingleUserHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: GLOBAL_COLORS.primaryColor,
    justifyContent: "center",
    height: 225,
  },
  bannerContent: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    padding: 24,
    height: 225,
    justifyContent: "center",
  },
  backIcon: {
    marginRight: "auto",
  },
  profileImg: {
    height: 58,
    width: 58,
    borderRadius: 29,
  },
  usernameText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  usernameUp: {
    color: "#fff",
    fontSize: 10,
    backgroundColor: "#FF644A",
    paddingHorizontal: 4,
    borderRadius: 4,
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.5,
  },
  summaryContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  summaryContent: {
    width: "33%",
    alignItems: "center",
  },
  summaryContentMiddle: {
    width: "33%",
    alignItems: "center",
    borderColor: "#959AA1",
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  summaryNumber: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  summaryText: {
    color: "#8F9399",
  },
});
