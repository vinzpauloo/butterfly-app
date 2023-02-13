import React from "react";
import {Text, StyleSheet, Image, ScrollView, Dimensions} from "react-native";

import {VStack} from "native-base";
import RenderHTML from "react-native-render-html";

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {serviceProvisionsData} from "data/serviceProvisionsData";
import Logo from 'assets/images/butterfly.png'

const source = serviceProvisionsData.chinese
const ServiceProvisions = () => {
    return (
        <ScrollView style={styles.container}>
            <UserProfileSettingsHeader title={null} btnRight={null}/>
            <VStack alignItems='center' space={2}>
                <Image source={Logo} style={styles.logo}/>
                <Text style={styles.title}>Service Provisions</Text>
            </VStack>
            <RenderHTML source={source} baseStyle={styles.renderHTML} contentWidth={Dimensions.get('window').width}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191d26',
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        color: '#FFF'
    },
    renderHTML: {
        color: 'white',
        padding: 10
    }
})
export default ServiceProvisions;
