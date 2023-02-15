import { ScrollView, Dimensions, StyleSheet, Text } from "react-native";

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import { GLOBAL_COLORS } from "global";

const RecordingHistory = () => {
  return (
    <ScrollView style={styles.container}>
      <UserProfileSettingsHeader title="历史记录" btnRight={null} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: GLOBAL_COLORS.primaryColor,
  },
});

export default RecordingHistory;
