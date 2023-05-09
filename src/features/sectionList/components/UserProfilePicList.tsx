import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Avatar, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";

type Props = {
  userInfo: any[];
};

type UserProfilePicItem = {
  userID: number;
  name: string;
  imgURL: string;
};

const UserProfilePicItem = (props: UserProfilePicItem) => {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      style={styles.profPicItem}
      onPress={() =>
        navigation.navigate("SingleUser", { userID: props.userID })
      }
    >
      <VStack space={2} style={{ alignItems: "center", maxWidth: 60 }}>
        <Avatar source={{ uri: BASE_URL_FILE_SERVER + props.imgURL }} />
        <Text style={styles.whiteText}>{props.name}</Text>
      </VStack>
    </Pressable>
  );
};

const UserProfilePicList = (props: Props) => {
  let numberOfRows = 1 + Math.floor(props.userInfo.length / 4);
  return (
    // <View style={[styles.wrapper, { height: 139.5 * numberOfRows }]}>
    <FlashList
      scrollEnabled={false}
      estimatedItemSize={83}
      numColumns={4}
      data={props.userInfo}
      renderItem={({ item, index }) => (
        <UserProfilePicItem
          name={item.username}
          imgURL={item.photo}
          userID={item.id}
        />
      )}
      keyExtractor={(item, index) => "" + index}
    />
    // </View>
  );
};

export default UserProfilePicList;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    flex: 1,
  },
  whiteText: {
    color: "white",
  },
  profPicItem: {
    marginVertical: 15,
    marginHorizontal: 5,
  },
});
