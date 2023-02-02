import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Container from "components/Container";
import Feeds from "./tabs/Feeds";
import GridVideos from "features/sectionList/components/GridVideos";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import Users from "./tabs/Users";
import Videos from "./tabs/Videos";
import { globalStyle } from "globalStyles";
import { multipleImages } from "data/gridImages";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const SearchBar = ({ setSearches, hasSearch, setHasSearch }) => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState<string>("");
  const handlePress = () => {
    navigation.navigate("BottomNav");
  };
  const searchWords = () => {
    setHasSearch(true);
    setSearches((prev) => [...prev, search]);
  };
  const searchClear = () => {
    setHasSearch(false);
    setSearch("");
  };
  return (
    <>
      {/* <StatusBar backgroundColor="#262632" /> */}
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back"
          color="#fff"
          size={30}
          onPress={handlePress}
        />
        <View style={styles.inputFieldContainer}>
          <Feather
            name="search"
            color="#aaa"
            size={20}
            style={[styles.textInputIcon, { left: 0 }]}
          />
          <TextInput
            value={search}
            onChangeText={(text: string) => setSearch(text)}
            placeholder="search model name"
            // style={styles.inputField}
          />
          {search.length > 0 ? (
            <AntDesign
              name="closecircle"
              color="#aaa"
              size={15}
              style={[styles.textInputIcon, { right: 0 }]}
              onPress={searchClear}
            />
          ) : (
            //use to not adjust the parent container if the cross button is hidden
            <View style={{ width: 35 }} />
          )}
        </View>
        {hasSearch ? (
          <Pressable style={styles.searchBtn} onPress={searchClear}>
            <Text style={styles.searchText}>Clear</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.searchBtn} onPress={searchWords}>
            <Text style={styles.searchText}>Search</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

const SearchItem = ({ text }) => {
  return (
    <View style={styles.searchItemContent}>
      <Text style={styles.searchesText}>
        {text.length > 10 ? text.slice(0, 10) + " ..." : text}
      </Text>
      <AntDesign name="closecircle" color="#aaa" size={25} />
    </View>
  );
};

const SearchHistory = ({ searches }) => {
  return (
    <View>
      <View style={styles.headerContent}>
        <View style={styles.iconContent}>
          <AntDesign name="clockcircleo" color="#fff" size={18} />
          <Text style={[styles.text, { marginLeft: 10 }]}>
            Previous Searches
          </Text>
        </View>
        <View style={styles.iconContent}>
          <MaterialCommunityIcons
            name="delete-outline"
            color="#fff"
            size={22}
          />
          <Text style={[styles.text, { marginLeft: 4 }]}>Clear Searches</Text>
        </View>
      </View>
      <View style={styles.searchesContainer}>
        <FlatList
          scrollEnabled={false}
          numColumns={3}
          data={searches}
          renderItem={({ item }) => <SearchItem text={item} />}
          keyExtractor={(_, index) => "" + index}
        />
      </View>
    </View>
  );
};

const PopularSearchItem = ({ text, index }) => {
  const color = (index) => {
    switch (index) {
      case 1:
        return "#e01b25";
      case 2:
        return "#fa3f0b";
      case 3:
        return "#f38408";
      default:
        return "#9b9b99";
    }
  };
  return (
    <View style={styles.popularSearchItem}>
      <Text style={[styles.number, { backgroundColor: color(index + 1) }]}>
        {index + 1}
      </Text>
      <Text style={styles.popularText}>{text}</Text>
    </View>
  );
};

const PopularSearches = () => {
  return (
    <View>
      <View style={styles.headerContent}>
        <View style={styles.iconContent}>
          <MaterialCommunityIcons name="fire" color="#fff" size={22} />
          <Text style={[styles.text, { marginLeft: 5 }]}>
            Top Keywords List
          </Text>
        </View>
      </View>
      <View style={styles.popularSearchItemContainer}>
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          data={[
            "Selections",
            "Latest",
            "Original",
            "HomeMade",
            "Hot",
            "Local",
            "PornStars",
            "Loli",
          ]}
          renderItem={({ item, index }) => (
            <PopularSearchItem text={item} index={index} />
          )}
          keyExtractor={(_, index) => "" + index}
        />
      </View>
    </View>
  );
};

const VideoList = () => {
  return (
    <View style={{ height: "100%" }}>
      <View style={styles.headerContent}>
        <View style={styles.iconContent}>
          <MaterialCommunityIcons
            name="heart-plus-outline"
            color="#fff"
            size={22}
          />
          <Text style={[styles.text, { marginLeft: 5 }]}>
            Recommended Videos List
          </Text>
        </View>
      </View>
      <GridVideos videos={multipleImages} />
    </View>
  );
};

const SearchOutput = () => {
  const data = {
    initialRoute: "视频",
    screens: [
      {
        name: "视频",
        component: (props) => <Videos {...props} />,
      },
      {
        name: "用户",
        component: (props) => <Users {...props} />,
      },
      {
        name: "动态",
        component: (props) => <Feeds {...props} />,
      },
    ],
  };
  return <MaterialTopTabs data={data} isEqualWidth={true} />;
};

const index = () => {
  const [hasSearch, setHasSearch] = useState(false);
  const [searches, setSearches] = useState<string[]>([
    "Mark",
    "Anthony",
    "Salvacion Mark",
    "Famarin",
  ]);
  return (
    <>
      <Container>
        <SearchBar
          setSearches={setSearches}
          hasSearch={hasSearch}
          setHasSearch={setHasSearch}
        />
        {hasSearch ? (
          <SearchOutput />
        ) : (
          <>
            <SearchHistory searches={searches} />
            <PopularSearches />
            <VideoList />
          </>
        )}
      </Container>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  //SEARCH BAR STYLES
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 50,
    width: width,
    backgroundColor: "#262632",
    paddingHorizontal: 10,
  },
  inputFieldContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 10,
    flexGrow: 1,
    paddingHorizontal: 40,
    overflow: "hidden",
    width: width / 2,
  },
  textInputIcon: {
    position: "absolute",
    marginHorizontal: 10,
  },
  // inputField: {
  //   minWidth: 170,
  // },
  searchBtn: {
    backgroundColor: globalStyle.secondaryColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  searchText: {
    color: "#fff",
  },

  //SEARCH HISTORY STYLES
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContent: {
    flexDirection: "row",
    marginHorizontal: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  searchesContainer: {
    marginHorizontal: 5,
  },
  searchItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    margin: 10,
    paddingHorizontal: 2,
    paddingVertical: 1,
    minWidth: width * 0.22,
    borderRadius: 20,
  },
  searchesText: {
    paddingHorizontal: 5,
    color: globalStyle.secondaryColor,
  },

  //Popular Search Item
  popularSearchItemContainer: {
    marginHorizontal: 15,
  },
  popularSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.45,
    marginVertical: 8,
  },
  number: {
    paddingHorizontal: 5,
    color: "#fff",
    textAlign: "center",
  },
  popularText: {
    color: "#aaa",
    marginHorizontal: 8,
  },
});
