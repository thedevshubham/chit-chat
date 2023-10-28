import React, { useEffect, useRef } from "react";
import "./menu.scss";

interface MenuItem {
  id: string;
  name: string;
}

interface MenuProps {
  isOpen: boolean;
  list: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, list, onItemClick, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`menu ${isOpen ? "open" : ""}`} ref={menuRef}>
      {list.map((item) => (
        <div
          className="menu-item"
          key={item.id}
          onClick={() => onItemClick(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Menu;
