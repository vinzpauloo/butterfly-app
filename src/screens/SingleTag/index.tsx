import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const SingleTag = () => {
  const route = useRoute<any>();

  return (
    <View>
      <Text>SingleTag: {route.params?.tag}</Text>
    </View>
  );
};

export default SingleTag;

const styles = StyleSheet.create({});
