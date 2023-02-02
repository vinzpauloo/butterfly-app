import { Modal } from "native-base";

const CustomModal = ({ open, setOpen, children }) => {
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
      {children}
    </Modal>
  );
};

export default CustomModal;
