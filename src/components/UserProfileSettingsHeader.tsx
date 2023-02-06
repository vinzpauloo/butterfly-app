import {Text, TouchableOpacity, View, StyleSheet} from "react-native";

import {useNavigation, useRoute} from "@react-navigation/native";

import {AntDesign} from "@expo/vector-icons";

const UserProfileSettingsHeader = ({title, btnRight}) => {
    const navigation = useNavigation<any>();
    const route = useRoute();

    return (
        <View style={route.name === 'About' ? styles.titleAndBackContainer2 : (route.name === 'ServiceProvisions' ? styles.titleAndBackContainer2 : (route.name === 'PrivacyPolicy' ? styles.titleAndBackContainer2 : styles.titleAndBackContainer))}>
            <View style={styles.backBtn}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            {btnRight && (
                <TouchableOpacity style={styles.rightBtn}>
                    <Text style={styles.btnColor}>完成</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    titleAndBackContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 0,
        backgroundColor: "#262632",
        height: 50,
    },
    titleAndBackContainer2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 0,
        backgroundColor: "#191d26",
        height: 50,
    },
    backBtn: {
        position: "absolute",
        left: 5,
    },
    title: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 20,
    },
    rightBtn: {
        position: "absolute",
        right: 23,
    },
    btnColor: {
        color: '#FF474E'
    }
})

export default UserProfileSettingsHeader;
