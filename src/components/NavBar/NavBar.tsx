import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import PhoneNavBar from "components/NavBar/PhoneNavbar/PhoneNavBar";
import NavigationLinksRender from "./NavigationLinksRender/NavigationLinksRender";
import ThemeToggle from "components/themeToggle/themeToggle";

export interface NavigationLink {
  name: string;
  url: string;
  sublinks?: Array<NavigationLink>;
  isMobile?: boolean;
}
const NavBar: React.FC = () => {
  const navigationLinks: Array<NavigationLink> = [
    { name: "Inicio", url: "/" },
  ];


  return (
    <div className="navbar">
      <div className="logoContainer">
        <Link className="navLink" to="/">
          <img className="logo" alt="WebLogo" src={"/FClogoNOBG.png"} />
        </Link>
      </div>
      <nav className="parentNav">
        <ul className="navContainer">
          <NavigationLinksRender
            navigationLinks={navigationLinks}
          ></NavigationLinksRender>
        </ul>
      </nav>
      <div className="mobileMenu">
        <PhoneNavBar navigationLinks={navigationLinks}></PhoneNavBar>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default NavBar;
