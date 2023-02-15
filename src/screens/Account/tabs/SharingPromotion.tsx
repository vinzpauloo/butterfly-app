import {
  ScrollView,
  Text,
  Dimensions,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FlatList, HStack, VStack } from "native-base";

import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import ImageTitle from "assets/images/profilePhoto.jpg";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import { GLOBAL_COLORS } from "global";
import { sharingPromotionData } from "data/sharingPromotionData";

const QRCode = () => {
  return (
    <VStack
      justifyContent={"center"}
      alignItems={"center"}
      space={3}
      p={5}
      mx={5}
      mt={1}
      bg={GLOBAL_COLORS.primaryTextColor}
    >
      <HStack>
        <Image style={styles.qrCodeTitleImage} source={ImageTitle} />
        <Text style={styles.qrCodeTitle}>
          网黄UP主的性爱博客{"\n"}
          分享你我的性福生活
        </Text>
      </HStack>

      <Image style={styles.qrCodeImage} source={ImageTitle} />

      <View>
        <Text style={styles.qrCodeDetails}>分享好友立赠糖心专享会员</Text>
        <Text style={styles.qrCodeDetails}>
          邀请码:&nbsp;
          <Text style={styles.qrCodeDetails2}>CDWQMC</Text>
        </Text>
      </View>

      <HStack space={4}>
        <TouchableOpacity style={styles.qrCodeBtn}>
          <Text>保存图片</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.qrCodeBtn}>
          <Text>复制链接</Text>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};

const Rewards = () => {
  return (
    <HStack justifyContent={"center"} alignItems={"center"} space={10} p={5}>
      <VStack alignItems={"center"} space={2}>
        <Text style={styles.rewardsText}>推广成功1人</Text>
        <SimpleLineIcons name="diamond" size={34} color="#FAC690" />
        <Text style={styles.rewardsText}>1天VIP</Text>
        <Text style={styles.rewardsText}>推广成功1人</Text>
      </VStack>

      <VStack alignItems={"center"} space={2}>
        <Text style={styles.rewardsText}>推广成功3人</Text>
        <SimpleLineIcons name="diamond" size={34} color="#FAC690" />
        <Text style={styles.rewardsText}>3天VIP</Text>
        <Text style={styles.rewardsText}>推广成功3人</Text>
      </VStack>

      <VStack alignItems={"center"} space={1.5}>
        <Text style={styles.rewardsText}>推广成功10人</Text>
        <HStack alignItems={"center"}>
          <SimpleLineIcons name="diamond" size={18} color="#FAC690" />
          <Text style={styles.rewardsText}> + </Text>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={24}
            color="#FAC690"
          />
        </HStack>
        <VStack alignItems={"center"}>
          <Text style={styles.rewardsText}>10天VIP+5元</Text>
          <Text style={styles.rewardsText}>观影券</Text>
        </VStack>
        <Text style={styles.rewardsText}>推广成功10人</Text>
      </VStack>
    </HStack>
  );
};

const OtherDetails = () => {
  return (
    <FlatList
      data={sharingPromotionData}
      renderItem={({ item }) => (
        <VStack p={3.5} mx={1}>
          <View>
            <Text style={styles.rewardsText}>{item.rewards}</Text>
            <Text style={styles.otherDetailsText}>{item.details}</Text>
          </View>
        </VStack>
      )}
    />
  );
};

const SharingPromotion = () => {
  return (
    <ScrollView style={styles.container}>
      <UserProfileSettingsHeader title="分享推广" btnRight={null} />
      <QRCode />
      <Rewards />
      <OtherDetails />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
  },
  qrCodeTitleImage: {
    width: 35,
    height: 35,
  },
  qrCodeTitle: {
    color: "grey",
  },
  qrCodeImage: {
    width: 200,
    height: 200,
  },
  qrCodeDetails: {
    color: "grey",
    textAlign: "justify",
  },
  qrCodeDetails2: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
  },
  qrCodeBtn: {
    backgroundColor: "#FAC690",
    height: 30,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  rewardsText: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  otherDetailsText: {
    color: "grey",
    marginTop: 10,
  },
});

export default SharingPromotion;
