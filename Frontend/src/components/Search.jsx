import { useState, useEffect } from 'react';
import react from 'react';
import axios from 'axios';


const Search = ({ getQuery, fetchItems }) => {
  const [text, setText] = useState('');

  const onChange = q => {
    setText(q);
    getQuery(q);
  };

  return (
    <section className="search">
      <form onSubmit={fetchItems}>
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={e => onChange(e.target.value)}
          placeholder="search events by category"
        ></input>
        {/* <button onClick={fetchItems}>
          submit
        </button> */}
      </form>
    </section>
  );
};

export default Search;
