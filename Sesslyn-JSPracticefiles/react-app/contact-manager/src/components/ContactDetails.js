import React from "react";
import {Link} from 'react-router-dom';
import profile from "../images/profile.jpg";

const ContactDetails = (props) => {
  const {name, email, phoneNo} = props.location.state.contact;
  return (
    <div className="main">
      <div className='ui card centered'>
        <div className='image'>
        <img style={{ height: '290px', width: '290px' }} src={profile} alt='user' />
        </div>
        <div className='content'>
            <div className='header'>{name}</div>
            <div className='description'>{email}</div>
            <div className='description'>{phoneNo}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to='/'><button className='ui button blue center'>Back to Contact List</button></Link>
      </div>
    </div>
  );
};
export default ContactDetails;
