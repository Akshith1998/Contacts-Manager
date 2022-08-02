import "./Header.css";
import React, { useEffect, useState } from "react";
import Userimg from "../Header/image/unsplash_WNoLnJo7tS8.jpg";
import { useNavigate } from "react-router-dom";

export default function Header({
  isImport,
  isDelete,
  handlesearch,
  contactList,
}) {
  const [searchEmail, setSearchEmail] = useState([]);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlecontactsearch = (e) => {
    setEmail(e.target.value);
    const searchWord = e.target.value;
    const newFilter = contactList.filter((value) => {
      return value.Email.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setSearchEmail([]);
    } else {
      setSearchEmail(newFilter);
    }
  };

  return (
    <>
      <header className="header-container">
        <div
          className={
            isImport.length > 0 || isDelete.length > 0 ? "headerhome" : "header"
          }
        >
          <h2 className="total-contacts">Total Contacts</h2>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search by Email Id...."
              // onKeyUp={searchFunction}
              value={email.Email}
              onChange={(e) => {
                handlecontactsearch(e);
                setSuccess(false);
              }}
              className={
                isImport.length > 0 || isDelete.length > 0
                  ? "headerhome"
                  : "search"
              }
            />
          </div>
          <div className={success ? "searchdisplay" : "searchedEmail"}>
            {searchEmail.length !== 0 &&
              searchEmail.map((contact) => {
                return (
                  <span
                    className="search span"
                    onClick={(e) => {
                      document.querySelector(".search").value = contact.Email;
                      setEmail(contact.Email);
                      handlesearch([contact]);
                      navigate("/search");
                      setSuccess(true);
                    }}
                  >
                    {contact.Email}
                  </span>
                );
              })}
          </div>
          <div className="user-details">
            <img
              className={
                isImport.length > 0 || isDelete.length > 0
                  ? "headerhome"
                  : "userimg"
              }
              src={Userimg}
              alt="userimage"
            ></img>
            <div className="user-name">
              <span id="user-name">Ram Darvin</span>
              <span>Super Admin</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
