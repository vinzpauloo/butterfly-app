import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { WebView } from 'react-native-webview'

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {serviceProvisionsData} from "data/serviceProvisionsData";
import Logo from 'assets/images/butterfly.png'
const ServiceProvisions = () => {
    return (
        <SafeAreaView style={styles.container}>
            <UserProfileSettingsHeader title={null} btnRight={null}/>
            <View style={styles.titleContainer}>
                <Image source={Logo} style={styles.image}/>
                <Text style={styles.title}>Service Provisions</Text>
            </View>
            <WebView
                source={{ html: serviceProvisionsData.map((item) => item.english.description).join('')}}
                style={styles.htmlStyle}
                scalesPageToFit={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191d26'
    },
    titleContainer: {
        alignItems: 'center'
    },
    image: {
        width: 80, height: 80
    },
    title: {
        color: '#FFF',
        fontWeight: '900'
    },
    htmlStyle: {
        flex: 1,
        backgroundColor: '#191d26'
    }
})
export default ServiceProvisions;
