import "./ImportFile.css";
import { useEffect, useRef, useState } from "react";
import { parse } from "papaparse";
import importlogo from "../../Images/Group.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ImportFile = ({ importfunct }) => {
  const authToken = localStorage.getItem("authorization");
  const [contacts, setContacts] = useState([]);
  const componentRef = useRef();
  useEffect(() => {
    axios({
      url: "https://contacts-manager-group4-server.herokuapp.com/contacts",
      headers: {
        authorization: authToken,
      },
      method: "POST",
      data: {
        contacts: contacts,
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [contacts]);
  useEffect(() => {
    const refreshPage = () => {
      window.location.reload(false);
      importfunct("");
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current;
        if (!ref.contains(e.target)) {
          refreshPage();
        }
      }
    }
  }, []);
  return (
    <div className="File">
      {contacts.length === 0 && (
        <div
          className="importfile"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            Array.from(e.dataTransfer.files)
              .filter((file) => file.type === "text/csv")
              .forEach(async (file) => {
                const text = await file.text();
                const result = parse(text, { header: true });
                setContacts((existing) => [...existing, ...result.data]);
              });
          }}
        >
          <img src={importlogo} alt="" />
          <span className="instruction">Import File</span>
          <span className="drag">Drag & Drop a CSV File to Upload</span>
          <button className="cancel" onClick={() => importfunct("")}>
            Cancel
          </button>
        </div>
      )}
      {contacts.length > 0 && (
        <div className="importcomplete" ref={componentRef}>
          <img src={importlogo} alt="" />
          <span className="import_instr">Import Complete</span>
          <span className="upload">CSV File is Uploaded</span>
        </div>
      )}
    </div>
  );
};

export default ImportFile;
