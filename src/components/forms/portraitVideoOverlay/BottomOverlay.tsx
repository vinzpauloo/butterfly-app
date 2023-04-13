import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { userStore } from "../../../zustand/userStore";

type Props = {
  userID: number;
  userName: string;
  title: string;
  tags: string[];
};

const BottomOverlay = (props: Props) => {
  const navigation = useNavigation<any>();
  const isVip = userStore((state) => state.is_Vip);

  return (
    <VStack space={2} style={styles.bottomSection}>
      <Pressable
        onPress={() =>
          navigation.navigate("SingleUser", { userID: props.userID })
        }
      >
        <Text style={[styles.userName, styles.iconText]}>
          @{props.userName}
        </Text>
      </Pressable>
      <Text style={styles.iconText}>{props.title}</Text>
      <View style={styles.tags}>
        {props.tags.map((item, index) => (
          <Pressable
            key={index}
            style={styles.tag}
            onPress={() => {
              navigation.navigate("SingleTag", { tag: item });
            }}
          >
            <Text style={styles.iconText}>#{item}</Text>
          </Pressable>
        ))}
      </View>
      {!isVip && (
        <Pressable onPress={() => navigation.navigate("SharingPromotion")}>
          <View>
            <Text style={styles.subscribe}>
              Subscription needed or gold coin
            </Text>
          </View>
        </Pressable>
      )}
    </VStack>
  );
};

export default BottomOverlay;

const styles = StyleSheet.create({
  bottomSection: {
    position: "absolute",
    paddingHorizontal: 8,
    paddingBottom: 16,
    bottom: 0,
  },
  userName: {
    fontWeight: "bold",
  },
  iconText: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  tags: {
    flexDirection: "row",
    gap: 10,
  },
  tag: {
    marginRight: 5,
  },
  subscribe: {
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    padding: 5,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
    alignSelf: "flex-start",
  },
});
