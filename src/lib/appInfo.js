/*
  References:
  https://stackoverflow.com/questions/46863644/expo-get-unique-device-id-without-ejecting/68553627#68553627
  https://expo.canny.io/feature-requests/p/add-react-native-device-info
*/

import * as Application from "expo-application";
import { Platform } from "expo-modules-core";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

export const getDeviceId = async () => {
  if (Platform.OS === "android") {
    return Application.androidId;
  } else {
    let deviceId = await SecureStore.getItemAsync("deviceId");

    if (!deviceId) {
      deviceId = Constants.deviceId; //or generate uuid
      await SecureStore.setItemAsync("deviceId", deviceId);
    }

    return deviceId;
  }
};

export const getCurrentVersion = () => {
  return Constants.manifest.version;
};
