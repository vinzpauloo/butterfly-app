import {ScrollView, Dimensions, StyleSheet, Text} from "react-native";

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {globalStyle} from "globalStyles";

import {TESTING_ENV} from '@env';

const RecordingHistory = () => {
    return (
        <ScrollView style={styles.container}>
            <UserProfileSettingsHeader title='历史记录' btnRight={null}/>
            <Text style={styles.test}>{TESTING_ENV}</Text>
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
    test: {
        color: '#FFF',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 40,
        fontWeight: '900'
    }
})

export default RecordingHistory
