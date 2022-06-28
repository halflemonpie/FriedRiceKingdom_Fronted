import React, { useState } from 'react';

const Search = ({ getQuery }) => {
  const [text, setText] = useState('');

  const onChange = q => {
    setText(q);
    getQuery(q);
  };

  return (
    <section className="search">
      <form>
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={e => onChange(e.target.value)}
          placeholder="search events by category"
        ></input>
      </form>
    </section>
  );
};

export default Search;
