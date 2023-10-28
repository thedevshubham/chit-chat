import React from "react";
import { ReactComponent as FemaleAvatar } from "../../../assets/images/undraw_female_avatar_efig.svg";
import { ReactComponent as MaleAvatar } from "../../../assets/images/undraw_male_avatar_g98d.svg";
import { GENDER_TYPE } from "../../constants";
import "./contactChip.scss";

interface ContactChipProps {
  avatar?: string;
  gender: string;
  isOnline?: boolean;
  name: string;
  customClass?: string;
  time?: string;
  onContactClick?: (id: any) => void;
  id?: string;
  item?: object;
  isTyping?: boolean;
}

const ContactChip: React.FC<ContactChipProps> = ({
  avatar,
  gender,
  isOnline,
  name,
  customClass,
  time,
  id,
  item,
  isTyping,
  onContactClick,
}) => {
  const renderAvatar = () => {
    if (avatar) {
      return <img src={avatar} alt="avatar" />;
    }
    return gender?.toLowerCase() === GENDER_TYPE.MALE ? (
      <MaleAvatar />
    ) : (
      <FemaleAvatar />
    );
  };

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick(item);
    }
  };

  return (
    <div className={`contact_chip ${customClass}`} onClick={handleContactClick}>
      <div className="avatar_container">
        {renderAvatar()}
        {typeof isOnline === "boolean" && (
          <div
            className={`online_indicator ${isOnline ? "online" : "offline"}`}
          />
        )}
      </div>
      <div className={`description ${isTyping && `description_typing`}`}>
        <div className="name">{name}</div>
        {time && <div className="time">{time}</div>}
        {isTyping && <div className="typing_text">Typing...</div>}
      </div>
    </div>
  );
};

export default ContactChip;
