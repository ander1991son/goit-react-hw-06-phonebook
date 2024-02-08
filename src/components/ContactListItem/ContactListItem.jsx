import React from 'react';

const ContactListItem = ({ id, name, number, onDeleteContact }) => {
  return (
    <li>
      Name: {name}, Number: {number}
      <button onClick={() => onDeleteContact(id)}>Delete</button>
    </li>
  );
};

export default ContactListItem;
