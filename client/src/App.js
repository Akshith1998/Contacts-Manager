import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactList from "./Components/Contact_List/Contact_List";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Protected from "./Components/Protected_Route/Protected";
import { useState } from "react";

function App() {
  const [contactsPresent, setContactsPresent] = useState([]);
  const handlecontactsPresent = (val) => {
    setContactsPresent(val);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/contacts"
            element={
              <Protected>
                <ContactList
                  contactsPresent={contactsPresent}
                  handlecontactsPresent={handlecontactsPresent}
                />
              </Protected>
            }
          />
          <Route
            path="/search"
            element={
              <Protected>
                <ContactList
                  contactsPresent={contactsPresent}
                  handlecontactsPresent={handlecontactsPresent}
                />
              </Protected>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
