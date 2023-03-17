import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  amountOfComments: number;
  openComments: () => void;
}

const CommentOverlay = (props: Props) => {
  return (
    <View style={styles.verticalBarItem}>
      <Pressable onPress={() => props.openComments()}>
        <MaterialCommunityIcons name="comment" color={"white"} size={40} />
      </Pressable>
      <Text style={styles.iconText}>{props.amountOfComments}</Text>
    </View>
  )
}

export default CommentOverlay

const styles = StyleSheet.create({
  verticalBarItem: {
    width: "100%",
    alignItems: "center",
  },
  iconText: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
})