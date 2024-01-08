import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function EditContact({ updateContactHandler }) {
  const history = useHistory();
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phoneNo: '',
  });

  const { id, name, email, phoneNo } = history.location.state.contact;

  useState(() => {
    setContact({
      id,
      name,
      email,
      phoneNo,
    });
  }, [id, name, email, phoneNo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contact.name === '' || contact.email === '' || contact.phoneNo === '') {
      alert('All the fields are mandatory!');
      return;
    }
    updateContactHandler(contact);
    setContact({ name: '', email: '', phoneNo: '' });
   history.push('/');
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="field">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNo"
            value={contact.phoneNo}
            onChange={handleChange}
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            title="Please enter a valid 10 digit phone number"
            required
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
}

export default EditContact;
