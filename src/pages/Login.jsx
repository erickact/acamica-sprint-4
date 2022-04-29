import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import google from "../assets/google.png";
import lorem from "../assets/lorem.png";
import { UserContext } from "../contexts/UserContext";
import useAuthentication from "../hooks/useAuthentication";

const COLORS = [
  "#F50D5A",
  "#FF865C",
  "#FFEA5C",
  "#00DA76",
  "#0096CE",
  "#800FFF",
];

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [form, setForm] = useState({ username: "", color: "white" });

  const { loginSocial } = useAuthentication();

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    const newUser = { ...user, ...form };
    setUser(newUser);
    localStorage.setItem("USER", JSON.stringify(newUser));
    // react router me deja moverme entre rutas: navego al Home (el path tiene que ser el mismo)
    navigate("/");
  };

  return (
    <div className="flex justify-center align-center min-h-screen">
      <div className="px-32 flex align-center justify-center flex-1">
        <img className="max-w-400" src={logo} alt="logo" />
      </div>

      <div className="font-white px-32 flex align-center justify-center flex-1">
        <div className="max-w-400">
          {user ? (
            <form onSubmit={handleOnSubmit} className="container-login">
              <div className="font-heading text-40 mb-32">
                <h2>WELCOME</h2>
                <h2 style={{ color: form.color }}>{user.displayName}!</h2>
              </div>
              <div className="mb-32">
                <label htmlFor="username"></label>
                <input
                  className="bg-black p-18 font-white text-24"
                  type="text"
                  id="username"
                  placeholder="Type you username"
                  name="username"
                  value={form.username}
                  onChange={handleOnChange}
                />
              </div>
              <p className="mb-22 text-24">Select your favorite color</p>
              <div className="flex mb-32">
                {COLORS.map((color) => {
                  return (
                    <div key={color} className="options-colors">
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        onChange={handleOnChange}
                      />
                      <div style={{ backgroundColor: color }}></div>
                    </div>
                  );
                })}
              </div>
              <button className="btn-primary" type="submit">
                CONTINUE
              </button>
              <p className="copyright-2">
                &#169; 2020 Devs_United - <span className="beta">BETA</span>{" "}
              </p>
            </form>
          ) : (
            <div className="container-login">
              {/* <h1 className="font-heading mb-32">LOREM IPSUM DOLOR</h1> */}
              <img src={lorem} className="mb-32" alt="lorem" />
              <p className="mb-32 text-24">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <button type="button" onClick={loginSocial}>
                <img width="400" src={google} alt="google" />
              </button>
              <p className="copyright-1">
                &#169; 2020 Devs_United - <span className="beta">BETA</span>{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
