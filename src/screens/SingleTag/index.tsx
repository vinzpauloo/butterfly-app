import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import SingleTagTabs from "./tabs/SingleTagTabs";
import { translationStore } from "../../zustand/translationStore";
import { GLOBAL_COLORS } from "global";
import { HStack } from "native-base";

const ProfileBanner = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const translations = translationStore((state) => state.translations);

  return (
    <View style={styles.headerContainer}>
      {/* <ImageBackground
        source={Banner10}
        resizeMode="cover"
        style={styles.bgImg}
      />
      <View style={styles.bannerContent}>
        <Ionicons
          name="chevron-back"
          color="#fff"
          size={30}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{route.params?.tag}</Text>
          <Text style={styles.description}>{translations.like}</Text>
        </View>
      </View> */}
      <Ionicons
        name="chevron-back-sharp"
        color="#fff"
        size={30}
        onPress={() => navigation.goBack()}
      />
      <HStack alignItems="center" space={3}>
        <Text style={styles.tagText}>{route.params?.tag}</Text>
        {/* onPress={handleFollow} */}
        <Pressable style={styles.followBtn}>
          <Text style={styles.followText}>+{translations.follow}</Text>
        </Pressable>
      </HStack>
    </View>
  );
};

const SingleTag = () => {
  return (
    <>
      {/* <ProfileBanner /> */}
      <SingleTagTabs />
    </>
  );
};

export default SingleTag;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 16,
    zIndex: 2,
    backgroundColor: GLOBAL_COLORS.videoContentBG,
  },
  tagText: {
    fontSize: 16,
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
  },
  followBtn: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  followText: {
    color: "#fff",
    fontSize: 14,
  },
});
