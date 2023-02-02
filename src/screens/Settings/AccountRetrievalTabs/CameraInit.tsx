import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, FontAwesome, Fontisto } from "@expo/vector-icons";


const CameraInit = () => {
  const navigate = useNavigation<any>();

  // Camera
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);

  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture() {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      console.log(photo);
    }
  }

  async function pickImageFromGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/*Camera*/}
      <View>
        <Camera
          style={styles.cameraContainer}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.camera}></View>

          <TouchableOpacity
            onPress={() => navigate.navigate("AccountRetrieval")}
            style={styles.closeBtn}
          >
            <Fontisto name="close-a" size={24} color="white" />
          </TouchableOpacity>
        </Camera>

        <View style={styles.galleryContainer}>
          <TouchableOpacity onPress={pickImageFromGallery}>
            <FontAwesome name="photo" size={44} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              takePicture();
            }}
          >
            <MaterialIcons name="motion-photos-on" size={84} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleCameraType}>
            <MaterialIcons name="flip-camera-android" size={54} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: Dimensions.get("window").height,
    maxWidth: Dimensions.get("window").width,
    backgroundColor: "#191d26",
  },
  cameraContainer: {
    height: 500,
  },
  camera: {
    backgroundColor: "transparent",
  },
  closeBtn: {
    position: "absolute",
    right: 25,
    top: 20,
  },
  galleryContainer: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default CameraInit;
