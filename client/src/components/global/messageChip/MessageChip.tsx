import React from "react";
import "./messageChip.scss";

interface MessageProps {
  message: string;
  time: string;
  isUserMessage?: boolean;
}

const MessageChip: React.FC<MessageProps> = ({
  message,
  time,
  isUserMessage,
}) => {
  return (
    <div className={`message ${isUserMessage ? "user_message" : ""}`}>
      <div className="message_bubble">{message}</div>
      <div className="message_time">{time}</div>
    </div>
  );
};

export default MessageChip;
