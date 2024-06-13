import { ChatState } from "../src/Context/ChatProvider";
import {Box} from "@chakra-ui/layout"
import SideDrawer from "../src/Components/miscellaneous/SideDrawer";
import MyChats from "../src/Components/MyChats";
import ChatBox from "../src/Components/ChatBox";
import { Flex, Spacer } from '@chakra-ui/react'
import { useState } from "react";

const ChatPage = () => {
  const {user} = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false)


  return (
    <div style={{width:'100%'}}>
      {user && <SideDrawer/>}
      <Flex>
      <Box  p='2' w={"20%"} h={"80%"}>
        {user && <MyChats fetchAgain={fetchAgain} />}
      </Box>
        <Spacer />
      <Box p='2' w={"60%"} bg=''>
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
      </Flex>
    </div>
  );
};

export default ChatPage;


// http://localhost:3000/api/chats