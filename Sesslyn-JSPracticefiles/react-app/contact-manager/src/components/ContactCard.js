import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = (props) => {
  const { id, name, email, phoneNo } = props.contact;
  return (
    <div className="item">
      <img className="ui  avatar image" src={user} alt="user" />
      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
          <div className="phoneNo">{phoneNo}</div>
        </Link>
      </div>
      <i
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => {
          props.clickHandler(id);
        }}
        className="trash alternate outline icon"
      />
      <Link to ={{pathname : `/edit`, state : {contact : props.contact}}}>
      <i
        style={{ color: "blue", marginTop: "7px", marginRight: "10px" }}
        className="edit alternate outline icon"
      />
      </Link>
    </div>
  );
};
export default ContactCard;
