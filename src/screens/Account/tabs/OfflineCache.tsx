import {
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";

import NoCacheMessage from "features/sectionList/components/NoCacheMessage";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";

const OfflineCache = () => {

  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <UserProfileSettingsHeader title='离线缓存' btnRight={null}/>
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
});

export default OfflineCache;
