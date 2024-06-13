import { useDisclosure } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { ViewIcon } from "@chakra-ui/icons";
import { Modal, Image, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, IconButton } from '@chakra-ui/react';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent d="flex" flexDir={"column"} alignItems={"center"}>
          <ModalHeader fontSize={"40px"} fontFamily={"Work Sans"} d={"flex"} justifyContent={"center"}>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image borderRadius={"full"} boxSize={"150px"} src={user.pic} alt={user.name} />
            <p>{user.email}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

ProfileModal.propTypes = {
  children: PropTypes.node, // Children are optional
  user: PropTypes.shape({ // User should be an object with specific shape
    name: PropTypes.string.isRequired,
    pic: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired
};

export default ProfileModal;
