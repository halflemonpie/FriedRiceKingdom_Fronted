import React from "react";
// import './App.css'
export default function NameFilterBar ({handleNameFilter}) {
    return (
        
<input className="filters" onChange={handleNameFilter} type="text" name="name-filter" placeholder="filter by name here"/>
      
        
    )
}