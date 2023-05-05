import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import LottieView from "lottie-react-native";
import { HStack, Input, Modal, Pressable, Stack, VStack } from "native-base";

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
import Succesful from "assets/succesful.json";
import useDebounce from "hooks/useDebounce";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../../../zustand/translationStore";
import { userStore } from "../../../../zustand/userStore";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";

// **** START: FILE COMPONENTS **** //
const LayoutContent = ({ children }) => {
  return (
    <HStack px={5} py={2} alignItems="center" justifyContent="space-between">
      {children}
    </HStack>
  );
};

const ModalContent = ({ open, setOpen, children }) => {
  return (
    <Modal
      mt="auto"
      mb="auto"
      minH={400}
      closeOnOverlayClick
      isOpen={open}
      onClose={() => setOpen(false)}
      safeAreaTop={true}
      backdropVisible
      backgroundColor="#00000090"
    >
      {children}
    </Modal>
  );
};

const TextIconContent = ({ children }) => {
  return (
    <HStack alignItems="center" space={5}>
      {children}
    </HStack>
  );
};

const SuccessNotification = () => {
  const { translations } = translationStore((store) => store);
  return (
    <Stack
      width="full"
      height="full"
      position="absolute"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#00000090"
    >
      <View style={styles.success}>
        <Text style={styles.successText}>{translations.boundSuccessfully}</Text>
        <LottieView autoPlay source={Succesful} />
      </View>
    </Stack>
  );
};
// **** END: FILE COMPONENTS **** //

// **** START: FIRST CONTAINER **** //
const FirstContainer = ({
  gender,
  setGender,
  nickname,
  setNickname,
  setOpen,
}) => {
  const userStoreData = userStore((store) => store);
  const setUserStore = userStore((state) => state.setUserData);
  const { translations } = translationStore((store) => store);
  const { putCustomerProfile } = CustomerService();
  const [aliasHasChange, setAliasHasChange] = useState(false);

  const { mutate: mutateGender } = useMutation(putCustomerProfile, {
    onSuccess: (data) => {
      setGender(data.gender);
    },
  });

  const { mutate: mutateAlias } = useMutation(putCustomerProfile, {
    onSuccess: (data) => {
      setUserStore({ ...userStoreData, alias: data.alias });
    },
  });

  const handlePress = (value) => {
    mutateGender({
      data: {
        gender: value,
      },
      token: userStoreData.api_token,
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
        token: userStoreData.api_token,
      });
    }
  }, [newAlias]);

  return (
    <VStack mb={10}>
      <LayoutContent>
        <Text style={styles.textLabel}>{translations.setup}</Text>
        <HStack alignItems="center">
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + userStoreData.photo }}
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
        {!!userStoreData.mobile ? (
          <>
            <Text style={styles.textLabel}>{translations.mobileNumber}</Text>
            <Text style={styles.textLabel}>{userStoreData.mobile}</Text>
          </>
        ) : (
          <>
            <Text style={styles.textLabel}>
              {translations.pleaseEnterPhoneNumber}
            </Text>
            <Pressable onPress={() => setOpen(true)}>
              <Text style={styles.button}>{translations.toBind}</Text>
            </Pressable>
          </>
        )}
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
// **** END: FIRST CONTAINER **** //

// **** START: SECOND CONTAINER **** //
const SecondContainer = ({ setOpen }) => {
  // ** GLOBAL STORE
  const { _id, referral_code } = userStore((store) => store);
  const { translations } = translationStore((store) => store);

  const handlePress = () => {
    setOpen(true);
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
        {!!referral_code ? (
          <>
            <TextIconContent>
              <Image source={ChainIcon} style={styles.textIcon} />
              <Text style={styles.textLabel}>
                {translations.invitationCode}
              </Text>
            </TextIconContent>
            <Text style={styles.textLabel}>{referral_code}</Text>
          </>
        ) : (
          <>
            <TextIconContent>
              <Image source={ChainIcon} style={styles.textIcon} />
              <Text style={styles.textLabel}>
                {translations.bindInvitationCode}
              </Text>
            </TextIconContent>
            <Pressable onPress={handlePress}>
              <Text style={styles.button}>{translations.toBind}</Text>
            </Pressable>
          </>
        )}
      </LayoutContent>
    </VStack>
  );
};
// **** END: SECOND CONTAINER **** //

// **** START: THIRD CONTAINER **** //
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
// **** END: THIRD CONTAINER **** //

