import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Input, Button, Text, Menu, MenuButton, Avatar, MenuList, MenuDivider, MenuItem, Drawer, DrawerOverlay, DrawerHeader, DrawerContent, DrawerBody } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from 'react-router-dom';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from "react";
import axios from 'axios';
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false); // Initialize loadingChat state
  // const [chats, setChats] = useState([]); // Initialize chats state

  const navigate = useNavigate();
  const { user, setSelectedChat } = ChatState();
  const {chats, setChats} = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSearch = async () => {
    try {
      if (!search) {
        toast({
          title: "Please Enter Something",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        }); 
        return;
      }

      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get(`http://localhost:3000/api/user?search=${search}`, config);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = {
        headers:{
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.post(`http://localhost:3000/api/chat`,{userId}, config);
      if(!chats.find((c)=> c._id === data._id))setChats([data, ...chats])
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Fetching Chat",
        description: `${error.message} 'from sidedrawer`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  return (
    <>
      <Box bg="white" w="100%" p="5px 10px" borderWidth="5px">
        <Flex justifyContent="space-between" alignItems="center">
          <Button variant="ghost" title="Search User to Chat" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">Search User</Text>
          </Button>
          <Text fontSize="2xl" fontFamily="Work sans" textAlign="center" flex="1">Chat Application</Text>
          <Menu>
            <MenuButton p={1} title="Notifications" fontSize={"2xl"}><BellIcon /></MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size={'sm'} cursor={"pointer"} name={user.name} src={user.name} style={{backgroundColor:"black"}}/>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input placeholder="Search by name" mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map(user => (
                <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex"/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
