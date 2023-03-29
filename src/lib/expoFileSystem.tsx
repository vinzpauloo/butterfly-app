import * as FileSystem from "expo-file-system";

const DEFAULT_DIRECTORY = FileSystem.documentDirectory + "downloads/";

export const downloadFile = async (url: string, fileName: string) => {
  const fileUri = DEFAULT_DIRECTORY + fileName;
  try {
    const res = await FileSystem.downloadAsync(url, fileUri);
    console.log("File downloaded successfully:", res.uri);
    return res;
  } catch (err) {
    console.log("Error downloading file:", err);
  }
};

export const readFileDirectory = async () => {
  console.log("readFileDirectory()");
  try {
    const res = await FileSystem.readDirectoryAsync(DEFAULT_DIRECTORY);
    console.log("Read directory successfully:", res);
    return res;
  } catch (err) {
    console.log("Directory not found.", err);
    console.log("Creating 'downloads' directory ...");

    await FileSystem.makeDirectoryAsync(DEFAULT_DIRECTORY);
    console.log("'Downloads' directory created!");
  }
};

export const writeAsString = async (fileName: string, data: any) => {
  const fileUri = DEFAULT_DIRECTORY + fileName;
  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    console.log("Writing as string successfully");
  } catch (err) {
    console.log("Error writing as string:", err);
  }
};

export const readAsString = async (fileName: string) => {
  const fileUri = DEFAULT_DIRECTORY + fileName;
  try {
    const payloadJSON = await FileSystem.readAsStringAsync(fileUri);
    const payload = JSON.parse(payloadJSON);
    console.log("Read as string successfully:", payload);
    return payload;
  } catch (err) {
    console.log("Error read as string:", err);
  }
};
