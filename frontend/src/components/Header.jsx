import { useState } from "react";
import "./header.scss";
import hamburguerIcon from "/images/header/img-hamb.svg";
import crossIcon from "/images/header/img-cross.svg";
import accountIcon from "/images/header/img-account.svg";
import searchIcon from "/images/header/img-search.svg";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import axios from "../utils/axios";
import { Alert, Stack } from "@mui/material";

export default function Header() {
  const [active, setActive] = useState(true);
  const [showAlertLogout, setShowAlertLogout] = useState(false);
  const {auth, setAuth} = useAuth();

  const navigate = useNavigate();

  const handleToggle = () => {
    setActive(!active);
  };

  const handleLogout = async ()=>{
    try {
      const response = await axios.get("/logout");
      console.log("Se ejecutó handleLogout");
      console.log(response.data);
      setAuth(null);
      setShowAlertLogout(true);
      setTimeout(()=>{
        setShowAlertLogout(false)
      }, 2000);
      
    } catch (error) {
      console.log(error.message);
    }
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
            <div className="header__container_logo" onClick={()=> navigate("/")}>
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
            {auth?.username &&
            <Link className="header__toogle-links" onClick={handleLogout}>
              Logout
            </Link>
            }
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
      {showAlertLogout && (
        <Stack className="alert_container">
          <Alert
            sx={{ maxWidth: "100%", minWidth: "100%" }}
            severity="success"
            variant="filled"
          >
            You are logout!
          </Alert>
        </Stack>
      )}
    </>
    
  );
}
