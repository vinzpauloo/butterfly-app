import { Image, StyleSheet, Text } from "react-native";
import React, { useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import { HStack, Input, Pressable, VStack } from "native-base";

import AccountIcon from "assets/images/account_icon.png";
import ActiveFemaleIcon from "assets/images/active_female_icon.png";
import ActiveMaleIcon from "assets/images/active_male_icon.png";
import CertificateIcon from "assets/images/certificate.png";
import ChainIcon from "assets/images/chain_icon.png";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import FileIcon from "assets/images/file_icon.png";
import FemaleIcon from "assets/images/female_icon.png";
import GlassIcon from "assets/images/glass_icon.png";
import HeadphoneIcon from "assets/images/headphone_icon.png";
import InfoIcon from "assets/images/info_icon.png";
import LoadingSpinner from "components/LoadingSpinner";
import MaleIcon from "assets/images/male_icon.png";
import SecurityIcon from "assets/images/security_icon.png";
import { GLOBAL_COLORS } from "global";
import { userStore } from "../../../../zustand/userStore";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";

const LayoutContent = ({ children }) => {
  return (
    <HStack px={5} py={2} alignItems="center" justifyContent="space-between">
      {children}
    </HStack>
  );
};

const TextIconContent = ({ children }) => {
  return (
    <HStack alignItems="center" space={5}>
      {children}
    </HStack>
  );
};

const FirstContainer = ({ gender, setGender }) => {
  const { photo, api_token } = userStore((store) => store);
  const { putCustomerGender } = CustomerService();

  const { mutate } = useMutation(putCustomerGender, {
    onSuccess: (data) => {
      setGender(data.gender);
    },
  });

  const handlePress = (value) => {
    mutate({
      data: {
        gender: value,
      },
      token: api_token,
    });
  };

  return (
    <VStack mb={10}>
      <LayoutContent>
        <Text style={styles.textLabel}>设置</Text>
        <HStack alignItems="center">
          <Image source={{ uri: photo }} style={styles.profileImg} />
          <Entypo
            name="chevron-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </HStack>
      </LayoutContent>
      <LayoutContent>
        <Text style={styles.textLabel}>昵称</Text>
        <Input
          width="64"
          placeholder="犹豫的香气"
          placeholderTextColor="#000000"
          style={[styles.textInput, { backgroundColor: "#7f7b7c" }]}
        />
      </LayoutContent>
      <LayoutContent>
        <Text style={styles.textLabel}>性别</Text>
        <HStack>
          <Pressable onPress={() => handlePress("Female")}>
            <Image
              source={gender === "Female" ? ActiveFemaleIcon : FemaleIcon}
              style={styles.femaleIcon}
            />
          </Pressable>
          <Pressable onPress={() => handlePress("Male")}>
            <Image
              source={gender === "Male" ? ActiveMaleIcon : MaleIcon}
              style={styles.maleIcon}
            />
          </Pressable>
        </HStack>
      </LayoutContent>
      <LayoutContent>
        <Text style={styles.textLabel}>手机号码</Text>
        <Pressable>
          <Text style={styles.button}>去绑定</Text>
        </Pressable>
      </LayoutContent>
      {/* <LayoutContent>
        <Text style={styles.textLabel}>个人简介</Text>
        <Input
          width="64"
          placeholder="用户很懒惰，什么也没留下"
          placeholderTextColor="#000000"
          style={[styles.textInput, { backgroundColor: "#EAEAEA" }]}
        />
      </LayoutContent> */}
    </VStack>
  );
};

const SecondContainer = () => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate("Certificate", { postTitle: "" });
  };

  return (
    <VStack mb={10}>
      <LayoutContent>
        <TextIconContent>
          <Image source={AccountIcon} style={styles.textIcon} />
          <Text style={styles.textLabel}>帐户ID</Text>
        </TextIconContent>
        <HStack
          alignItems="center"
          space={5}
          backgroundColor="#787879"
          style={styles.accountContainer}
        >
          <Text style={styles.accountText}>CDDZCB</Text>
          <Pressable>
            <Text style={styles.redBtn}>复制</Text>
          </Pressable>
        </HStack>
      </LayoutContent>

      <LayoutContent>
        <TextIconContent>
          <Image source={CertificateIcon} style={styles.textIcon} />
          <Text style={styles.textLabel}>账户证书</Text>
        </TextIconContent>
        <Entypo
          name="chevron-right"
          color={GLOBAL_COLORS.primaryTextColor}
          size={25}
        />
      </LayoutContent>

      <LayoutContent>
        <TextIconContent>
          <Image source={GlassIcon} style={styles.textIcon} />
          <Text style={styles.textLabel}>帐户检索</Text>
        </TextIconContent>
        <HStack alignItems="center">
          <Text style={styles.textLabel}>丢失的帐户快速找回</Text>
          <Entypo
            name="chevron-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </HStack>
      </LayoutContent>
      <LayoutContent>
        <TextIconContent>
          <Image source={ChainIcon} style={styles.textIcon} />
          <Text style={styles.textLabel}>绑定邀请码</Text>
        </TextIconContent>
        <Pressable>
          <Text style={styles.button}>绑定</Text>
        </Pressable>
      </LayoutContent>
    </VStack>
  );
};

