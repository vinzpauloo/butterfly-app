import { Modal } from "native-base";

const CustomModal = ({ open, setOpen, children }) => {
  return (
    <Modal mt="auto" mb="auto" h={400} closeOnOverlayClick isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
      {children}
    </Modal>
  );
};

export default CustomModal;
