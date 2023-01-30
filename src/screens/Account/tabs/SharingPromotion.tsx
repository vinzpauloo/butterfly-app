import {ScrollView, Text, Dimensions, View, TouchableOpacity, StyleSheet, Image} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";


const SharingPromotion = () => {

    const navigation = useNavigation<any>();

    return (
        <ScrollView style={styles.container}>
            {/*Title and Back Button  */}
            <View
                style={styles.titleAndBackContainer}
            >
                <View style={styles.backBtn}>
                    <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                        <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>
                        分享推广
                    </Text>
                </View>
            </View>

            <View
                style={{
                    backgroundColor: "#FFFFFF",
                    height: 400,
                    marginHorizontal: 20,
                    borderRadius: 7,
                    marginTop: 20
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 25,
                    }}
                >
                    <Image
                        style={{
                            width: 35,
                            height: 35,
                        }}
                        source={require("../../../assets/images/profilePhoto.jpg")}
                    />
                    <Text style={{ color: "grey" }}>
                        网黄UP主的性爱博客{"\n"}
                        分享你我的性福生活
                    </Text>
                </View>

                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={require("../../../assets/images/qrcode.png")}
                    />

                    <View style={{}}>
                        <Text style={{ color: "grey", textAlign: "justify" }}>
                            分享好友立赠糖心专享会员
                        </Text>
                        <Text style={{ color: "grey", textAlign: "justify" }}>
                            邀请码:&nbsp;<Text style={{fontSize: 15,fontWeight: '600', color: 'black'}}>CDWQMC</Text>
                        </Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 50, marginTop: 30}}>
                    <View style={{backgroundColor: '#FAC690', height: 30, width: 110, alignItems: 'center', justifyContent: 'center', borderRadius: 15}}>
                        <Text>保存图片</Text>
                    </View>
                    <View style={{backgroundColor: '#FAC690', height: 30, width: 110, alignItems: 'center', justifyContent: 'center', borderRadius: 15}}>
                        <Text>复制链接</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: Dimensions.get("window").height,
        marginVertical: 0,
        maxWidth: Dimensions.get("window").width,
        backgroundColor: '#262632'
    },
    titleAndBackContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 0,
        backgroundColor: "#262632",
        height: 50,
    },
    backBtn: {
        position: "absolute",
        left: 5
    },
    title: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 20
    }
})

export default SharingPromotion
