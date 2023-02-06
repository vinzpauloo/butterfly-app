import {
  ScrollView,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import {FlatList, HStack, VStack} from "native-base";

import { appListData } from "data/appListData";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {globalStyle} from "globalStyles";

const BestApps = () => {

  return (
    <ScrollView style={styles.container}>
      <UserProfileSettingsHeader title='应用中心' btnRight={null}/>

      <View style={styles.innerContainer}>
        <View style={styles.alibabaContainer}>
          <Text style={styles.alibaba}>啊里啪啪出品</Text>
        </View>

        <View style={styles.hottestContainer}>
          <Text style={styles.hottestTitle}>热门应用</Text>
        </View>

        <FlatList data={appListData} renderItem={({item}) =>
            <VStack mb={4}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <HStack>
                  <Image source={item.source} style={styles.appImage}/>
                  <VStack>
                    <Text style={styles.detailsTitle}>{item.title}</Text>
                    <Text style={styles.details}>{item.downloads}</Text>
                    <Text style={styles.details}>{item.details}</Text>
                  </VStack>
                </HStack>
                <TouchableOpacity style={styles.btnContainer}>
                  <Text style={styles.downloadBtn}>前往下载</Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
        }/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: globalStyle.headerBasicBg,
  },
  innerContainer: {
    padding: 10,
  },
  alibabaContainer: {
    backgroundColor: "transparent",
    height: 150,
  },
  alibaba: {
    color: globalStyle.primaryTextColor,
    fontWeight: "600",
  },
  hottestContainer: {
    marginVertical: 20,
  },
  hottestTitle: {
    color: globalStyle.primaryTextColor,
    fontWeight: "600",
  },
  appImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10
  },
  detailsTitle: {
    color: globalStyle.primaryTextColor,
    fontSize: 14,
    fontWeight: "400",
  },
  details: {
    color: globalStyle.primaryTextColor,
    fontSize: 12,
  },
  btnContainer: {
    backgroundColor: "#FF474E",
    height: 40,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  downloadBtn: {
    color: globalStyle.primaryTextColor,
    fontWeight: "900",
  },
});

export default BestApps;
