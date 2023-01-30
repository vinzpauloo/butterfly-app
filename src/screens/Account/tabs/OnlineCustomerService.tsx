import {
  ScrollView,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OnlineCustomerService = () => {
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
          <Text style={styles.title}>在线客服</Text>
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
});

export default OnlineCustomerService;
