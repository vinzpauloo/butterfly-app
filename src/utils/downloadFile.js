const { StorageAccessFramework } = FileSystem;
import * as FileSystem from 'expo-file-system';
import { Platform } from "react-native";

// Initials
const downloadPath = FileSystem.documentDirectory + (Platform.OS == 'android' ? '' : '');

// Ensure directory exists
const ensureDirAsync = async (dir, intermediates = true) => {
	const props = await FileSystem.getInfoAsync(dir)
	if (props.exists && props.isDirectory) {
		return props;
	}
	let _ = await FileSystem.makeDirectoryAsync(dir, { intermediates })
	return await ensureDirAsync(dir, intermediates)
}

// Show download progress
const downloadCallback = downloadProgress => {
	const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
	console.log("DL progress: ",progress);
};

// Download initiat for android/ios
export const downloadFile = async (fileUrl, fileName) => {
	if (Platform.OS == 'android') {
		const dir = ensureDirAsync(downloadPath);
	}

	const downloadResumable = FileSystem.createDownloadResumable(
		fileUrl,
		downloadPath + fileName,
		{},
		downloadCallback
	);

	try {
		const { uri } = await downloadResumable.downloadAsync();
		if (Platform.OS == 'android')
			saveAndroidFile(uri, fileName)
		else
			saveIosFile(uri);
	} catch (e) {
		console.error('download error:', e);
	}
}

// Save android file in public directory
const saveAndroidFile = async (fileUri, fileName) => {
	try {
		const fileString = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

		const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
		if (!permissions.granted) {
			return;
		}

		try {
			await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'video/mp4')
				.then(async (uri) => {
					await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 });
					alert('download finished, choose where to save')
				})
				.catch((e) => {
				});
		} catch (e) {
			throw new Error(e);
		}

	} catch (err) {
	}
}

// Save ios file
const saveIosFile = (fileUri) => {
	// your ios code
	// i use expo share module to save ios file
}