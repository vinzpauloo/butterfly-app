import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import Entypo from "react-native-vector-icons/Entypo";
import LottieView from "lottie-react-native";
import { HStack, Input, Modal, Pressable, Stack, VStack } from "native-base";

import CoinIcon from "assets/images/coinIcon.png";
import Container from "components/Container";
import CustomerService from "services/api/CustomerService";
import LoadingSpinner from "components/LoadingSpinner";
import Succesful from "assets/succesful.json";
import { BASE_URL_FILE_SERVER } from "react-native-dotenv";
import { GLOBAL_COLORS } from "global";
import { translationStore } from "../../../../zustand/translationStore";
import { userStore } from "../../../../zustand/userStore";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import Ionicons from "react-native-vector-icons/Ionicons";

// **** START: FILE COMPONENTS **** //
const LayoutContent = ({ children }) => {
  return (
    <HStack px={5} py="3" alignItems="center" justifyContent="space-between">
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
  nickname,
  setOpenNickName,
  setGenderModal,
  setOpenBindMobileModal,
}) => {
  const userStoreData = userStore((store) => store);
  const { translations } = translationStore((store) => store);

  const handleOpenNickNameModal = () => {
    setOpenNickName(true);
  };

  const handleOpenGenderModal = () => {
    setGenderModal(true);
  };

  const handleOpenBindMobileModal = () => {
    setOpenBindMobileModal(true);
  };

  return (
    <VStack mt={5} style={{ backgroundColor: GLOBAL_COLORS.videoContentBG }}>
      <LayoutContent>
        <Text style={styles.textLabel}>{translations.setup}</Text>
        <HStack alignItems="center">
          <Image
            source={{ uri: BASE_URL_FILE_SERVER + userStoreData.photo }}
            style={styles.profileImg}
          />
          <Entypo
            name="chevron-small-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </HStack>
      </LayoutContent>
      <Pressable onPress={handleOpenNickNameModal}>
        <LayoutContent>
          <Text style={styles.textLabel}>{translations.nickname}</Text>
          <HStack alignItems="center">
            <Text style={styles.textLabel}>{nickname}</Text>
            <Entypo
              name="chevron-small-right"
              color={GLOBAL_COLORS.primaryTextColor}
              size={25}
            />
          </HStack>
        </LayoutContent>
      </Pressable>
      <Pressable onPress={handleOpenGenderModal}>
        <LayoutContent>
          <Text style={styles.textLabel}>{translations.gender}</Text>
          <HStack alignItems="center">
            <Text style={styles.textLabel}>
              {gender === "Male" ? translations.male : translations.female}
            </Text>
            <Entypo
              name="chevron-small-right"
              color={GLOBAL_COLORS.primaryTextColor}
              size={25}
            />
          </HStack>
        </LayoutContent>
      </Pressable>
      <Pressable onPress={handleOpenBindMobileModal}>
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
              <HStack alignItems="center">
                <Text style={styles.textLabel}>去绑定</Text>
                <Entypo
                  name="chevron-small-right"
                  color={GLOBAL_COLORS.primaryTextColor}
                  size={25}
                />
              </HStack>
            </>
          )}
        </LayoutContent>
      </Pressable>
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
    <VStack mt={5} style={{ backgroundColor: GLOBAL_COLORS.videoContentBG }}>
      <LayoutContent>
        <Text style={styles.textLabel}>{translations.accountID}</Text>
        <HStack
          alignItems="center"
          space={5}
          style={styles.accountContainer}
          maxWidth="56"
          paddingRight="12"
        >
          <Text style={styles.accountText} numberOfLines={1}>
            {_id}
          </Text>
          <Pressable>
            <Text style={styles.redBtn}>{translations.copy}</Text>
          </Pressable>
        </HStack>
        <Entypo
          name="chevron-small-right"
          color={GLOBAL_COLORS.primaryTextColor}
          size={25}
        />
      </LayoutContent>

      <LayoutContent>
        <Text style={styles.textLabel}>{translations.accountCertificate}</Text>
        <Entypo
          name="chevron-small-right"
          color={GLOBAL_COLORS.primaryTextColor}
          size={25}
        />
      </LayoutContent>

      <LayoutContent>
        <Text style={styles.textLabel}>{translations.accountRetrieval}</Text>
        <HStack alignItems="center">
          <Text style={styles.textLabel}>
            {translations.lostAccountRecovered}
          </Text>
          <Entypo
            name="chevron-small-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </HStack>
      </LayoutContent>
      <Pressable onPress={handlePress}>
        <LayoutContent>
          {!!referral_code ? (
            <>
              <Text style={styles.textLabel}>
                {translations.invitationCode}
              </Text>
              <Text style={styles.textLabel}>{referral_code}</Text>
            </>
          ) : (
            <>
              <Text style={styles.textLabel}>
                {translations.bindInvitationCode}
              </Text>
              <HStack alignItems="center">
                <Text style={styles.textLabel}>去绑定</Text>
                <Entypo
                  name="chevron-small-right"
                  color={GLOBAL_COLORS.primaryTextColor}
                  size={25}
                />
              </HStack>
            </>
          )}
        </LayoutContent>
      </Pressable>
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
    <VStack mt={5} style={{ backgroundColor: GLOBAL_COLORS.videoContentBG }}>
      <LayoutContent>
        <Text style={styles.textLabel}>{translations.customerService}</Text>
        <Entypo
          name="chevron-small-right"
          color={GLOBAL_COLORS.primaryTextColor}
          size={25}
        />
      </LayoutContent>
      <Pressable
        onPress={() => handlePress(translations.privacyPolicy, "policy")}
      >
        <LayoutContent>
          <Text style={styles.textLabel}>{translations.privacyPolicy}</Text>
          <Entypo
            name="chevron-small-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </LayoutContent>
      </Pressable>
      <Pressable
        onPress={() => handlePress(translations.termOfService, "provisions")}
      >
        <LayoutContent>
          <Text style={styles.textLabel}>{translations.termOfService}</Text>
          <Entypo
            name="chevron-small-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </LayoutContent>
      </Pressable>
      <Pressable
        onPress={() => handlePress(translations.aboutApplication, "about")}
      >
        <LayoutContent>
          <Text style={styles.textLabel}>{translations.aboutApplication}</Text>
          <Entypo
            name="chevron-small-right"
            color={GLOBAL_COLORS.primaryTextColor}
            size={25}
          />
        </LayoutContent>
      </Pressable>
    </VStack>
  );
};
// **** END: THIRD CONTAINER **** //

