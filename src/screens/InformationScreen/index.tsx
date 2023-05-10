import React from "react";
import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import Container from "components/Container";
import { GLOBAL_COLORS } from "global";
import { Avatar, Box, HStack, VStack } from "native-base";
import BottomMessage from "components/BottomMessage";
import SystemIcon from "assets/images/SystemIcon.png";
import commentIcon from "assets/images/commentIcon.png";
import girl from "assets/images/girl-thumbnail.png";
import vincent from "assets/images/vincent-avatar.png";
import gold from "assets/images/gold.png";

type Props = {};

const LikeCard = () => {
  return (
    <HStack style={styles.cardContainer} space={2}>
      <Avatar size={12} source={vincent}/>
      <VStack space={1}>
        <Text style={styles.whiteText}>Vincent@CC</Text>
        <Text style={styles.subtext}>Aut totam nihil cumque ...</Text>
      </VStack>
      <Box ml='auto'>
        <Pressable style={styles.orangeButton}>
          <Text style={styles.whiteText}>聊天</Text>
        </Pressable>
      </Box>
    </HStack>
  )
}

const FanCard = () => {
  return (
    <HStack style={styles.cardContainer} space={2}>
      <Avatar size={12} source={vincent}/>
      <VStack space={1}>
        <Text style={styles.whiteText}>Vincent@CC</Text>
        <Text style={styles.subtext}>04/05 关注了你</Text>
      </VStack>
      <HStack marginLeft='auto' flexDirection='row' space={2}>
        <Pressable style={styles.blackButton}>
          <Text style={styles.whiteText}>回关</Text>
        </Pressable>
        <Pressable style={styles.orangeButton}>
          <Text style={styles.whiteText}>聊天</Text>
        </Pressable>        
      </HStack>
    </HStack>
  )
}

const CommentCard = () => {
  return (
    <HStack style={[styles.cardContainer, {alignItems: 'flex-start'}]} space={2}>
      <Avatar size={12} source={vincent}/>
      <VStack space={1}>
        <HStack space={2}>
          <Text style={styles.whiteText}>Vincent@CC</Text>
          <Text style={styles.redText}>UP</Text>
        </HStack>
        <Text style={styles.subtext}>回复：你很不错，确实没办...</Text>
        <Pressable style={styles.replyButton}>
          <HStack alignItems='center' space={1}>
            <Image source={commentIcon} style={styles.icon} />
            <Text style={styles.subtext}>回复评论</Text>
          </HStack>
        </Pressable>
      </VStack>
      <Image source={girl} style={styles.workThumbnail} />
    </HStack>
  )
}

const IncomeCard = () => {
  return (
    <HStack style={styles.cardContainer} space={2}>
      <Avatar size={12} source={vincent} />
      <Text style={styles.whiteText}>Vincent@CC</Text>
      <HStack ml='auto' space={2}>
        <Image source={gold} style={styles.goldIcon} />
        <Text style={styles.subtext}>打赏 <Text style={styles.goldText}>20</Text> 金币</Text>
      </HStack>
    </HStack>
  )
}

const SystemCard = () => {
  return (
    <HStack style={styles.cardContainer} space={2}>
      <Image source={SystemIcon} style={styles.systemIcon}/>
      <VStack space={2}>
        <Text style={styles.whiteText}>系统公告</Text>
        <Text style={styles.subtext}>您的视频“xxxxxxx”涉嫌违规，被强制下架，请及时查看</Text>
      </VStack>
    </HStack>
  )
}

const InformationScreen = (props: Props) => {
  const fakeLoop = [1,2]
  const route = useRoute<any>();

  return (
    <Container>
      <VStack style={styles.infoScreenContainer} space={4}>
        {route?.params.postMessage === 'IncomeCard' &&
          <HStack alignItems='center' justifyContent='center' my={2}>
            <Text style={styles.totalRewardText}>目前总收益：40 金币</Text>
          </HStack>
        }
        {fakeLoop.map(item => 
          <>
            {route?.params.postMessage === 'LikeCard' && <LikeCard />}
            {route?.params.postMessage === 'FanCard' && <FanCard />}
            {route?.params.postMessage === 'CommentCard' && <CommentCard />}
            {route?.params.postMessage === 'IncomeCard' && <IncomeCard />}
            {route?.params.postMessage === 'SystemCard' && <SystemCard />}
          </>
        )}        
        <BottomMessage />
      </VStack>
    </Container>
  );
};

export default InformationScreen;

const styles = StyleSheet.create({
  infoScreenContainer: {
    padding: 16
  },
  cardContainer: {
    backgroundColor: GLOBAL_COLORS.videoContentBG,
    alignItems: 'center',
    padding: 16,
    borderRadius: 4
  },
  whiteText: {
    color: 'white',
    fontWeight: '600'
  },
  subtext: {
    color: '#8F9399'
  },
  orangeButton: {
    width: 64,
    height: 28,
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackButton: {
    width: 64,
    height: 28,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyButton: {
    width: 100,
    height: 28,
    backgroundColor: GLOBAL_COLORS.primaryColor,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  icon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },
  goldIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  redText: {
    backgroundColor: '#FF644A',
    color: 'white',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    fontWeight: '600'
  },
  goldText: {
    color: GLOBAL_COLORS.secondaryColor
  },
  totalRewardText: {
    color: GLOBAL_COLORS.secondaryColor,
    fontWeight: '600',
    borderWidth: 1,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderColor: GLOBAL_COLORS.secondaryColor,
    borderRadius: 12,
  },
  workThumbnail: {
    width: 60,
    height: 88,
    backgroundColor: 'gray',
    borderRadius: 4,
    marginLeft: 'auto'
  },
  systemIcon: {
    height: 38,
    width: 38,
    resizeMode: "contain",
  }
});
