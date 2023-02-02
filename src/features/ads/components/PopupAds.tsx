import { Dimensions, StyleSheet } from "react-native";

import { Modal } from "native-base";

const PopupAds = ({ open, setOpen, children }) => {
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
      {children}
    </Modal>
  );
};

export default PopupAds;

const styles = StyleSheet.create({});
