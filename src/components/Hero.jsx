import React from "react";

const Hero = ({ user }) => {
  return (
    <div className="hero">
      <div className="flex justify-center align-center flex-column">
        <img
          className="image-profile"
          src={user?.photoURL}
          alt="ericka-profile"
        />
        <h3
          style={{ backgroundColor: user?.color }}
          className="font-bold username-profile"
        >
          {user?.username}
        </h3>
      </div>
    </div>
  );
};

export default Hero;