// **** START: Nickname MODAL **** //
const NicknameModal = ({ open, setOpen, nickname, setNickname }) => {
  // ** GLOBAL STORE
  const userStoreData = userStore((store) => store);
  const setUserStore = userStore((state) => state.setUserData);
  const { translations } = translationStore((store) => store);
  // ** STORE
  const [newNickname, setNewNickname] = useState(nickname);
  // ** API
  const { putCustomerProfile } = CustomerService();

  const { mutate: mutateAlias } = useMutation(putCustomerProfile, {
    onSuccess: (data) => {
      setUserStore({ ...userStoreData, alias: data.alias });
      setNickname(data.alias);
    },
  });

  const handlePress = () => {
    mutateAlias({
      data: {
        alias: newNickname,
      },
      token: userStoreData.api_token,
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalContent open={open} setOpen={setOpen}>
      <VStack
        position="relative"
        width="3/4"
        backgroundColor="#202833"
        p={5}
        alignItems="center"
        borderRadius={5}
        space={3}
      >
        <Pressable onPress={handleClose} style={styles.closeBtn}>
          <Ionicons
            name="close-outline"
            size={25}
            color={GLOBAL_COLORS.primaryTextColor}
          />
        </Pressable>
        <Text style={styles.bindMobileTitle}>
          {translations.changeUsername}
        </Text>
        <Input
          width="56"
          placeholder={translations.nickname}
          value={newNickname}
          onChangeText={setNewNickname}
          placeholderTextColor={GLOBAL_COLORS.inactiveTextColor}
          style={[styles.textInput, { backgroundColor: "#FFFFFF" }]}
        />
        <Pressable onPress={handlePress}>
          <Text style={styles.confirm}>{translations.confirm}</Text>
        </Pressable>
      </VStack>
    </ModalContent>
  );
};
// **** END: Nickname MODAL **** //

// **** START: Gender MODAL **** //
const GenderModal = ({ open, setOpen, gender, setGender }) => {
  // ** GLOBAL STORE
  const userStoreData = userStore((store) => store);
  const { translations } = translationStore((store) => store);
  // ** STORE
  const [newGender, setNewGender] = useState(gender);
  // ** API
  const { putCustomerProfile } = CustomerService();

  const { mutate: mutateGender } = useMutation(putCustomerProfile, {
    onSuccess: (data) => {
      setGender(data.gender);
    },
  });

  const handlePress = () => {
    mutateGender({
      data: {
        gender: newGender,
      },
      token: userStoreData.api_token,
    });
    setOpen(false);
  };

  const handleChangeGender = (value) => {
    setNewGender(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalContent open={open} setOpen={setOpen}>
      <VStack
        position="relative"
        width="3/4"
        backgroundColor="#202833"
        p={5}
        alignItems="center"
        borderRadius={5}
        space={3}
      >
        <Pressable onPress={handleClose} style={styles.closeBtn}>
          <Ionicons
            name="close-outline"
            size={25}
            color={GLOBAL_COLORS.primaryTextColor}
          />
        </Pressable>
        <Text style={styles.bindMobileTitle}>{translations.chooseGender}</Text>
        <HStack>
          <Pressable onPress={() => handleChangeGender("Male")}>
            <Text
              style={[
                styles.gender,
                {
                  backgroundColor: newGender === "Male" ? "#3C97FF" : "#171E26",
                },
              ]}
            >
              {translations.male}
            </Text>
          </Pressable>
          <Pressable onPress={() => handleChangeGender("Female")}>
            <Text
              style={[
                styles.gender,
                {
                  backgroundColor:
                    newGender === "Female" ? "#F03663" : "#171E26",
                },
              ]}
            >
              {translations.female}
            </Text>
          </Pressable>
        </HStack>
        <Pressable onPress={handlePress}>
          <Text style={styles.confirm}>{translations.confirm}</Text>
        </Pressable>
      </VStack>
    </ModalContent>
  );
};
// **** END: Gender MODAL **** //

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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalContent open={open} setOpen={setOpen}>
      <VStack
        position="relative"
        width="3/4"
        backgroundColor="#202833"
        p={4}
        alignItems="center"
        borderRadius={5}
      >
        <Pressable onPress={handleClose} style={styles.closeBtn}>
          <Ionicons
            name="close-outline"
            size={25}
            color={GLOBAL_COLORS.primaryTextColor}
          />
        </Pressable>
        <Text style={styles.bindMobileTitle}>
          {translations.bindMobilePhone}
        </Text>
        <VStack width="full" my={3}>
          <HStack width="full" position="relative">
            <Input
              placeholder={translations.enterTheMobilePhoneNumber}
              variant="filled"
              backgroundColor="#FFFFFF"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              width="full"
              paddingRight={8}
            />
            <Image source={CoinIcon} style={styles.coinIcon} />
          </HStack>
          <HStack
            width="full"
            alignItems="center"
            mt={2}
            justifyContent="space-between"
          >
            <HStack width="2/3">
              <Input
                placeholder={translations.pleaseEnterSMSCode}
                variant="filled"
                backgroundColor="#FFFFFF"
              />
            </HStack>
            <HStack width="1/3">
              <Pressable style={{ width: "100%" }}>
                <Text style={styles.bindMobileBtn}>
                  {translations.obtainSMSVerification}
                </Text>
              </Pressable>
            </HStack>
          </HStack>
        </VStack>
        <Pressable onPress={handlePress}>
          <Text style={styles.confirm}>{translations.clickToGet}</Text>
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalContent open={open} setOpen={setOpen}>
      <VStack
        position="relative"
        width="3/4"
        backgroundColor="#202833"
        p={4}
        alignItems="center"
        borderRadius={5}
      >
        <Pressable onPress={handleClose} style={styles.closeBtn}>
          <Ionicons
            name="close-outline"
            size={25}
            color={GLOBAL_COLORS.primaryTextColor}
          />
        </Pressable>
        <Text style={styles.bindMobileTitle}>
          {translations.bindInvitationCode}
        </Text>
        <VStack width="full" my={3}>
          <Input
            placeholder={translations.pleaseEnterInvitationCode}
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
          <Text style={styles.confirm}>{translations.toBind}</Text>
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
  const [nicknameModal, setNicknameModal] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [openBindMobileModal, setOpenBindMobileModal] = useState(false);
  const [openBindAccountModal, setOpenBindAccountModal] = useState(false);
  const [succesfulNotification, setSuccessfulNotification] = useState(false);
  // ** API
  const { getCustomerProfile } = CustomerService();

  const { isLoading, isRefetching } = useQuery({
    queryKey: ["MainProfileSettings"],
    queryFn: () => getCustomerProfile(api_token),
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
          nickname={nickname}
          setOpenNickName={setNicknameModal}
          setGenderModal={setGenderModal}
          setOpenBindMobileModal={setOpenBindMobileModal}
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
        <NicknameModal
          open={nicknameModal}
          setOpen={setNicknameModal}
          nickname={nickname}
          setNickname={setNickname}
        />
        <GenderModal
          open={genderModal}
          setOpen={setGenderModal}
          gender={gender}
          setGender={setGender}
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
  },
  textInput: {
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  accountText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: GLOBAL_COLORS.primaryTextColor,
  },
  redBtn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    color: GLOBAL_COLORS.primaryTextColor,
    backgroundColor: "#171E26",
  },
  // ***** MODAL CONTAINER ***** //
  closeBtn: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  bindMobileTitle: {
    color: GLOBAL_COLORS.primaryTextColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  bindMobileBtn: {
    textAlign: "center",
    color: GLOBAL_COLORS.primaryTextColor,
    backgroundColor: "#171E26",
    paddingVertical: 15,
    borderRadius: 5,
    width: "100%",
    // paddingHorizontal: 15,
  },
  confirm: {
    marginTop: 10,
    textAlign: "center",
    color: GLOBAL_COLORS.primaryTextColor,
    paddingVertical: 8,
    borderRadius: 15,
    paddingHorizontal: 45,
    backgroundColor: "#FF644A",
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
  gender: {
    color: GLOBAL_COLORS.primaryTextColor,
    textAlign: "center",
    paddingVertical: 10,
    marginHorizontal: 15,
    borderRadius: 20,
    width: 70,
  },
  coinIcon: {
    position: "absolute",
    height: 25,
    width: 25,
    resizeMode: "contain",
    right: 8,
    top: "50%",
    transform: [{ translateY: -13 }],
  },
});
