import "./Login.css";
import ellipse1 from "../../Images/Ellipse31.png";
import ellipse2 from "../../Images/Ellipse32.png";
import group1 from "../../Images/Group100.png";
import group2 from "../../Images/Group 695.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);
  const handlenavigate = (e) => {
    e.preventDefault();
    navigate("/signup");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://contacts-manager-group4-server.herokuapp.com/user/login", {
        email: email,
        password: password,
      })
      .then((loginData) => {
        localStorage.setItem("authorization", loginData.data.token);
        navigate("/contacts");
      })
      .catch((err) => {
        setCheck(false);
        console.log(err);
      });
  };
  return (
    <div className="loginPage">
      <img src={ellipse1} alt="" className="ellipse1" />
      <img src={ellipse2} alt="" className="ellipse2" />
      <div className="content">
        <img src={group1} alt="" className="group1" />
        <img src={group2} alt="" className="group2" />
        <div className="mainContent">
          <h1 className="logoh1">LOGO</h1>
          <p>Enter your credentials to access your account</p>
          <form className="forminput">
            <input
              type="email"
              className="userId"
              placeholder="User ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signIn" onClick={(e) => handleLogin(e)}>
              Sign In
            </button>
            <button className="SignUp" onClick={(e) => handlenavigate(e)}>
              Sign Up
            </button>
          </form>
          {!check && (
            <div className="credentials">
              <h4>Email and password doesn't match</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
