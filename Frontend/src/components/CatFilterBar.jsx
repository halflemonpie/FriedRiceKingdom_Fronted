import React from "react";
import './App.css'
export default function CatFilterBar ({handleFilterChange}) {
    return (
        <input className="filters" onChange={handleFilterChange} type="text" name="category-filter" placeholder="filter by category"/>
    )
}