import { GLOBAL_COLORS } from "global";
import { Divider } from "native-base";
import { StyleSheet, View } from "react-native";

const DividerContainer = () => {
  return <View style={styles.divider}></View>;
};

export default DividerContainer;

const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
    marginHorizontal: 10,
    width: "auto",
  },
});
