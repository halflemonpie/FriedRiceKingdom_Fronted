import React from "react";

export default function NameFilterBar ({handleNameFilter}) {
    return (
        <input onChange={handleNameFilter} type="text" name="name-filter" placeholder="filter by name here"/>
    )
}