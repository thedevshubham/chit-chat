import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ReactComponent as Dots } from "../../../assets/images/dots-vertical-svgrepo-com.svg";
import {
  fetchUsersFailure,
  fetchUsersRequest,
  setChatUsers,
  setCurrentChatUser,
  setOnlineUsers,
} from "../../../redux/actionCreators/userActionCreators";
import store from "../../../redux/store";
import usersService from "../../../services/usersService";
import socket from "../../../socket.io";
import Button from "../../global/button";
import ContactChip from "../../global/contactChip";
import Input from "../../global/input";
import Menu from "../../global/menu";
import Search from "../../global/search";
import { logout } from "../../utils";
import "./sidebar.scss";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
}

interface SidebarProps {
  hanldeModalClose?: () => void;
}

interface MenuItem {
  id: string;
  name: string;
}

type RootState = ReturnType<typeof store.getState>;

const menuList = [{ id: "logout", name: "Logout" }];

const Sidebar: React.FC<SidebarProps> = ({ hanldeModalClose }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const userState = useSelector((state: RootState) => state.users);

  const { user } = authState || {};

  const {
    firstName: adminFirstName = undefined,
    gender: adminGender = undefined,
  } = user || {};

  const users: User[] = userState.users;
  const { currentChatUser, onlineUsers } = userState;

  const contactsSectionRef = useRef<HTMLDivElement | null>(null);
  const [contacts, setContacts] = useState<User[]>([]);
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // scrollToContactsSection();
    observeOnlineUsers();
    observeNewUsers();

    return () => {
      socket.off("onlineUsers");
      socket.off("user-added");
    };
  }, [users]);

  useEffect(() => {
    if (user) {
      getUsers();
    }
  }, [user]);

  const observeNewUsers = () => {
    socket.on("user-added", ({ senderId, receiverId, user }) => {
      dispatch(setChatUsers([...users, user]));
      setContacts([...users, user]);
    });
  };

  const scrollToContactsSection = () => {
    if (contactsSectionRef.current) {
      contactsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const observeOnlineUsers = () => {
    socket.on("onlineUsers", (onlUsrs) => {
      dispatch(setOnlineUsers(onlUsrs));
    });
  };

  const getUsers = useCallback(async () => {
    dispatch(fetchUsersRequest());

    try {
      const { data } = await usersService.getUsers();

      dispatch(setChatUsers(data.users));
      setContacts(data.users);
    } catch (error) {
      console.error(error);
      dispatch(fetchUsersFailure("Fetch failed."));
    }
  }, [dispatch, setContacts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value;

    if (searchVal) {
      setContacts(users.filter((user) => user.firstName.startsWith(searchVal)));
    } else {
      setContacts(users);
    }
  };

  const handleContactClick = (userObj: any) => {
    dispatch(setCurrentChatUser(userObj));
    hanldeModalClose && hanldeModalClose();
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.id === "logout") {
      logout();
    }
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleEnterEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setNewUserEmail(email);
  };

  const handleDotsClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUserAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchUsersRequest());

    try {
      const { data, status } = await usersService.addUser({
        email: newUserEmail,
      });

      if (status === 200) {
        setNewUserEmail("");
        toast.success(`${data.user.firstName} added successfully.`);
        getUsers();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <aside className="sidebar">
      <div className="fixed_top_section">
        <section className="admin_section">
          <div className="menu_container">
            <Dots onClick={handleDotsClick} />
          </div>
          <Menu
            isOpen={isMenuOpen}
            list={menuList}
            onItemClick={handleMenuItemClick}
            onClose={handleMenuClose}
          />
          <div className="admin_name">
            <ContactChip
              customClass={"without-card"}
              gender={adminGender}
              name={adminFirstName}
            />
          </div>
        </section>
        <section className="new_user_section_form">
          <form onSubmit={handleUserAdd}>
            <div className="new_user_section">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={newUserEmail}
                onChange={handleEnterEmail}
                required
              />
              <Button text="Add" type="submit" />
            </div>
          </form>
        </section>
        <section className="search_section">
          <Search placeholder="Search..." onChange={handleSearch} />
        </section>
      </div>
      <section className="contacts_section" ref={contactsSectionRef}>
        {contacts.map((item) => {
          const { id, gender, firstName } = item;
          return (
            <ContactChip
              key={id}
              id={id}
              gender={gender.toLowerCase()}
              isOnline={onlineUsers?.includes(id)}
              name={firstName}
              customClass={`scroll-card ${
                currentChatUser?.id === id && "active"
              }`}
              onContactClick={handleContactClick}
              item={item}
            />
          );
        })}
      </section>
    </aside>
  );
};

export default React.memo(Sidebar);
