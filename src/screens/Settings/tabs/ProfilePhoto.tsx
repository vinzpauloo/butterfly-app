import React, { useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import mainPhoto from "assets/images/profilePhoto.jpg";
import { modelListData } from "data/modelListData";
import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";

const ProfilePhoto = () => {

  const [mainImage, setMainImage] = useState(mainPhoto);

  //Changes Main Profile Photo placeholder on hover
  const tempMainImage = (newImage) => {
    setMainImage(newImage);
  };

  return (
    <ScrollView style={styles.container}>
      {/*Title and Back Button  */}
      <UserProfileSettingsHeader title='修改头像' btnRight/>

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
  mainPhotoContainer: {
    alignItems: "center",
    marginVertical: 20
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
