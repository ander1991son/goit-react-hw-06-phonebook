import React from 'react';
import css from './Filter.module.css';

const Filter = ({ filter, handleTofind }) => {
  return (
    <div className={css.Container_ContactForm}>
      <label className={css.Label_filter}>
        Find contacts by name
        <input
          className={css.input_Filter}
          type="text"
          name="filter"
          placeholder="To find"
          value={filter}
          onChange={handleTofind}
        />
      </label>
    </div>
  );
};

export default Filter;
