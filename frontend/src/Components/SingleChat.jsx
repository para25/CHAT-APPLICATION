import { ChatState } from '../Context/ChatProvider';
import { Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender } from '../config/ChatLogics';
// import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import { useState, useEffect } from 'react';
import { Spinner, FormControl, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import './styles.css'
import ScrollableChat from './ScrollableChat';

// import { head } from '../../../backend/routes/messageRoutes';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const[message, setMessage] = useState([])
    const[loading, setLoading] = useState(false)
    const[newMessage, setNewMessage] = useState("")
    const toast = useToast();


    const { user, selectedChat, setSelectedChat } = ChatState();


    const fecthMessage = async() => {
        if(!selectedChat) return;
        try{
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoading(true)
            const {data} = await axios.get(`http://localhost:3000/api/message/${selectedChat._id}`,
            config);
            console.log(message)
            setMessage(data)
            setLoading(false)
        }catch(error){
            toast({
                title: "Error Occurred",
                description: "Failed to load the Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        }
    }

    useEffect(()=>{
        fecthMessage();
    },[selectedChat])


    const sendMessage = async (event)  => {
        if(event.key==="Enter" && newMessage){
            try{
                const config = {
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const {data} = await axios.post('http://localhost:3000/api/message',{
                    content:newMessage,
                    chatId:selectedChat._id,
                }, config);

                console.log(data)

                setMessage([...message,data])
            }catch(error){
                toast({
                    title: "Error Occurred",
                    description: "Failed to load the Chats",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                  });
            }
        }
    }
    
    const typingHandler = (e)  => {
        setNewMessage(e.target.value)
    }

    return (
    <>
        {selectedChat ? (
            <>
                <Box fontSize={{ base: "28px", md: "30px" }} pb={"3"} px={"2"} w="100%" fontFamily={"Work Sans"} d="flex" justifyContent={{ base: "space-between" }} alignItems={"center"}>
                    <IconButton d={{ base: "flex", md: "none" }} icon={<ArrowBackIcon />} onClick={() => setSelectedChat("")} />
                </Box>
                <Box d="flex" alignItems="center">
                    <Text fontSize="xl" pb={3} px={2} fontFamily="Work Sans" fontWeight="bold">
                        {selectedChat.isGroupChat ? selectedChat.chatName.toUpperCase() : getSender(user, selectedChat.users)} 
                    </Text>
                    {selectedChat.isGroupChat && (
                        <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fecthMessage={fecthMessage}/>
                    )}
                </Box>
                <Box d="flex" height={selectedChat.isGroupChat ? "61.5vh" : "68.5vh"} position="relative">
                <Box d="flex" position="absolute" bottom={0} flexDirection="column" p={3} bg="#E8E8E8" w="100%" borderRadius="lg" overflowY="hidden"
  >
                        {loading ? (
                            <Spinner size={"xl"} w={20} h={20} alignSelf={"center"} margin={"auto"}/> ):( <div className="messages">{
                                <ScrollableChat message={message}/>
                            }</div>
                        )}
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            <Input variant={"filled"} bg={"#E0E0E0"} placeholder="Enter a message" onChange={typingHandler} value={newMessage} />
                        </FormControl>
                    </Box>
                </Box>
            </>
        ) : (
            <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                <Text fontSize="3xl" pb={3} fontFamily="Work Sans">
                    Click on a user to start Chatting
                </Text>
            </Box>
        )}
    </>
);
};

SingleChat.propTypes = {
    fetchAgain: PropTypes.func.isRequired,
    setFetchAgain: PropTypes.func.isRequired,
};

export default SingleChat;
