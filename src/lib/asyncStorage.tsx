import AsyncStorage from "@react-native-async-storage/async-storage";
import { captureSuccess, captureError } from "services/sentry";

export const storeDataString = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data);
    captureSuccess(`storeDataString`, `key: ${key} | data: ${data}`);
  } catch (e) {
    // Error handling
    console.log("storeDataString Error", e);
    captureError(e, `storeDataString`, `key: ${key} | data: ${data}`);
  }
};

export const storeDataObject = async (key: string, data: Object) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
    captureSuccess(`storeDataObject`, `key: ${key} | jsonData: ${jsonData}`);
  } catch (e) {
    // Error handling
    console.log("storeDataObject Error", e);
    captureError(e, `storeDataObject`, `key: ${key}`);
  }
};

export const getDataString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    captureSuccess(`getDataString`, `key: ${key}`);
    return value != null ? value : { message: "Key not found or is empty" };
  } catch (e) {
    // Error handling
    console.log("getDataString Error", e);
    captureError(e, `getDataString`, `key: ${key}`);
  }
};

export const getDataObject = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    captureSuccess(`getDataObject`, `key: ${key}`);
    return value != null
      ? JSON.parse(value)
      : { message: "Key not found or is empty" };
  } catch (e) {
    // Error handling
    console.log("getDataObject Error", e);
    captureError(e, `getDataObject`, `key: ${key}`);
  }
};
