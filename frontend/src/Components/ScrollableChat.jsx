import PropTypes from 'prop-types';
import ScrollableFeed from 'react-scrollable-feed';
import { isSameSender, isLastMessage } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import { Tooltip, Avatar } from '@chakra-ui/react';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    // <ScrollableFeed>
    //   {messages &&
    //     messages.map((message, index) => (
    //       <div style={{ display: 'flex' }} key={message._id}>
    //         {(isSameSender(messages, message, index, user._id) ||
    //           isLastMessage(messages, index, user._id)) && (
    //           <Tooltip label={message.sender.name} placement="bottom-start">
    //             <Avatar
    //               mt="7px"
    //               mr={1}
    //               size="sm"
    //               cursor="pointer"
    //               name={message.sender.name}
    //               src={message.sender.pic}
    //             />
    //           </Tooltip>
    //         )}
    //         <div>{message.text}</div>
    //       </div>
        // ))}
    // </ScrollableFeed>
    
    <ScrollableFeed>
        {messages && messages.map((m,i)=> <div style={{display:"flex"}} key={m._id}>
            {(isSameSender(messages,m,i,user._id)|| 
            isLastMessage(messages,i,user._id)) && (<Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                <Avatar mt={"7px"} mr={"1"} size={"sm"} cursor={"pointer"} name={"m.sender.name"} src={'m.sender.pic'}/>
                </Tooltip>)}
                <span style={{backgroundColor:`${m.sender._id===user._id ? "#BEE3F8" : "#B9F5D0"}`,borderRadius:"20px", padding:"5px 15px", maxWidth:"75%"}}>
                    {m.content}
                </span>
        </div>)}
    </ScrollableFeed>
  );
};

ScrollableChat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      sender: PropTypes.shape({
        name: PropTypes.string.isRequired,
        pic: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default ScrollableChat;
