import {ScrollView, Dimensions, StyleSheet} from "react-native";

import UserProfileSettingsHeader from "../../../components/UserProfileSettingsHeader";


const RecordingHistory = () => {

    return (
        <ScrollView style={styles.container}>

            {/*Title and Back Button  */}
            <UserProfileSettingsHeader title='历史记录'/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: Dimensions.get("window").height,
        marginVertical: 0,
        maxWidth: Dimensions.get("window").width,
        backgroundColor: '#191d26'
    },
})

export default RecordingHistory
