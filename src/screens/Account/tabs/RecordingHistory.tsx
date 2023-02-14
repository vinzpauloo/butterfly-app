import {ScrollView, Dimensions, StyleSheet, Text} from "react-native";

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {globalStyle} from "globalStyles";

const RecordingHistory = () => {
    return (
        <ScrollView style={styles.container}>
            <UserProfileSettingsHeader title='历史记录' btnRight={null}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: Dimensions.get("window").height,
        maxWidth: Dimensions.get("window").width,
        backgroundColor: globalStyle.primaryColor
    },
})

export default RecordingHistory