const ThirdContainer = () => {
  const navigation = useNavigation<any>();

  const handlePress = (title, api_params) => {
    navigation.navigate("Certificate", { postTitle: title, api_params });
  };

  return (
    <VStack>
      <LayoutContent>
        <TextIconContent>
          <Image source={HeadphoneIcon} style={styles.textIcon} />
          <Text style={styles.textLabel}>客户服务</Text>
        </TextIconContent>
        <Entypo
          name="chevron-right"
          color={GLOBAL_COLORS.primaryTextColor}
          size={25}
        />
      </LayoutContent>
      <Pressable onPress={() => handlePress("隐私政策", "policy")}>
        <LayoutContent>
          <TextIconContent>
            <Image source={SecurityIcon} style={styles.textIcon} />
            <Text style={styles.textLabel}>隐私政策</Text>
          </TextIconContent>
          <Entypo
            name="chevron-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </LayoutContent>
      </Pressable>
      <Pressable onPress={() => handlePress("服务条款", "provisions")}>
        <LayoutContent>
          <TextIconContent>
            <Image source={FileIcon} style={styles.textIcon} />
            <Text style={styles.textLabel}>服务条款</Text>
          </TextIconContent>
          <Entypo
            name="chevron-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </LayoutContent>
      </Pressable>
      <LayoutContent>
        <TextIconContent>
          <Image source={InfoIcon} style={styles.textIcon} />
          <Text style={styles.textLabel}>关于申请</Text>
        </TextIconContent>
        <Entypo
          name="chevron-right"
          color={GLOBAL_COLORS.primaryTextColor}
          size={25}
        />
      </LayoutContent>
    </VStack>
  );
};

const index = () => {
  const { api_token } = userStore();
  const { getCustomerProfile } = CustomerService();
  const [gender, setGender] = useState("");

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["MainProfileSettings"],
    queryFn: () => getCustomerProfile({ token: api_token }),
    onError: (error) => {
      console.log("Setting: ", error);
    },
    onSuccess: (data) => {
      setGender(data.gender);
    },
  });

  if (isLoading || isRefetching) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <FirstContainer gender={gender} setGender={setGender} />
      <SecondContainer />
      <ThirdContainer />
    </Container>
  );
};

export default index;

const styles = StyleSheet.create({
  // ***** FIRST CONTAINER ***** //
  textLabel: {
    color: GLOBAL_COLORS.primaryTextColor,
  },
  profileImg: {
    height: 35,
    width: 35,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
  },
  textInput: {
    textAlign: "right",
    fontSize: 14,
    color: "#000000",
    height: 30,
  },
  femaleIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  maleIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: GLOBAL_COLORS.primaryTextColor,
    backgroundColor: "#00A3E5",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
  },
  // ***** SECOND CONTAINER ***** //
  textIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  accountContainer: {
    backgroundColor: "#787879",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  accountText: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  redBtn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GLOBAL_COLORS.primaryTextColor,
    color: GLOBAL_COLORS.primaryTextColor,
    backgroundColor: "#9C001C",
  },
});
