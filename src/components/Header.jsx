import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import logout from "../assets/logout.svg";
import logoSmall from "../assets/logo-small.svg";
import title from "../assets/title.svg";
import back from "../assets/back.svg";
import Wrapper from "./Wrapper";

const Header = ({ showLogout, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user: currentUser, setUser } = useContext(UserContext);

  const handleOnClick = () => {
    localStorage.removeItem("USER");
    setUser(null);
    navigate("/login");
  };

  let headerContent = (
    <div className="header-content">
      <img
        className="header-home-photo"
        src={currentUser?.photoURL}
        alt={currentUser}
      />
      <img src={logoSmall} alt={logoSmall} />
      <img src={title} alt={title} />
    </div>
  );

  if (location.pathname !== "/") {
    headerContent = (
      <div className="header-content">
        <button
          type="button"
          className=" flex justify-center align-center pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={back} alt="" />
          <span className="font-white font-bold text-username">
            {user?.username || currentUser?.username}
          </span>
        </button>
        {location.pathname === "/me" && (
          <button
            type="button"
            onClick={handleOnClick}
            className="btn-logout font-bold pointer"
          >
            <span>LOGOUT</span>
            <img src={logout} alt="" className="logout" />
          </button>
        )}
      </div>
    );
  }

  return (
    <header className="header">
      <Wrapper>{headerContent}</Wrapper>
    </header>
  );
};

export default Header;
