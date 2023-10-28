import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as DrawerIcon } from "../../../assets/images/app-menu-svgrepo-com.svg";
import store from "../../../redux/store";
import socket from "../../../socket.io";
import ContactChip from "../../global/contactChip";
import Modal from "../../global/modal/Modal";
import Sidebar from "../sidebar";
import "./header.scss";

type RootState = ReturnType<typeof store.getState>;

const Header = () => {
  const userState = useSelector((state: RootState) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { currentChatUser, onlineUsers } = userState;

  useEffect(() => {
    observeTypingEvent();

    return () => {
      socket.off("user_typing");
    };
  }, []);

  const handleAppMenuClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const observeTypingEvent = () => {
    socket.on("user_typing", () => {
      setIsTyping(true);
    });

    socket.on("user_stopped_typing", () => {
      setIsTyping(false);
    });
  };

  return (
    <div className="header">
      <div className="drawer_icon" onClick={handleAppMenuClick}>
        <DrawerIcon />
      </div>
      {currentChatUser && (
        <ContactChip
          gender={currentChatUser.gender}
          isOnline={onlineUsers?.includes(currentChatUser?.id)}
          name={`${currentChatUser.firstName} ${currentChatUser.lastName}`}
          customClass={"without-card"}
          isTyping={isTyping}
        />
      )}
      {isModalOpen && (
        <Modal
          isModalOpen
          onClose={handleClose}
          isOpenRight={false}
          children={<Sidebar />}
        />
      )}
    </div>
  );
};

export default Header;
