import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import { Box, HStack, VStack, useDisclose } from "native-base";

import Container from "components/Container";
import SampleVidImg from "assets/images/sapleVidImg.png";
import VideoComponent from "components/VideoComponent";
import { GLOBAL_COLORS, GLOBAL_SCREEN_SIZE } from "global";
import Entypo from "react-native-vector-icons/Entypo";
import { duration } from "moment";
import Modal from "components/BottomModal";

const { width } = Dimensions.get("window");

// **** SAMPLE DATA **** //
const sampleData = {
  statistic: {
    watched: 120,
  },
  duration: "12:00",
};

// **** START: COMPONENTS **** //
const Layout = ({ children, style = null }) => {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      backgroundColor: GLOBAL_COLORS.primaryColor,
      ...style,
    },
  });
  return <View style={styles.container}>{children}</View>;
};
// **** END: COMPONENTS **** //

const Video = ({ onOpen, setId }) => {
  const WIDTH_IMG = width < GLOBAL_SCREEN_SIZE.mobileMedium ? "40%" : "30%";
  const WIDTH_CONTENT = width < GLOBAL_SCREEN_SIZE.mobileMedium ? "60%" : "70%";

  const handlePressDots = (event) => {
    // setId(item._id);
    setId(1);
    onOpen(event);
  };

  return (
    <HStack width="full" height="20" my="1.5">
      <VStack width={WIDTH_IMG} height="full" position="relative">
        <VideoComponent item={sampleData} />
        <Image
          source={SampleVidImg}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", borderRadius: 4 }}
        />
      </VStack>
      <VStack
        width={WIDTH_CONTENT}
        height="full"
        py="0.5"
        pl="2"
        justifyContent="space-between"
      >
        <Text style={styles.title} numberOfLines={2}>
          逃离996露营好物的入坑推荐！逃离996露营好物的入坑推荐！逃离996露营好物的入坑推荐！逃离996露营好物的入坑推荐！逃离996露营好物的入坑推荐！逃离996露营好物的入坑推荐！
        </Text>
        <Text style={styles.subtitle}>今日 12:38</Text>
        <HStack alignItems="center" justifyContent="space-between">
          <Text style={styles.subtitle}>Vincent@cc</Text>
          <Pressable onPress={handlePressDots}>
            <Entypo
              name="dots-three-vertical"
              color={GLOBAL_COLORS.inactiveTextColor}
            />
          </Pressable>
        </HStack>
      </VStack>
    </HStack>
  );
};

// **** START: CONTENT **** //
const Content = ({ title, data, onOpen, setId }) => {
  return (
    <Layout>
      <VStack my={1}>
        <Text style={styles.contentTitle}>{title}</Text>
        {data.map((item, index) => (
          <Video key={index} onOpen={onOpen} setId={setId} />
        ))}
      </VStack>
    </Layout>
  );
};
// **** END: CONTENT **** //

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  // **** STATE
  const [id, setId] = useState<String | null>(null);

  return (
    <Container>
      <ScrollView>
        <Layout>
          <Content title="今日" data={[1, 2]} onOpen={onOpen} setId={setId} />
          <Content title="昨天" data={[1, 2]} onOpen={onOpen} setId={setId} />
          <Content title="更早" data={[1, 2]} onOpen={onOpen} setId={setId} />
        </Layout>
      </ScrollView>
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  contentTitle: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  subtitle: {
    color: GLOBAL_COLORS.inactiveTextColor,
  },
});
