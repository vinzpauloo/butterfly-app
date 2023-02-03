import {
  ScrollView,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import { appListData } from "data/appListData";

const BestApps = () => {
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
          <Text style={styles.title}>应用中心</Text>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <View style={styles.alibabaContainer}>
          <Text style={styles.alibaba}>啊里啪啪出品</Text>
        </View>

        <View style={styles.hottestContainer}>
          <Text style={styles.hottestTitle}>热门应用</Text>
        </View>

        {appListData?.map((item, index) => (
          <View style={styles.appContainer} key={index}>
            <View style={styles.appDetails}>
              <View>
                <Image source={item.source} style={styles.appImage} />
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>{item.title}</Text>
                <Text style={styles.details}>{item.downloads}</Text>
                <Text style={styles.details}>{item.details}</Text>
              </View>
            </View>

            <TouchableOpacity>
              <View style={styles.btnContainer}>
                <Text style={styles.downloadBtn}>前往下载</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
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
  innerContainer: {
    padding: 10,
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
  alibabaContainer: {
    backgroundColor: "transparent",
    height: 150,
  },
  alibaba: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  hottestContainer: {
    marginVertical: 20,
  },
  hottestTitle: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  appContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  appDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  appImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  detailsContainer: {
    marginLeft: 10,
  },
  detailsTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "400",
  },
  details: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  btnContainer: {
    marginRight: 10,
    backgroundColor: "#FF474E",
    height: 40,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  downloadBtn: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
});

export default BestApps;
