import React from "react";
import "./filters.css";

export default function NameFilterBar({ handleNameFilter }) {
  return (
    <input
      id="filterName"
      onChange={handleNameFilter}
      type="text"
      name="name-filter"
      placeholder="filter by name here"
    />
  );
}
