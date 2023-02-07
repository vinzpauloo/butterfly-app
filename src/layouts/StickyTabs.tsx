import { StyleSheet, View } from "react-native";
import React from "react";

import {
  Tabs,
  MaterialTabBar,
  TabBarProps,
  ScrollView,
} from "react-native-collapsible-tab-view";

import { globalStyle } from "globalStyles";

interface IStickyTabsProps {
  data: {
    Header: any;
    tabItems: ITabItems[];
  };
}

interface ITabItems {
  name: string;
  label: string;
  Content: JSX.Element;
}

const StickyTabs: React.FC<IStickyTabsProps> = ({ data }) => {
  const { Header, tabItems } = data;

  const CustomTabHeader = () => {
    /* 
      NOTE: Needs improvement to allow scrolling & touchables inside the header

      pointerEvents="none" allows scroll gesture
      pointerEvents="box-none" allows touchables

      See documentation note: https://github.com/PedroBern/react-native-collapsible-tab-view#scroll-on-header
    */
    return (
      <View pointerEvents="box-none">
        <Header />
      </View>
    );
  };

  const CustomTabBar = (props: TabBarProps<string>) => {
    return (
      <MaterialTabBar
        {...props}
        activeColor={globalStyle.primaryTextColor}
        inactiveColor={globalStyle.inactiveTextColor}
        tabStyle={styles.tabStyle}
        indicatorStyle={styles.indicatorStyle}
        scrollEnabled
      />
    );
  };

  /*
    NOTE: Needs improvement when switching tabs. Must render only when tab item is focused.
    See issue: https://github.com/PedroBern/react-native-collapsible-tab-view/issues/116
  */
  return (
    <Tabs.Container
      lazy={true}
      renderHeader={CustomTabHeader}
      renderTabBar={CustomTabBar}
    >
      {tabItems.map((item, index) => (
        <Tabs.Tab key={index} name={item.name} label={item.label} >
          {/* 
            Type error workaround when using Tab.ScrollView
            See issue: https://github.com/PedroBern/react-native-collapsible-tab-view/issues/139
          */}
          <ScrollView
            accessibilityComponentType={undefined}
            accessibilityTraits={undefined}
          >
            {item.Content}
          </ScrollView>
        </Tabs.Tab>
      ))}
    </Tabs.Container>
  );
};

export default StickyTabs;

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: globalStyle.primaryColor,
    height: 40,
  },
  indicatorStyle: {
    backgroundColor: globalStyle.secondaryColor,
  },
});
