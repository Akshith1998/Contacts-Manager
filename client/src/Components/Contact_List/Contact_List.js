import { useEffect, useState } from "react";
import "./Contact_List.css";
import datelogo from "../../Images/date.png";
import vectorlogo from "../../Images/Vector.png";
import deletelogo from "../../Images/delete.png";
import importlogo from "../../Images/import.png";
import exportlogo from "../../Images/export.png";
import downarrow from "../../Images/downarrow.png";
import linelogo from "../../Images/line.png";
import updownlogo from "../../Images/updown.png";
import editlogo from "../../Images/edit.png";
import binlogo from "../../Images/bin.png";
import axios from "axios";
import ImportFile from "../ImportFile/ImportFile";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/sidebar";
import DeleteContacts from "../DeleteContacts/DeleteContacts";
import Paginate from "../Paginate/Paginate";
import { useNavigate } from "react-router-dom";

const ContactList = ({ contactsPresent, handlecontactsPresent }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authorization");
  const [isSearch, setIsSearch] = useState(false);
  const [isImport, setIsImport] = useState("");
  const [isDelete, setIsDelete] = useState("");
  const [contactList, setContactList] = useState([]);
  const [contactdelete, setContactdelete] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(8);
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contactsPresent.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const importfunct = (val) => {
    setIsImport("");
  };
  const deletefunct = (val) => {
    setIsDelete("");
  };
  const handlesearch = (val) => {
    setIsSearch(true);
    handlecontactsPresent(val);
  };
  const handletotal = (val) => {
    setIsSearch(val);
    handlecontactsPresent(contactList);
    navigate("/contacts");
  };
  // console.log(contactdelete);
  useEffect(() => {
    axios
      .get("https://contacts-manager-group4-server.herokuapp.com/contacts", {
        headers: { authorization: authToken },
      })
      .then((contacts) => {
        setContactList(contacts.data);
        if (!isSearch) {
          handlecontactsPresent(contacts.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      id={isImport.length > 0 || isDelete.length > 0 ? "home" : undefined}
      className="containerMain"
    >
      <Header
        isImport={isImport}
        isDelete={isDelete}
        handlesearch={handlesearch}
        contactList={contactList}
      />
      <Sidebar
        isImport={isImport}
        isDelete={isDelete}
        handletotal={handletotal}
      />
      <div
        className={
          isImport.length > 0 || isDelete.length > 0
            ? "transContainer"
            : "main-container"
        }
      >
        <div
          className={
            isImport.length > 0 || isDelete.length > 0 ? "homepage" : "header"
          }
        >
          <div
            className={
              isImport.length > 0 || isDelete.length > 0
                ? "buttontrans first"
                : "button first"
            }
          >
            <img src={datelogo} alt="" />
            <span>Select Date</span>
            <img src={downarrow} alt="" />
          </div>
          <div
            className={
              isImport.length > 0 || isDelete.length > 0
                ? "buttontrans second"
                : "button second"
            }
          >
            <img src={vectorlogo} alt="" />
            <span>Filters</span>
            <img src={linelogo} alt="" />
            <img src={downarrow} alt="" />
          </div>
          <div
            className={
              isImport.length > 0 || isDelete.length > 0
                ? "buttontrans third"
                : "button third"
            }
          >
            <img src={deletelogo} alt="" />
            <span onClick={() => setIsDelete("delete")}>Delete</span>
          </div>
          <div
            className={
              isImport.length > 0 || isDelete.length > 0
                ? "buttontrans third"
                : "button third"
            }
          >
            <img src={importlogo} alt="" />
            <span onClick={() => setIsImport("import")}>Import</span>
          </div>
          <div
            className={
              isImport.length > 0 || isDelete.length > 0
                ? "buttontrans third"
                : "button third"
            }
          >
            <img src={exportlogo} alt="" />
            <span>Export</span>
          </div>
        </div>
        <div
          className={
            isImport.length > 0 || isDelete.length > 0
              ? "transparent"
              : "parentField"
          }
        >
          <div className="contacts">
            <input
              type="checkbox"
              id="checkbox"
              onClick={() => {
                const total = contactList.map((contact) => contact.Email);
                setContactdelete(total);
              }}
            />
            <div className="Name">
              <h3>Name</h3>
            </div>
            <div className="Designation">
              <img src={linelogo} alt="" className="line" />
              <h3>Designation</h3>
              <img src={updownlogo} alt="" className="arrows" />
            </div>
            <div className="Company">
              <img src={linelogo} alt="" className="line" />
              <h3>Company</h3>
              <img src={updownlogo} alt="" className="arrows" />
            </div>
            <div className="Industry">
              <img src={linelogo} alt="" className="line" />
              <h3>Industry</h3>
              <img src={updownlogo} alt="" className="arrows" />
            </div>
            <div className="Email">
              <img src={linelogo} alt="" className="line" />
              <h3>Email</h3>
            </div>
            <div className="Phone">
              <img src={linelogo} alt="" className="line" />
              <h3>PhoneNumber</h3>
            </div>
            <div className="Country">
              <img src={linelogo} alt="" className="line" />
              <h3>Country</h3>
            </div>
            <div className="Action">
              <img src={linelogo} alt="" className="line" />
              <h3>Action</h3>
            </div>
          </div>
        </div>
        <div className="parentfield">
          {currentContacts &&
            currentContacts.map((contact, index) => {
              return (
                <div
                  className={
                    isImport.length > 0 || isDelete.length > 0
                      ? "transfield"
                      : "contacts"
                  }
                >
                  <input
                    type="checkbox"
                    id="checkbox"
                    onClick={(e) => {
                      if (contactdelete.indexOf(contact.Email) > -1) {
                        contactdelete.splice(
                          contactdelete.indexOf(contact.Email),
                          1
                        );
                      } else {
                        setContactdelete((existing) => [
                          ...existing,
                          contact.Email,
                        ]);
                      }
                    }}
                  />
                  <div className="Name">
                    <h4>{contact.Name}</h4>
                  </div>
                  <div className="Designation">
                    <h4>{contact.Designation}</h4>
                  </div>
                  <div className="Company">
                    <h4>{contact.Company}</h4>
                  </div>
                  <div className="Industry">
                    <h4>{contact.Industry}</h4>
                  </div>
                  <div className="Email">
                    <h4>
                      {contact.Email.length > 20
                        ? contact.Email.slice(0, 21) + "...."
                        : contact.Email}
                      {contact.Email.length > 20 && (
                        <span className="tooltip">{contact.Email}</span>
                      )}
                    </h4>
                  </div>
                  <div className="Phone">
                    <h4>{contact.PhoneNumber}</h4>
                  </div>
                  <div className="Country">
                    <h4>{contact.Country}</h4>
                  </div>
                  <div className="Action">
                    <img src={editlogo} alt="" />
                    <img
                      src={binlogo}
                      alt=""
                      onClick={() => {
                        setContactdelete([contact.Email]);
                        setIsDelete("delete");
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        {isImport.length > 0 && <ImportFile importfunct={importfunct} />}
        {isDelete.length > 0 && (
          <DeleteContacts
            contactdelete={contactdelete}
            deletefunct={deletefunct}
          />
        )}
      </div>
      <Paginate
        contactsPerPage={contactsPerPage}
        totalContacts={contactsPresent.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ContactList;
