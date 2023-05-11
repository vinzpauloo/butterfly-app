import React from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import chatActiveWhite from "assets/images/chatActiveWhite.png";
import { VStack } from 'native-base';

type Props = {
  amountOfComments: number;
  openComments: () => void;
}

const CommentOverlay = (props: Props) => {
  return (
    <VStack style={styles.verticalBarItem} space={1}>
      <Pressable onPress={() => props.openComments()}>
        <Image source={chatActiveWhite} style={styles.image} />
      </Pressable>
      <Text style={styles.iconText}>{props.amountOfComments}</Text>
    </VStack>
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
  image: {
    width: 24,
    height: 24
  }
})