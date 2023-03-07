import {
  Dimensions,
  FlatList,
  Pressable,
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
import { ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import Container from "components/Container";
import Feeds from "./tabs/Feeds";
import GeneralSearch from "services/api/GeneralSearch";
import GridVideos from "features/sectionList/components/GridVideos";
import MaterialTopTabs from "layouts/navigators/MaterialTopTabs";
import Users from "./tabs/Users";
import VideoListSkeleton from "components/skeletons/VideoListSkeleton";
import Work from "./tabs/Work";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../zustand/userStore";
import { FlashList } from "@shopify/flash-list";

const { width } = Dimensions.get("window");

const SearchBar = ({ search, setSearch, hasSearch, setHasSearch }) => {
  const navigation = useNavigation<any>();
  const [text, setText] = useState("");

  const handlePress = () => {
    navigation.navigate("BottomNav");
  };

  const searchWords = () => {
    setSearch(text);
    setHasSearch(true);
  };

  const searchClear = () => {
    setHasSearch(false);
    setSearch("");
    setText("");
  };

  const enterToSearch = () => {
    setSearch(text);
  };

  return (
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
          value={text}
          onChangeText={(text: string) => setText(text)}
          placeholder="search model name"
          style={styles.inputField}
          onSubmitEditing={enterToSearch}
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
  );
};

const SearchItem = ({ data }) => {
  return (
    <View style={styles.searchItemContent}>
      <Text style={styles.searchesText}>
        {data.length > 10 ? data.slice(0, 10) + " ..." : data}
      </Text>
      <AntDesign name="closecircle" color="#aaa" size={25} />
    </View>
  );
};

const SearchHistory = ({ data }) => {
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
          data={data}
          renderItem={({ item, index }) => (
            <SearchItem key={index} data={item.search} />
          )}
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
        <FlashList
          scrollEnabled={false}
          estimatedItemSize={8}
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

const VideoList = ({ data }) => {
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
      <GridVideos data={data} />
    </View>
  );
};

const SearchOutput = ({ searchText }) => {
  const data = {
    initialRoute: "视频",
    screens: [
      {
        name: "视频",
        component: () => <Work searchText={searchText} />,
      },
      {
        name: "用户",
        component: () => <Users searchText={searchText} />,
      },
      {
        name: "动态",
        component: () => <Feeds searchText={searchText} />,
      },
    ],
  };
  return <MaterialTopTabs data={data} isEqualWidth={true} />;
};

const Search = () => {
  const [hasSearch, setHasSearch] = useState(false);
  const [search, setSearch] = useState<string>("");
  const token = userStore((state) => state.api_token);
  const { getSearchPageRecommended } = GeneralSearch();
  const { isLoading, data } = useQuery({
    queryKey: ["search"],
    queryFn: () => getSearchPageRecommended(token),
    onError: (error) => {
      console.log("search", error);
    },
  });
  if (isLoading) {
    return <VideoListSkeleton />;
  }

  return (
    <>
      <Container>
        <SearchBar
          search={search}
          setSearch={setSearch}
          hasSearch={hasSearch}
          setHasSearch={setHasSearch}
        />
        {hasSearch ? (
          <SearchOutput searchText={search} />
        ) : (
          <ScrollView>
            {data.search_history.length !== 0 ? (
              <SearchHistory data={data.search_history} />
            ) : null}

            <PopularSearches />
            <VideoList data={data.recommended} />
          </ScrollView>
        )}
      </Container>
    </>
  );
};

export default Search;

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
    // paddingHorizontal: 40,
    overflow: "hidden",
    width: width / 2,
  },
  textInputIcon: {
    position: "absolute",
    marginHorizontal: 10,
  },
  inputField: {
    width: "100%",
    paddingLeft: 40,
  },
  searchBtn: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
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
    maxWidth: width * 0.22,
    borderRadius: 20,
  },
  searchesText: {
    paddingHorizontal: 5,
    color: GLOBAL_COLORS.secondaryColor,
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
