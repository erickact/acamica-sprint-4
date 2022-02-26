import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import logout from "../assets/logout.svg";
import back from "../assets/back.svg";

const Header = ({ showLogout }) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const handleOnClick = () => {
    localStorage.removeItem("USER");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <div className="header">
        <button type="button" className=" flex justify-center align-center">
          <img src={back} alt="" />
          <span className="font-white font-bold text-username">USERNAME</span>
        </button>
        {showLogout && user && (
          <button
            type="button"
            onClick={handleOnClick}
            className="btn-logout font-bold"
          >
            <span>LOGOUT</span>
            <img src={logout} alt="" className="logout" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
