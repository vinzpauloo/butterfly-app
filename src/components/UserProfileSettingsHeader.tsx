import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { HStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import { GLOBAL_COLORS } from "global";

const UserProfileSettingsHeader = ({ title, btnRight }) => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  return (
    <HStack
      style={
        route.name === "About"
          ? styles.titleAndBackContainer2
          : route.name === "ServiceProvisions"
          ? styles.titleAndBackContainer2
          : route.name === "PrivacyPolicy"
          ? styles.titleAndBackContainer2
          : styles.titleAndBackContainer
      }
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={3}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={24} color="white" />
      </TouchableOpacity>

      <View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View>
        {btnRight && (
          <TouchableOpacity>
            <Text style={styles.btnColor}>完成</Text>
          </TouchableOpacity>
        )}
      </View>
    </HStack>
  );
};

const styles = StyleSheet.create({
  titleAndBackContainer: {
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
  },
  titleAndBackContainer2: {
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
  title: {
    color: GLOBAL_COLORS.primaryTextColor,
    textAlign: "center",
    fontSize: 20,
  },
  btnColor: {
    color: GLOBAL_COLORS.btnColor,
  },
});

export default UserProfileSettingsHeader;
