import React from "react";
export default function CatFilterBar ({handleFilterChange}) {
    return (
        <input className="filters" onChange={handleFilterChange} type="text" name="category-filter" placeholder="filter by category"/>
    )
}