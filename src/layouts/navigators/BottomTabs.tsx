import {} from "react-native";
import React, { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { globalStyle } from "../../globalStyles";
import Advertisements from "screens/InitialLoad/Advertisements";
import Announcement from "screens/InitialLoad/Announcement";

const BottomTab = createBottomTabNavigator();

const BottomTabs = ({ data }) => {
  const [closeAds, setCloseAds] = useState(true);
  const [closeAnnouncement, setcloseAnnouncement] = useState(true);
  return (
    <>
      {closeAds ? <Advertisements setCloseAds={setCloseAds} /> : null}
      {closeAnnouncement ? (
        <Announcement setcloseAnnouncement={setcloseAnnouncement} />
      ) : null}

      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: globalStyle.secondaryColor,
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#262632",
            paddingBottom: 10,
            height: 60,
          },
        }}
      >
        {data?.map((item, index) => (
          <BottomTab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              tabBarIcon: item.icon,
            }}
          />
        ))}
      </BottomTab.Navigator>
    </>
  );
};

export default BottomTabs;
