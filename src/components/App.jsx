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

///////////////////////////////////////////////////
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   // Button,
//   // Checkbox,
//   // FormControl,
//   // InputLabel,
//   // MenuItem,
//   // Paper,
//   // Select,
//   TextField,
//   // Typography,
// } from '@mui/material';
// import { nanoid } from 'nanoid';
// import { addTask } from '../redux/taskSlice';
// import { setFilter } from '../redux/filtersSlice';
// ////
// import React, { useState, useEffect } from 'react';
// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactList/ContactList';
// // import Filter from './Filter/Filter';

// export const App = () => {
//   const tasks = useSelector(state => state.tasks);

//   const [contacts, setContacts] = useState([
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ]);
//   // const [filter, setFilter] = useState('');
//   const { status: filterStatus } = useSelector(state => state.filters);
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const storedContacts = localStorage.getItem('contacts');
//     if (storedContacts) {
//       setContacts(JSON.parse(storedContacts));
//     }
//   }, []);

//   const handleInputChange = e => {
//     const { name, value } = e.target;
//     if (name === 'name') dispatch(addTask(value));
//     if (name === 'number') dispatch(addTask(value));
//   };

//   const createTask = e => {
//     e.preventDefault();
//     dispatch(
//       addTask({
//         id: nanoid(),
//         name,
//         number,
//       })
//     );
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     const nameExists = contacts.some(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (nameExists) {
//       alert(`The contact ${name} already exists!`);
//     } else {
//       const newContact = {
//         id: nanoid(),
//         name,
//         number,
//       };

//       localStorage.setItem(
//         'contacts',
//         JSON.stringify([...contacts, newContact])
//       );

//       setContacts(prevContacts => [...prevContacts, newContact]);
//       setName('');
//       setNumber('');
//     }
//   };

//   // const handleTofind = event => {
//   //   const { value } = event.target;
//   //   setFilter(value.toLowerCase());
//   // };
//   const handleTofind = e => {
//     const { value } = e.target;
//     dispatch(setFilter(value.toLowerCase()));
//   };

//   const handleDeleteContact = id => {
//     setContacts(prevContacts =>
//       prevContacts.filter(contact => contact.id !== id)
//     );
//   };

//   return (
//     <div>
//       <h1 style={{ paddingLeft: '4%' }}>Phonebook</h1>
//       <ContactForm
//         name={name}
//         number={number}
//         handleInputChange={handleInputChange}
//         handleSubmit={handleSubmit}
//       />
//       <h2 style={{ paddingLeft: '4%' }}>Contacts</h2>

//       {/* <div>
//         <label>
//           Find contacts by name
//           <input
//             type="text"
//             name="filter"
//             placeholder="To find"
//             value={filterStatus}
//             onChange={handleTofind}
//           />
//         </label>
//       </div> */}
//       <form onSubmit={handleTofind}>
//         <TextField
//           id="outlined-basic"
//           label="Name"
//           name="text"
//           variant="outlined"
//         />
//       </form>
//       <ContactList
//         contacts={contacts.filter(contact =>
//           contact.name.toLowerCase().includes(filterStatus.toLowerCase())
//         )}
//         onDeleteContact={handleDeleteContact}
//       />
//     </div>
//   );
// };
