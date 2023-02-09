import React from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import { WebView } from 'react-native-webview'

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {serviceProvisionsData} from "data/serviceProvisionsData";
const ServiceProvisions = () => {
    return (
        <SafeAreaView style={styles.container}>
            <UserProfileSettingsHeader title={null} btnRight={null}/>
            <WebView
                source={{ html: `<div style="color: #FFF"><div style="display: flex; justify-content: center"><img src='https://cdn.pixabay.com/photo/2017/02/01/00/32/butterfly-2028591_960_720.png' style="width: 80;"/></div>${serviceProvisionsData.map((item) =>  item.chinese.description)}</div>` }}
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
