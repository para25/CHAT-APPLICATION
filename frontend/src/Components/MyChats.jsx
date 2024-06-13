import { useEffect, useState } from "react";
import axios from "axios";
import { useToast, Box, Button, Stack, Text  } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import PropTypes from 'prop-types';


const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const {chats, setChats} = ChatState();
  const {selectedChat, setSelectedChat} = ChatState(); 
  const {user} = ChatState()
  const toast = useToast();

  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("http://localhost:3000/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setLoggedUser(storedUser);
      // console.log("Logged User:", storedUser);
    }
    fetchChat();
  }, [fetchAgain]); 

  return (
    <div>
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir={"column"}
        alignItems={"center"}
        p={3}
        bg={"white"}
        w={{ base: "175%", md: "175%" }}
        // width={"80vh"}
        // h={"80vh"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Box pb={3} px={3} fontSize={{base:"28px", md:"30px"}} fontFamily={"Work Sans"} d="flex" w="100%" justifyContent={"space-between"} alignItems={"center"}>
        My Chats
        <GroupChatModal>
          <Button d="flex" fontSize={{base:"15px", md:"15px", lg:"15px"}} rightIcon={<AddIcon />}>New Group Chat</Button>
        </GroupChatModal>
        </Box>
      </Box>
      <Box d="flex" flexDir={"column"} p={3} bg={"#F8F8F8"} w="175%" h="90vh" borderRadius={"lg"} overflowY={"hidden"}>
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat)=>(
              <Box key={chat._id} onClick={() => { setSelectedChat(chat)} } cursor={"pointer"} bg={selectedChat===chat? "#38B2AC":"#E8E8E8"} color={selectedChat===chat ? "white":"black"} px={3} py={2} borderRadius={"lg"}>
                <Text>
                  {!chat.isGroupChat ? getSender(loggedUser, chat.users):chat.chatName}
                </Text>
              </Box>
            ))}
      </Stack>
        ):(
          <ChatLoading />
      )}
      </Box>
      
    </div>
  );
};


MyChats.propTypes = {
  fetchAgain: PropTypes.node.isRequired,
};

export default MyChats;