// **** START: BIND MOBILE MODAL **** //
const BindMobileModal = ({ open, setOpen, setSuccessfulNotification }) => {
  // ** GLOBAL STORE
  const userStoreData = userStore((store) => store);
  const setUserStore = userStore((state) => state.setUserData);
  const { translations } = translationStore((store) => store);
  // ** STORE
  const [mobileNumber, setMobileNumber] = useState("");
  // ** API
  const { putCustomerProfile } = CustomerService();

  const { mutate: mutateBindMobile } = useMutation(putCustomerProfile, {
    onSuccess: (data) => {
      setUserStore({ ...userStoreData, mobile: data.mobile });
      setOpen(false);
      setMobileNumber("");
      // ** show the success lottie
      setSuccessfulNotification(true);
      // ** auto close the success lottie after 2 seconds
      setTimeout(() => {
        setSuccessfulNotification(false);
      }, 2000);
    },
  });

  const handlePress = () => {
    if (mobileNumber.length !== 0) {
      mutateBindMobile({
        data: {
          mobile: mobileNumber,
        },
        token: userStoreData.api_token,
      });
    }
  };

  return (
    <ModalContent open={open} setOpen={setOpen}>
      <VStack
        width="full"
        backgroundColor="#202833"
        p={4}
        alignItems="center"
        borderRadius={5}
      >
        <Text style={styles.bindMobileTitle}>
          {translations.bindMobilePhone}
        </Text>
        <VStack width="full" my={3}>
          <Input
            placeholder={translations.enterTheMobilePhoneNumber}
            variant="filled"
            backgroundColor="#FFFFFF"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <HStack space={2} alignItems="center" mt={2}>
            <Input
              placeholder={translations.pleaseEnterSMSCode}
              variant="filled"
              backgroundColor="#FFFFFF"
              width="2/3"
            />
            <Pressable>
              <Text style={styles.bindMobileBtn}>
                {translations.obtainSMSVerification}
              </Text>
            </Pressable>
          </HStack>
        </VStack>
        <Pressable onPress={handlePress}>
          <Text
            style={[
              styles.bindMobileConfirmBtn,
              {
                backgroundColor: mobileNumber.length !== 0 ? "#ac1f99" : "#777",
              },
            ]}
          >
            {translations.bindMobilePhone}
          </Text>
        </Pressable>
      </VStack>
    </ModalContent>
  );
};
// **** END: BIND MOBILE MODAL **** //

// **** START: BIND ACCOUNT MODAL **** //
const BindAccountModal = ({ open, setOpen, setSuccessfulNotification }) => {
  // ** GLOBAL STORE
  const userStoreData = userStore((store) => store);
  const setUserStore = userStore((state) => state.setUserData);
  const { translations } = translationStore((store) => store);
  // ** STATE
  const [agentReferral, setAgentReferral] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // ** API
  const { putCustomerProfile } = CustomerService();

  const { mutate: mutateBindMobile } = useMutation(putCustomerProfile, {
    onSuccess: (data) => {
      setUserStore({ ...userStoreData, referral_code: data.referral_code });
      setOpen(false);
      setAgentReferral("");
      // ** show the success lottie
      setSuccessfulNotification(true);
      // ** auto close the success lottie after 2 seconds
      setTimeout(() => {
        setSuccessfulNotification(false);
      }, 2000);
    },
    onError: ({ data }) => {
      setErrorMessage(data.error.message);
    },
  });

  const handlePress = () => {
    if (agentReferral.length !== 0) {
      mutateBindMobile({
        data: {
          agent_referral: agentReferral,
        },
        token: userStoreData.api_token,
      });
    }
  };

  return (
    <ModalContent open={open} setOpen={setOpen}>
      <VStack
        width="full"
        backgroundColor="#202833"
        p={4}
        alignItems="center"
        borderRadius={5}
      >
        <Text style={styles.bindMobileTitle}>
          {translations.fillInInvitation}
        </Text>
        <VStack width="full" my={3}>
          <Input
            placeholder={translations.pleaseFillInvitationCode}
            variant="filled"
            backgroundColor="#FFFFFF"
            value={agentReferral}
            onChangeText={setAgentReferral}
          />
          {errorMessage.length !== 0 ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
        </VStack>
        <Pressable onPress={handlePress}>
          <Text
            style={[
              styles.bindMobileConfirmBtn,
              {
                backgroundColor:
                  agentReferral.length !== 0 ? "#ac1f99" : "#777",
              },
            ]}
          >
            {translations.submit}
          </Text>
        </Pressable>
      </VStack>
    </ModalContent>
  );
};
// **** END: BIND ACCOUNT MODAL **** //

const index = () => {
  // ** GLOBAL STORE
  const { api_token } = userStore();
  // ** STATE
  const [gender, setGender] = useState("");
  const [nickname, setNickname] = useState("");
  const [openBindMobileModal, setOpenBindMobileModal] = useState(false);
  const [openBindAccountModal, setOpenBindAccountModal] = useState(false);
  const [succesfulNotification, setSuccessfulNotification] = useState(false);
  // ** API
  const { getCustomerProfile } = CustomerService();

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
    <>
      <Container>
        <FirstContainer
          gender={gender}
          setGender={setGender}
          nickname={nickname}
          setNickname={setNickname}
          setOpen={setOpenBindMobileModal}
        />
        <SecondContainer setOpen={setOpenBindAccountModal} />
        <ThirdContainer />
        <BindMobileModal
          open={openBindMobileModal}
          setOpen={setOpenBindMobileModal}
          setSuccessfulNotification={setSuccessfulNotification}
        />
        <BindAccountModal
          open={openBindAccountModal}
          setOpen={setOpenBindAccountModal}
          setSuccessfulNotification={setSuccessfulNotification}
        />
      </Container>
      {succesfulNotification ? <SuccessNotification /> : null}
    </>
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
  // ***** MODAL CONTAINER ***** //
  bindMobileTitle: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  bindMobileBtn: {
    textAlign: "center",
    color: GLOBAL_COLORS.primaryTextColor,
    backgroundColor: "#00bce6",
    paddingVertical: 15,
    borderRadius: 5,
    paddingHorizontal: 15,
    width: 112,
  },
  bindMobileConfirmBtn: {
    textAlign: "center",
    color: GLOBAL_COLORS.primaryTextColor,
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  error: {
    color: "#FF0000",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    paddingHorizontal: 5,
  },
  // ***** SUCCESS NOTIFICATION ***** //
  success: {
    alignItems: "center",
    padding: 5,
    width: 380,
    height: 270,
    backgroundColor: "#171e24",
    borderColor: GLOBAL_COLORS.primaryTextColor,
    borderWidth: 2,
    borderRadius: 10,
  },
  successText: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});
