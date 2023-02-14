import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeDataString = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    // Error handling
    console.log("storeDataString Error", e);
  }
};

export const storeDataObject = async (key: string, data: Object) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (e) {
    // Error handling
    console.log("storeDataObject Error", e);
  }
};

export const getDataString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? value : { message: "Key not found or is empty" };
  } catch (e) {
    // Error handling
    console.log("storeDataString Error", e);
  }
};

export const getDataObject = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null
      ? JSON.parse(value)
      : { message: "Key not found or is empty" };
  } catch (e) {
    // Error handling
    console.log("storeDataString Error", e);
  }
};
