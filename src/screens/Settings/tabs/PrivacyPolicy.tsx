import React from "react";
import {Image, SafeAreaView, Text, View, StyleSheet} from "react-native";
import { WebView } from 'react-native-webview'

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {privacyPolicyData} from "data/privacyPolicyData";
import Logo from 'assets/images/butterfly.png'
const PrivacyPolicy = () => {

  return (
      <SafeAreaView style={styles.container}>
        <UserProfileSettingsHeader title={null} btnRight={null}/>
          <View style={styles.titleContainer}>
              <Image source={Logo} style={styles.image}/>
              <Text style={styles.title}>Privacy Policy</Text>
          </View>
        <WebView
            source={{ html: privacyPolicyData.map((item) => item.chinese.description).join('') }}
            style={styles.htmlStyle}
            scalesPageToFit={false}
        />
      </SafeAreaView>
  );
};

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

export default PrivacyPolicy;
