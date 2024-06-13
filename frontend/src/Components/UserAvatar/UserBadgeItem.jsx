import { Box } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';


const UserBadgeItem = ({ user, handleFunction }) => { // Destructure props object to access user and handleFunction
  return (
    <div>
      <Box px={2} py={1} borderRadius={"lg"} m={1} mb={2} variant="solid" fontSize={12} backgroundColor="purple" color={"white"} cursor={"pointer"} onClick={handleFunction}>
        {user.name}
        <CloseIcon pl={1} />
      </Box>
    </div>
  );
};


UserBadgeItem.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        pic: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
      }).isRequired,
    handleFunction: PropTypes.func.isRequired
};

export default UserBadgeItem;
