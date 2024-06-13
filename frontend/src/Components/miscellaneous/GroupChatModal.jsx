import { Box, useDisclosure, Modal, ModalOverlay,  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useToast, FormControl, Input} from '@chakra-ui/react'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import axios from "axios";
// import UserListItem from '../UserAvatar/User ListItem';
// import UserBadgeItem from '../UserAvatar/UserBadgeItem';
// import UserListItem from '../userAvatar/UserListItem';
// import UserBadgeItem from '../userAvatar/UserBadgeItem';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem'

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState();
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const {user, chats, setChats} = ChatState()

    const handleSearch = async (query) => {
        setSearch(query);
        if(!query){
            return
        }
        try {
            setLoading(true)
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} =  await axios.get(`http://localhost:3000/api/user?search=${query}`, config)
            setLoading(false);
            // console.log(data)
            setSearchResult(data)
        } catch (error) {
            toast({
                title: "Error Occurred",
                description: "Failed to load the Search",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
              });
        }
    }

    const handleSubmit = async () => {
        if (!groupChatName || selectedUser.length === 0) { 
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            };
            const { data } = await axios.post(`http://localhost:3000/api/chat/group`, {
                name: groupChatName,
                users: JSON.stringify(selectedUser.map((u) => u._id))
            }, config);
            setChats([data, ...chats])
            onClose()
            toast({
                title: "New Group Created",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
    
        } catch (error) {
            console.log(error)
            toast({
                title: "Failed to create the group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }
    
    
    const handleGroup = (userToAdd) => {
        if (selectedUser.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        setSelectedUser([...selectedUser, userToAdd]); 
    };
    
    const handleDelete = (delUser) => {
        setSelectedUser(selectedUser.filter((sel) => sel._id !== delUser._id)); 
    };

    return (
    <div>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="30px" fontFamily="Work Sans" d="flex" justifyContent="center">Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir={"column"} alignItems={"center "}>
            <FormControl>
                <Input placeholder='Chat Name' mb={"3"} onChange={(e)=>setGroupChatName(e.target.value)}/>
                <Input placeholder='Add Users' mb={"1"} onChange={(e)=>handleSearch(e.target.value)}/>
            </FormControl>
            <Box w={"100%"} d="flex" flexWrap={"wrap"}>
            {selectedUser.map((u) => (
                <UserBadgeItem key={u._id} user={u} handleFunction={()=> handleDelete(u)} />
            ))}
            </Box>


            {loading ? (
                <div>loading</div>
            ):(
            searchResult?.slice(0,4).map((user) => <UserListItem  key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>)
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

GroupChatModal.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GroupChatModal
