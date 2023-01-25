import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import Zocial from "react-native-vector-icons/Zocial";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";

import frog from "../../../../images/frog.jpg";
import { globalStyle } from "globalStyles";

const { width, height } = Dimensions.get("window");

const index = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const setOrientation = () => {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.videoContent}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          onFullscreenUpdate={setOrientation}
        />
      </View>
      <View>
        <Text style={styles.title}>
          Components in the header need to interact with the screen component
        </Text>
        <View style={styles.watchContent}>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name="play-box-outline"
              color="#999"
              size={15}
              style={styles.icon}
            />
            <Text style={styles.text}>56554 | Duration: 45:12</Text>
          </View>
          <View style={styles.item}>
            <AntDesign
              name="exclamationcircleo"
              color="#999"
              size={13}
              style={styles.icon}
            />
            <Text style={styles.text}>56554 | Duration: 45:12</Text>
          </View>
        </View>
        <View style={styles.tags}>
          <Text style={styles.tag}>Cosplay</Text>
          <Text style={styles.tag}>Nana</Text>
          <Text style={styles.tag}>Hentai</Text>
        </View>
        <View style={styles.buttonsContent}>
          <View style={styles.buttonItem}>
            <AntDesign
              name="heart"
              color="#999"
              size={15}
              style={styles.icon}
            />
            <Text style={styles.text}>314738</Text>
          </View>
          <View style={styles.buttonItem}>
            <MaterialIcons
              name="star"
              color="#999"
              size={18}
              style={styles.icon}
            />
            <Text style={styles.text}>Star</Text>
          </View>
          <View style={[styles.buttonItem, { flexDirection: "column" }]}>
            <Zocial
              name="bitcoin"
              color="#ff9900"
              size={18}
              style={styles.icon}
            />
            <Text style={[styles.text, { marginVertical: 3 }]}>29 Star</Text>
          </View>
          <View style={styles.buttonItem}>
            <MaterialCommunityIcons
              name="download"
              color="#999"
              size={18}
              style={styles.icon}
            />
            <Text style={styles.text}>Download</Text>
          </View>
          <View style={styles.buttonItem}>
            <Fontisto
              name="share-a"
              color="#999"
              size={15}
              style={styles.icon}
            />
            <Text style={styles.text}>Share</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.primaryColor,
  },
  videoContent: {
    height: 200,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  watchContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#999",
    fontSize: 12,
  },
  icon: {
    marginHorizontal: 3,
  },
  tags: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  tag: {
    fontSize: 12,
    color: "#999",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderColor: "#999",
    borderWidth: 2,
    borderRadius: 20,
    textAlign: "center",
    marginHorizontal: 3,
    marginVertical: 5,
  },
  buttonsContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  buttonItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  video: {
    alignSelf: "center",
    width: width,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
