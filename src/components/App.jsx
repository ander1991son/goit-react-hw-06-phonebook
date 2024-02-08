// App.jsx
import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addTask, deleteContact } from '../redux/taskSlice';
import { setFilter } from '../redux/filtersSlice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

export const App = () => {
  const contacts = useSelector(state => state.tasks);
  const { status: filterStatus } = useSelector(state => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch(addTask(JSON.parse(storedContacts)));
    }
  }, [dispatch]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'number') {
      dispatch(addTask({ id: nanoid(), [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nameInput = e.target.elements.name;
    const numberInput = e.target.elements.number;

    const nameExists = contacts.some(
      contact =>
        contact.name &&
        contact.name.toLowerCase() === nameInput.value.toLowerCase()
    );

    if (nameExists) {
      alert(`The contact ${nameInput.value} already exists!`);
    } else {
      const newContact = {
        id: nanoid(),
        name: nameInput.value,
        number: numberInput.value,
      };

      localStorage.setItem(
        'contacts',
        JSON.stringify([...contacts, newContact])
      );
    }
  };

  const handleTofind = e => {
    const { value } = e.target;
    dispatch(setFilter(value.toLowerCase()));
  };

  const handleDeleteContact = id => {
    const contactToDelete = contacts.find(contact => contact.id === id);

    if (contactToDelete) {
      const contactName = contactToDelete.name || '';

      const confirmDelete = window.confirm(
        `Are you sure you want to delete ${contactName}?`
      );

      if (confirmDelete) {
        dispatch(deleteContact(id));
      }
    } else {
      console.error(`Contact with id ${id} not found`);
    }
  };

  return (
    <div>
      <h1 style={{ paddingLeft: '4%' }}>Phonebook</h1>
      <ContactForm
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <h2 style={{ paddingLeft: '4%' }}>Contacts</h2>
      <form onSubmit={handleTofind}>
        <TextField
          id="outlined-basic"
          label="Name"
          name="text"
          variant="outlined"
        />
      </form>
      <ContactList
        contacts={contacts.filter(
          contact =>
            contact.name &&
            contact.name.toLowerCase().includes(filterStatus.toLowerCase())
        )}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
