import { ScrollView, Dimensions, StyleSheet } from "react-native";

import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import { GLOBAL_COLORS } from "global";

const OfflineCache = () => {
  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <UserProfileSettingsHeader title="离线缓存" btnRight={null} />
      <NoCacheMessage />
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

export default OfflineCache;
