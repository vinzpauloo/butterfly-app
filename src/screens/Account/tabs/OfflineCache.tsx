import {
  ScrollView,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ImageCache from "../../../assets/images/cacheImage.jpg";
import NoCacheMessage from "features/sectionList/components/NoCacheMessage";

const OfflineCache = () => {
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
          <Text style={styles.title}>离线缓存</Text>
        </View>
      </View>
      <NoCacheMessage/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    marginVertical: 0,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: "#191d26",
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
  noCacheContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  cacheImage: {
    width: 200,
    height: 200,
  },
  cacheText: {
    color: "white",
    fontSize: 14,
    marginTop: 20,
  },
});

export default OfflineCache;
