import React, { useEffect, useRef, useState } from "react";
import "./PhoneNavBar.scss";
import { NavigationLink } from "../NavBar";
import NavButton from "../NavButton/NavButton";
import PhoneMenuButton from "./components/PhoneMenuButton/PhoneMenuButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  navigationLinks: NavigationLink[];
}
const PhoneNavBar: React.FC<Props> = (props: Props) => {
  const [isPhoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const { navigationLinks } = props;
  const closeMenu = () => {
    setPhoneMenuOpen(false);
  };

  const toggleMenu = () => {
    setPhoneMenuOpen(!isPhoneMenuOpen);
  };

  const phoneNavBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        phoneNavBarRef.current &&
        !phoneNavBarRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    if (isPhoneMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPhoneMenuOpen]);

  return (
    <div className="navbar">
      <PhoneMenuButton toggleMenu={toggleMenu}></PhoneMenuButton>
      <nav
        ref={phoneNavBarRef}
        className={`${isPhoneMenuOpen ? "active-menu" : ""} menu`}
      >
        <ul className="navContainer">
          <div className="mobileNav">
            <span className="mobileNav__closeButton">
              <FontAwesomeIcon className="navPhoneCloseButton" icon={faXmark} onClick={closeMenu} />
            </span>
            {navigationLinks.map((link: NavigationLink, index: number) => {
              return (
                <NavButton link={link} toggleMenu={toggleMenu}></NavButton>
              );
            })}

          </div>
        </ul>
      </nav>
    </div>
  );
};
export default PhoneNavBar;
