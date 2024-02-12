import { useState } from "react";
import "./header.scss";
import hamburguerIcon from "../images/header/img-hamb.svg";
import crossIcon from "../images/header/img-cross.svg";
import accountIcon from "../images/header/img-account.svg";
import searchIcon from "../images/header/img-search.svg";
import { Link } from "react-router-dom";

export default function Header() {
  const [active, setActive] = useState(true);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <>
      <header className="header">
        <div className="header__menu">
          <div className="header__menuLeft">
            <div className="header__icon" onClick={handleToggle}>
              {active ? (
                <span className="header__icon--ham">
                  <img src={hamburguerIcon} alt="Hamburg menu icon" />
                </span>
              ) : (
                <span className="header__icon--cross">
                  <img src={crossIcon} alt="Cross menu icon" />
                </span>
              )}
            </div>
            <div className="header__container_logo">
              <div className="header__H">
                <span>H</span>
              </div>
              <div className="header__HB">
                <span className="header__HM-hotel">HOTEL</span>
                <span className="header__HM-blink">BLINK</span>
              </div>
            </div>
          </div>
          <div className={`header__toogle ${!active ? "isActive" : ""}`}>
            <Link to="./about" className="header__toogle-links">
              About Us
            </Link>
            <Link to="./rooms-grid" className="header__toogle-links">
              Rooms
            </Link>
            <Link to="./offers" className="header__toogle-links">
              Offers
            </Link>
            <Link to="./contact" className="header__toogle-links">
              Contact
            </Link>
          </div>
          <div className="header__menuRight">
            <a href="../login">
              <img src={accountIcon} alt="Account icon" />
            </a>
            <a href="../rooms-grid">
              <img src={searchIcon} alt="Search icon" />
            </a>
          </div>

          
          
        
        </div>
      
      </header>
    </>
  );
}
