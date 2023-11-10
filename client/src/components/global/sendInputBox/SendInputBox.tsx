import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as SendIcon } from "../../../assets/images/send-svgrepo-com.svg";
import store from "../../../redux/store";
import socket from "../../../socket.io";
import "./sendInputBox.scss";

interface SendInputProps {
  onSendMessage: (message: string) => void;
}

type RootState = ReturnType<typeof store.getState>;

const SendInputBox: React.FC<SendInputProps> = ({ onSendMessage }) => {
  const authState = useSelector((state: RootState) => state.auth);
  const chatState = useSelector((state: RootState) => state.chat);
  const userState = useSelector((state: RootState) => state.users);

  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  let typingTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);

      socket.emit("user_typing", {
        senderId: authState?.user?.id,
        receiverId: userState?.currentChatUser?.id,
      });
    } else {
      clearTimeout(typingTimeout as NodeJS.Timeout);
    }

    // Set a new timeout to detect when the user has stopped typing
    typingTimeout = setTimeout(() => {
      setIsTyping(false);

      socket.emit("user_stopped_typing", {
        senderId: authState?.user?.id,
        receiverId: userState?.currentChatUser?.id,
      });
    }, 1000);
  };

  const handleSendClick = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent
  ) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick(e);
    }
  };

  return (
    <div className="sendbox_container">
      <div className="send_input">
        <form onSubmit={handleSendClick}>
          <div className="text_container">
            <textarea
              placeholder="Type a message..."
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={message.trim() === ""}
            className={`${message.trim() === "" && "disabled"}`}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendInputBox;
