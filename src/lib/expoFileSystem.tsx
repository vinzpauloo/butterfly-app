import * as FileSystem from "expo-file-system";

const DEFAULT_DIRECTORY = FileSystem.documentDirectory + "downloads/";

export const downloadFile = async (url: string, fileName: string) => {
  const fileUri = DEFAULT_DIRECTORY + fileName;
  try {
    const res = await FileSystem.downloadAsync(url, fileUri);
    console.log("File downloaded successfully:", res.uri);
  } catch (err) {
    console.log("Error downloading file:", err);
  }
};

export const readFileDirectory = async () => {
  console.log("readFileDirectory()");
  try {
    const res = await FileSystem.readDirectoryAsync(DEFAULT_DIRECTORY);
    console.log("Read directory successfully:", res);
  } catch (err) {
    console.log("Directory not found.", err);
    console.log("Creating 'downloads' directory ...");

    await FileSystem.makeDirectoryAsync(DEFAULT_DIRECTORY);
    console.log("'Downloads' directory created!");
  }
};
