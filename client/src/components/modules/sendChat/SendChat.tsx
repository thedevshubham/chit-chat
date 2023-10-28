import { useDispatch, useSelector } from "react-redux";
import { setMessagesInContext } from "../../../redux/actionCreators/chatActionCreators";
import store from "../../../redux/store";
import socket from "../../../socket.io";
import SendInputBox from "../../global/sendInputBox";
import "./sendChat.scss";

type Message = {
  id?: string;
  message: string;
  isUserMessage: boolean;
  time: string;
};

type RootState = ReturnType<typeof store.getState>;

const SendChat = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const userState = useSelector((state: RootState) => state.users);

  const { currentChatUser } = userState;

  const senderId = authState?.user?.id;
  const { id: receiverId } = currentChatUser;

  const handleSendMessage = async (message: string) => {
    const messageObject = {
      senderId,
      receiverId,
      message,
      isUserMessage: false,
      userDetails: {
        ...authState.user,
      },
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    dispatch(setMessagesInContext(receiverId, messageObject));

    socket.emit("send_msg", messageObject);
  };

  return (
    <div className="send_chat_cotainer">
      <SendInputBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default SendChat;
