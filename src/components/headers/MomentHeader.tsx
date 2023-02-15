import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { HStack, Divider } from "native-base";

import { GLOBAL_COLORS } from "global";
import { useNavigation } from "@react-navigation/native";
import { officialCertificateList } from "data/officialCertificateList";

import MomentHeaderSkeleton from "components/skeletons/MomentHeaderSkeleton";

type Props = {};

const MomentHeader = (props: Props) => {
  const navigation = useNavigation<any>();
  const [certificateListIsLoaded, setCertificateListIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setCertificateListIsLoaded(true), 1000);
  });

  return (
    <View style={styles.certificateContainer}>
      {certificateListIsLoaded ? (
        officialCertificateList.map((certificate, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate("SingleFeedScreen", { postTitle: "详情" })
            }
          >
            <HStack space={3} alignItems="center">
              <View style={styles.dot}></View>
              <Text style={styles.whiteText}>
                {certificate.certificateName}
              </Text>
            </HStack>
            {index === officialCertificateList.length - 1 ? null : (
              <Divider style={styles.divider} color="#999" />
            )}
          </Pressable>
        ))
      ) : (
        <MomentHeaderSkeleton />
      )}
    </View>
  );
};

export default MomentHeader;

const styles = StyleSheet.create({
  certificateContainer: {
    backgroundColor: GLOBAL_COLORS.headerBasicBg,
    padding: 12,
    flex: 1,
  },
  whiteText: {
    color: "white",
  },
  divider: {
    marginVertical: 12,
  },
  dot: {
    backgroundColor: GLOBAL_COLORS.secondaryColor,
    height: 8,
    width: 8,
    borderRadius: 4,
  },
});
