import "./Signup.css";
import ellipse1 from "../../Images/Ellipse31.png";
import ellipse2 from "../../Images/Ellipse32.png";
import group1 from "../../Images/Group100.png";
import group2 from "../../Images/Group 695.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);
  const [userexist, setUserexist] = useState(false);
  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://contacts-manager-group4-server.herokuapp.com/user/signup",
        {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data === "Email already exists.") {
          setUserexist(true);
        } else {
          setValidate(true);
        }
      });
  };
  return (
    <div>
      <div className="signPage">
        <img src={ellipse1} alt="" className="ell1" />
        <img src={ellipse2} alt="" className="ell2" />
        <div className="content">
          <img src={group1} alt="" className="grp1" />
          <img src={group2} alt="" className="grp2" />
          <div className="maincontent">
            <h1 className="logoh">LOGO</h1>
            <p>Create New Account</p>
            <form className="finput">
              <input
                type="email"
                className="userid"
                placeholder="User ID"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                min={4}
                max={8}
              />
              <input
                type="password"
                className="pass"
                placeholder="Password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <input
                type="password"
                className="confirm"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
              />
              <button className="signup" onClick={(e) => handlesubmit(e)}>
                Sign Up
              </button>
            </form>
            {validate && (
              <div className="validate">
                <h4>Passwords doesn't match</h4>
              </div>
            )}
            {userexist && (
              <div className="validateuser">
                <h4>User Exists</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
