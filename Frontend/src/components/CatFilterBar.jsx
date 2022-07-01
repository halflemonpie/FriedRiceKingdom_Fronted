import React from "react";
import "./filters.css";

export default function CatFilterBar({ handleFilterChange }) {
  return (
    <input
      id="filterCat"
      onChange={handleFilterChange}
      type="text"
      name="category-filter"
      placeholder="filter by category"
    />
  );
}
