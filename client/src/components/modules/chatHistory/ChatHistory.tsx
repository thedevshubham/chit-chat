import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import store from "../../../redux/store";
import MessageChip from "../../global/messageChip";
import "./chatHistory.scss";

type RootState = ReturnType<typeof store.getState>;

const ChatHistory = () => {
  const chatState = useSelector((state: RootState) => state.chat);
  const userState = useSelector((state: RootState) => state.users);
  const authState = useSelector((state: RootState) => state.auth);

  const { chatHistory } = chatState;
  const { currentChatUser } = userState;
  const { user } = authState;

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToLatestMessage();
  }, [chatHistory]);

  const scrollToLatestMessage = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="chat_history" ref={chatContainerRef}>
      {chatHistory[currentChatUser?.id]?.map((msg: any, index) => (
        <div
          className={`message_chip_container ${
            msg?.userDetails?.id !== user?.id && "user_chip"
          }`}
          key={`${msg?.time}${index}`}
        >
          <MessageChip
            message={msg?.message}
            isUserMessage={msg?.userDetails?.id !== user?.id}
            time={msg?.time}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
