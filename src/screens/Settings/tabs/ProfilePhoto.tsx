import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import mainPhoto from "assets/images/profilePhoto.jpg";
import { modelListData } from "data/modelListData";

const ProfilePhoto = () => {
  const navigation = useNavigation<any>();

  const [tempImage, setTempImage] = useState(mainPhoto);
  const [mainImage, setMainImage] = useState(mainPhoto);

  //Changes Main Profile Photo placeholder on hover
  const tempMainImage = (newImage) => {
    setMainImage(newImage);
  };

  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <View style={styles.titleAndBackBtn}>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.textDesign}>修改头像</Text>
        </View>
        <TouchableOpacity style={styles.acceptBtn}>
          <Text style={styles.acceptBtnColor}>完成</Text>
        </TouchableOpacity>
      </View>

      {/*Main Profile Photo*/}
      <View style={styles.mainPhotoContainer}>
        <Image source={mainImage} style={styles.mainPhoto} />
      </View>

      {/*Model List*/}
      <View style={styles.modelContainer}>
        {modelListData?.map((model, index) => (
          <TouchableOpacity onPress={() => tempMainImage(model.model)}>
            <Image source={model.model} style={styles.modelPhotos} />
          </TouchableOpacity>
        ))}
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
  titleAndBackBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    backgroundColor: "#262632",
    height: 50,
  },
  btnContainer: {
    position: "absolute",
    left: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textDesign: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
  acceptBtn: {
    position: "absolute",
    right: 23,
  },
  acceptBtnColor: {
    color: "#FF474E",
  },
  mainPhotoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  mainPhoto: {
    flex: 1,
    width: 360,
    height: 360,
    borderRadius: 200,
  },
  modelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  modelPhotos: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
});

export default ProfilePhoto;
