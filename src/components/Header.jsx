import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const handleOnClick = () => {
    localStorage.removeItem("USER");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <button onClick={handleOnClick} className="">
          LOGOUT
        </button>
      ) : (
        <Link to="/login">LOGIN</Link>
      )}
    </div>
  );
};

export default Header;
