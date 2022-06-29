import React from "react";

export default function CatFilterBar ({handleFilterChange}) {
    return (
        <input onChange={handleFilterChange} type="text" name="category-filter" placeholder="filter by category"/>
    )
}