import React, { FunctionComponent } from "react";
import ReactModal from "react-modal";
import { ReactComponent as CloseIcon } from "../../../assets/images/close.svg";
import "./modal.scss";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  isOpenRight: boolean;
  children: React.ReactNode;
}

const Modal: FunctionComponent<ModalProps> = ({
  isModalOpen,
  onClose,
  isOpenRight,
  children,
}) => {
  if (!isModalOpen) return null;

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      ariaHideApp={isModalOpen}
      className={`modal ${isOpenRight ? "open_right" : "open_left"}`}
    >
      <div className="close_section">
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      {children}
    </ReactModal>
  );
};

export default React.memo(Modal);
