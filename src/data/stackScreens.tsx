import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

import { globalStyle } from "globalStyles";
import BottomTabs from "layouts/navigators/BottomTabs";
import PortraitVideo from "layouts/PortraitVideo";
import SingleVideoScreen from "screens/SingleVideo";
import PhotoGallery from "screens/PhotoGallery";
import Search from "screens/Search";

import { bottomNav } from "./bottomNav";

export const stackScreens = {
  initialRoute: "BottomNav",
  screenOptions: { animation: "slide_from_right" },
  screens: [
    {
      name: "BottomNav",
      component: () => <BottomTabs data={bottomNav} />,
      options: { headerShown: false },
    },
    {
      name: "SingleVideo",
      component: SingleVideoScreen,
      options: ({ navigation, route }: any) => ({
        title: "",
        headerStyle: {
          backgroundColor: globalStyle.primaryColor,
        },
        headerLeft: () => (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="chevron-back-sharp"
              color="#fff"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <Image source={route.params?.image} style={styles.image} />
            <View>
              <Text style={styles.title}>{route.params?.title}</Text>
              <Text style={styles.subTitle}>{route.params?.subTitle}</Text>
            </View>
          </View>
        ),
        headerTitleStyle: {
          color: "#fff",
        },
      }),
    },
    {
      name: "Search",
      component: Search,
      options: ({ navigation }: any) => ({
        title: "",
        headerStyle: {
          backgroundColor: globalStyle.primaryColor,
        },
        headerLeft: () => (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="chevron-back-sharp"
              color="#fff"
              size={30}
              onPress={() => navigation.goBack()}
            />
            <View style={styles.searchInputContainer}>
              <Feather
                name="search"
                size={25}
                color="#aaa"
                style={styles.icon}
              />
              <TextInput placeholder="Search here" style={styles.input} />
              <Entypo
                name="circle-with-cross"
                size={18}
                color="#aaa"
                style={styles.icon}
              />
            </View>
          </View>
        ),
        headerTitleStyle: {
          color: "#fff",
        },
      }),
    },
    {
      name: "VlogScreen",
      component: () => <PortraitVideo hasBackButton={true} />,
      options: { headerShown: false },
    },
    {
      name: "PhotoGallery",
      component: () => <PhotoGallery />,
      headerShown: true,
      options: ({ navigation, route }: any) => ({
        headerTitle: route?.params.postTitle ,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: globalStyle.primaryColor,
        },
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="chevron-back-sharp"
              color="#fff"
              size={30}
              onPress={() => navigation.goBack()}
            />
          </View>
        ),
      }),
    },
  ],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    color: "#fff",
  },
  subTitle: {
    color: "#999",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 250,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 6,
  },
  input: {
    width: 180,
  },
});
