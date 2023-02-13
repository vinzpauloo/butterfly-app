import React from "react";
import {Text, StyleSheet, Image, ScrollView, Dimensions} from "react-native";

import {VStack} from "native-base";
import RenderHTML from "react-native-render-html";

import UserProfileSettingsHeader from "components/UserProfileSettingsHeader";
import {aboutApp} from "data/aboutApp"
import Logo from 'assets/images/butterfly.png'

const source = aboutApp
const About = () => {
  return (
      <ScrollView style={styles.container}>
        <UserProfileSettingsHeader title={null} btnRight={null}/>
        <VStack alignItems='center' space={2}>
          <Image source={Logo} style={styles.logo}/>
          <Text style={styles.title}>txvlog.com</Text>
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
    color: '#FFF',
      fontWeight: '900'
  },
  renderHTML: {
    color: 'white',
    padding: 10,
    textAlign: 'center'
  }
})
export default About;
