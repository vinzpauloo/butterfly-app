import {
  ScrollView,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import {
  AntDesign,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SharingPromotion = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <View style={styles.titleAndBackContainer}>
        <View style={styles.backBtn}>
          <TouchableOpacity onPress={() => navigation.navigate("Account")}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>分享推广</Text>
        </View>
      </View>

      {/* QRCODE */}
      <View style={styles.qrCodeContainer}>
        <View style={styles.qrCodeTitleContainer}>
          <Image
            style={styles.qrCodeTitleImage}
            source={require("../../../assets/images/profilePhoto.jpg")}
          />
          <Text style={styles.qrCodeTitle}>
            网黄UP主的性爱博客{"\n"}
            分享你我的性福生活
          </Text>
        </View>

        <View style={styles.qrCodeImageContainer}>
          <Image
            style={styles.qrCodeImage}
            source={require("../../../assets/images/qrcode.png")}
          />

          <View>
            <Text style={styles.qrCodeDetails}>分享好友立赠糖心专享会员</Text>
            <Text style={styles.qrCodeDetails}>
              邀请码:&nbsp;
              <Text style={styles.qrCodeDetails2}>CDWQMC</Text>
            </Text>
          </View>
        </View>

        <View style={styles.qrCodeBtnContainer}>
          <View style={styles.qrCodeBtn}>
            <Text>保存图片</Text>
          </View>
          <View style={styles.qrCodeBtn}>
            <Text>复制链接</Text>
          </View>
        </View>
      </View>

      {/* Rewards */}
      <View style={styles.rewardsContainer}>
        <View style={styles.rewardsInnerContainer}>
          <Text style={styles.rewardsText}>推广成功1人</Text>
          <View style={styles.rewardsInnerContainer2}>
            <SimpleLineIcons name="diamond" size={34} color="#FAC690" />
            <Text style={styles.rewardsText}>1天VIP</Text>
          </View>
          <Text style={styles.rewardsText}>推广成功1人</Text>
        </View>

        <View style={styles.rewardsInnerContainer}>
          <Text style={styles.rewardsText}>推广成功3人</Text>
          <View style={styles.rewardsInnerContainer2}>
            <SimpleLineIcons name="diamond" size={34} color="#FAC690" />
            <Text style={styles.rewardsText}>3天VIP</Text>
          </View>
          <Text style={styles.rewardsText}>推广成功3人</Text>
        </View>

        <View style={styles.rewardsInnerContainer}>
          <Text style={styles.rewardsText}>推广成功10人</Text>
          <View style={styles.rewardsThirdColumn}>
            <View style={styles.rewardsThirdIconsContainer}>
              <SimpleLineIcons name="diamond" size={24} color="#FAC690" />
              <Text style={styles.rewardsText}> + </Text>
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={24}
                color="#FAC690"
              />
            </View>
            <Text style={styles.rewardsText}>10天VIP+5元</Text>
            <Text style={styles.rewardsText}>观影券</Text>
          </View>
          <Text style={styles.rewardsText}>推广成功10人</Text>
        </View>
      </View>

      {/* Other Details */}
      <View style={styles.otherDetailsContainer}>
        <View>
          <Text style={styles.rewardsText}>推广说明 :</Text>
          <Text style={styles.otherDetailsText}>
            好友通过您的二维码或推广链接下载APP,并启动后 即算推广成功。
          </Text>
        </View>

        <View style={styles.otherDetailsMargin}>
          <Text style={styles.rewardsText}>操作说明 :</Text>
          <Text style={styles.otherDetailsText}>
            点击各视频世界分享按钮,保存二维码及推广链接
            后,立即分享到微博、朋友圈,论坛分类。
          </Text>
        </View>

        <View>
          <Text style={styles.rewardsText}>注意事项 :</Text>
          <Text style={styles.otherDetailsText}>
            观影优惠仅用于抵扣任意金币视频。
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    marginVertical: 0,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: "#262632",
  },
  titleAndBackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    backgroundColor: "#262632",
    height: 50,
  },
  backBtn: {
    position: "absolute",
    left: 5,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  qrCodeContainer: {
    backgroundColor: "#FFFFFF",
    height: 400,
    marginHorizontal: 20,
    borderRadius: 7,
    marginTop: 20,
  },
  qrCodeTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  qrCodeTitleImage: {
    width: 35,
    height: 35,
  },
  qrCodeTitle: {
    color: "grey",
  },
  qrCodeImageContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  qrCodeBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginTop: 30,
  },
  qrCodeBtn: {
    backgroundColor: "#FAC690",
    height: 30,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  rewardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 40,
    marginVertical: 40,
  },
  rewardsInnerContainer: {
    alignItems: "center",
  },
  rewardsText: {
    color: "#FFFFFF",
  },
  rewardsInnerContainer2: {
    marginVertical: 15,
    alignItems: "center",
  },
  rewardsThirdColumn: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  rewardsThirdIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  otherDetailsContainer: {
    marginHorizontal: 40,
    marginBottom: 30,
  },
  otherDetailsText: {
    color: "grey",
    marginTop: 10,
  },
  otherDetailsMargin: {
    marginVertical: 40,
  },
});

export default SharingPromotion;
