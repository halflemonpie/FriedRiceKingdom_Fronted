import React from "react";
import './filters.css'
export default function CatFilterBar ({handleFilterChange}) {
    return (
        <div className="filter-container">
<input  id="filterCat" onChange={handleFilterChange} type="text" name="category-filter" placeholder="filter by category"/>
        </div>
        
    )
}



/**
 * 
 * 
 * #filter{
 * display:flex,
 * flexdirection:row
 * }
 * 
 * 
 * <div id=''filter-container>
 * {filters}
 * 
 * 
 * 
 * 
 * </div>
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */