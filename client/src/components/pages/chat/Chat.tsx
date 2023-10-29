import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllMessagesInContext,
  setMessagesInContext,
} from "../../../redux/actionCreators/chatActionCreators";
import store from "../../../redux/store";
import socket from "../../../socket.io";
import ChatHistory from "../../modules/chatHistory";
import Header from "../../modules/header";
import NoUser from "../../modules/noUser";
import SendChat from "../../modules/sendChat";
import Sidebar from "../../modules/sidebar";
import { initSocketConnection } from "../../utils";
import "./chat.scss";

type RootState = ReturnType<typeof store.getState>;

const Chat = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state: RootState) => state.auth);
  const userState = useSelector((state: RootState) => state.users);

  const { currentChatUser } = userState;
  const { user } = authState;

  useEffect(() => {
    if (user?.id) {
      initSocketConnection(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    loadChatHistory();

    return () => {
      socket.off("all_messages");
    };
  }, [user?.id]);

  useEffect(() => {
    observeReceiveMessages();

    return () => {
      socket.off("receive_msg");
    };
  }, []);

  const observeReceiveMessages = () => {
    socket.on("receive_msg", (payload) => {
      const {
        senderId,
        receiverId,
        message,
        isUserMessage,
        userDetails,
        time,
      } = payload;

      dispatch(setMessagesInContext(senderId, payload));
    });
  };

  const loadChatHistory = () => {
    socket.emit("all_messages", {
      senderId: user?.id,
    });

    // Listen for chat history from the server
    socket.on("all_messages", ({ senderId, messages }) => {
      console.log(messages, "ALL MSGS");
      if (messages) {
        dispatch(setAllMessagesInContext(messages));
      }
    });
  };

  return (
    <div className="chat_container">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <div className="right_content_wrapper">
          {currentChatUser ? (
            <>
              <Header />
              <ChatHistory />
              <SendChat />
            </>
          ) : (
            <>
              <Header />
              <NoUser />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chat);
