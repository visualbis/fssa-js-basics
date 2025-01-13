import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import api from "../api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${random}`;
  }

  const retrievedContacts = async () => {
    try {
      const response = await api.get("/contacts");
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: generateUniqueId(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    try {
      const response = await api.put(`/contacts/${contact.id}`, contact);
      const updatedContact = response.data;
      setContacts((prevContacts) => {
        return prevContacts.map((c) =>
          c.id === updatedContact.id ? updatedContact : c
        );
      });
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const removeContactHandler = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to remove this contact?"
    );
    if (userConfirmed) {
      await api.delete(`/contacts/${id}`);
      const updatedContactList = contacts.filter(
        (contact) => contact.id !== id
      );
      setContacts(updatedContactList);
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
  
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrievedContacts();
      setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                term={searchTerm}
                searchKeyword={searchHandler}
                contacts={searchTerm.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={ContactDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
