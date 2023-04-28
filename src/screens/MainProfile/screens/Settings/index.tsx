import { Image, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";

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
import useDebounce from "hooks/useDebounce";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../../../zustand/translationStore";
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

const FirstContainer = ({ gender, setGender, nickname, setNickname }) => {
  const { alias, api_token, _id, photo } = userStore((store) => store);
  const { translations } = translationStore((store) => store);
  const { putCustomerProfile } = CustomerService();
  const [aliasHasChange, setAliasHasChange] = useState(false);

  const { mutate: mutateGender } = useMutation(putCustomerProfile, {
    onSuccess: (data) => {
      setGender(data.gender);
    },
  });

  const { mutate: mutateAlias } = useMutation(putCustomerProfile);

  const handlePress = (value) => {
    mutateGender({
      data: {
        gender: value,
      },
      token: api_token,
    });
  };

  const handleAliasChange = (text) => {
    setNickname(text);
    setAliasHasChange(true);
  };

  const newAlias = useDebounce(nickname, 500);

  useEffect(() => {
    if (aliasHasChange) {
      mutateAlias({
        data: {
          alias: newAlias,
        },
        token: api_token,
      });
    }
  }, [newAlias]);

  return (
    <VStack mb={10}>
      <LayoutContent>
        <Text style={styles.textLabel}>{translations.setup}</Text>
        <HStack alignItems="center">
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + photo }}
            style={styles.profileImg}
          />
          <Entypo
            name="chevron-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </HStack>
      </LayoutContent>
      <LayoutContent>
        <Text style={styles.textLabel}>{translations.nickname}</Text>
        <Input
          width="56"
          placeholder={translations.nickname}
          value={nickname}
          onChangeText={handleAliasChange}
          placeholderTextColor="#000000"
          style={[styles.textInput, { backgroundColor: "#7f7b7c" }]}
        />
      </LayoutContent>
      <LayoutContent>
        <Text style={styles.textLabel}>{translations.gender}</Text>
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
        <Text style={styles.textLabel}>
          {translations.pleaseEnterPhoneNumber}
        </Text>
        <Pressable>
          <Text style={styles.button}>{translations.toBind}</Text>
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
  const { _id } = userStore((store) => store);
  const { translations } = translationStore((store) => store);

  const handlePress = () => {
    navigation.navigate("Certificate", { postTitle: "" });
  };

  return (
    <VStack mb={10}>
      <LayoutContent>
        <TextIconContent>
          <Image source={AccountIcon} style={styles.textIcon} />
          <Text style={styles.textLabel}>{translations.accountID}</Text>
        </TextIconContent>
        <HStack
          alignItems="center"
          space={5}
          backgroundColor="#787879"
          style={styles.accountContainer}
          maxWidth="56"
          paddingRight="20"
        >
          <Text style={styles.accountText} numberOfLines={1}>
            {_id}
          </Text>
          <Pressable>
            <Text style={styles.redBtn}>{translations.copy}</Text>
          </Pressable>
        </HStack>
      </LayoutContent>

      <LayoutContent>
        <TextIconContent>
          <Image source={CertificateIcon} style={styles.textIcon} />
          <Text style={styles.textLabel}>
            {translations.accountCertificate}
          </Text>
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
          <Text style={styles.textLabel}>{translations.accountRetrieval}</Text>
        </TextIconContent>
        <HStack alignItems="center">
          <Text style={styles.textLabel}>
            {translations.lostAccountRecovered}
          </Text>
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
          <Text style={styles.textLabel}>
            {translations.bindInvitationCode}
          </Text>
        </TextIconContent>
        <Pressable>
          <Text style={styles.button}>{translations.toBind}</Text>
        </Pressable>
      </LayoutContent>
    </VStack>
  );
};

const ThirdContainer = () => {
  const navigation = useNavigation<any>();
  const { translations } = translationStore((store) => store);

  const handlePress = (title, api_params) => {
    navigation.navigate("Certificate", { postTitle: title, api_params });
  };

  return (
    <VStack>
      <LayoutContent>
        <TextIconContent>
          <Image source={HeadphoneIcon} style={styles.textIcon} />
          <Text style={styles.textLabel}>{translations.customerService}</Text>
        </TextIconContent>
        <Entypo
          name="chevron-right"
          color={GLOBAL_COLORS.primaryTextColor}
          size={25}
        />
      </LayoutContent>
      <Pressable
        onPress={() => handlePress(translations.privacyPolicy, "policy")}
      >
        <LayoutContent>
          <TextIconContent>
            <Image source={SecurityIcon} style={styles.textIcon} />
            <Text style={styles.textLabel}>{translations.privacyPolicy}</Text>
          </TextIconContent>
          <Entypo
            name="chevron-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </LayoutContent>
      </Pressable>
      <Pressable
        onPress={() => handlePress(translations.termOfService, "provisions")}
      >
        <LayoutContent>
          <TextIconContent>
            <Image source={FileIcon} style={styles.textIcon} />
            <Text style={styles.textLabel}>{translations.termOfService}</Text>
          </TextIconContent>
          <Entypo
            name="chevron-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </LayoutContent>
      </Pressable>
      <Pressable
        onPress={() => handlePress(translations.aboutApplication, "about")}
      >
        <LayoutContent>
          <TextIconContent>
            <Image source={InfoIcon} style={styles.textIcon} />
            <Text style={styles.textLabel}>
              {translations.aboutApplication}
            </Text>
          </TextIconContent>
          <Entypo
            name="chevron-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </LayoutContent>
      </Pressable>
    </VStack>
  );
};

const index = () => {
  const { api_token } = userStore();
  const { getCustomerProfile } = CustomerService();
  const [gender, setGender] = useState("");
  const [nickname, setNickname] = useState("");

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["MainProfileSettings"],
    queryFn: () => getCustomerProfile({ token: api_token }),
    onError: (error) => {
      console.log("Setting: ", error);
    },
    onSuccess: (data) => {
      setGender(data.gender);
      setNickname(data.alias);
    },
  });

  if (isLoading || isRefetching) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <FirstContainer
        gender={gender}
        setGender={setGender}
        nickname={nickname}
        setNickname={setNickname}
      />
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
