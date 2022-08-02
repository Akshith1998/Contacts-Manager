import React from "react";
import "./sidebar.css";
import Dashboardicon from "../Sidebar/images/Vector (2).png";
import TotalContacts from "../Sidebar/images/Vector (3).png";
import LogoutIcon from "../Sidebar/images/Vector (4).png";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isImport, isDelete, handletotal }) {
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.setItem("authorization", "");
    navigate("/");
  };
  const handletotalcont = (e) => {
    handletotal(false);
    navigate("/contacts");
    window.location.reload();
  };
  return (
    <div className="cont">
      <div
        className={
          isImport.length > 0 || isDelete.length > 0 ? "sidehome" : "sidebar"
        }
      >
        <p className="logo">Logo</p>
        <div>
          <span>
            <img
              className="dashboard-icon"
              src={Dashboardicon}
              alt="dashboardicon"
            />
          </span>
          <span className="dashboard">Dashboard</span>
        </div>
        <button
          className={
            isImport.length > 0 || isDelete.length > 0
              ? "buttontransparent"
              : "contactButton"
          }
          onClick={(e) => handletotalcont(e)}
        >
          <img
            id="contacts-icon"
            src={TotalContacts}
            alt="Total-contacts-img"
          ></img>
          <p id="total-contacts">Total Contacts</p>
        </button>
        <img
          className="logout-icon"
          src={LogoutIcon}
          alt="logot-icon"
          onClick={handlelogout}
        ></img>
        <p className="logout-option" onClick={handlelogout}>
          Logout
        </p>
      </div>
    </div>
  );
}
