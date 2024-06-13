import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const ChatContext = createContext()

const ChatProvider = ({children})=>{
    const [user,setUser] = useState()
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])

    const navigate = useNavigate();


    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo)

        if(!userInfo){
            navigate("/")
        }
    },[navigate])

    return (
        <ChatContext.Provider value={{user,setUser, selectedChat, setSelectedChat, chats, setChats}}>{children}</ChatContext.Provider>
        );
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ChatState = () => {
    return (
        useContext(ChatContext)
    )
}


export default ChatProvider;