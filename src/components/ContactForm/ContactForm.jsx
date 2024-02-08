import React from 'react';
import css from './ContactForm.module.css';
const ContactForm = ({ name, number, handleInputChange, handleSubmit }) => {
  return (
    <div className={css.Container_ContactForm}>
      <form className={css.Form} onSubmit={handleSubmit}>
        <div className={css.Border_ContactForm}>
          <label className={css.Label_ContactForm}>
            Name
            <input
              className={css.imput_ContactForm}
              type="text"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={handleInputChange}
            />
          </label>
          <label className={css.Label_ContactForm}>
            Number
            <input
              className={css.imput_ContactForm}
              type="tel"
              name="number"
              placeholder="Number"
              required
              value={number}
              onChange={handleInputChange}
            />
            <button type="submit">Add Contact</button>
          </label>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

/////////////////////////////////////////////////////////            codigo de abajo original
// import { Component } from 'react';
// import css from './ContactForm.module.css';

// class ContactForm extends Component {
//   render() {
//     const { name, number, handleInputChange, handleSubmit } = this.props;

//     return (
//       <div className={css.Container_ContactForm}>
//         <form className={css.Form} onSubmit={handleSubmit}>
//           <div className={css.Border_ContactForm}>
//             <label className={css.Label_ContactForm}>
//               Name
//               <input
//                 className={css.imput_ContactForm}
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 required
//                 value={name}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label className={css.Label_ContactForm}>
//               Number
//               <input
//                 className={css.imput_ContactForm}
//                 type="tel"
//                 name="number"
//                 placeholder="Number"
//                 required
//                 value={number}
//                 onChange={handleInputChange}
//               />
//               <button type="submit">Add Contact</button>
//             </label>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// export default ContactForm;
