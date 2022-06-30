import React from "react";
import App from '../App';
import { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css'
// import './filters.css'
import { Link } from 'react-router-dom'
import NewProject from './NewProject'
import CatFilterBar from "./CatFilterBar";
import NameFilterBar from "./NameFilterBar";

const GetData = ({dataRaw,setData, data, setQueryResult }) =>  {
  const handleNameFilter = (e) => {
    console.log(e.target.value);
    const blackListChar = /[()\\\|\/\[\]\{\}*%]/i;
    if (e.target.value == "" ) {
      axios.get(`http://localhost:8080/projects/`)
      .then((res) => {
        console.log(res);
        setData(res.data)
      })
    } else if (blackListChar.test(e.target.value)) {

    } else {
      axios.get(`http://localhost:8080/projects/name/${e.target.value}`)
      .then((res) => {
        console.log(res);
        setData(res.data)
      })
    }
  }

  const handleFilterChange = (e) => {
    console.log("filter called");
    // let filteredProjects = dataRaw
    // console.log(filteredProjects);
    let filteredProjects = dataRaw.filter((project) => {
    return (project.category.toLowerCase().includes(e.target.value.toLowerCase()))
  })
    console.log(filteredProjects);
    setData(filteredProjects)
  }
  console.log(data);
const mapVariables = data.map((key) => {
      return (
        <Link to={`/id/${key._id}`}>
        <div className="card">
                <h5>{key.name}</h5>
                <p>category: {key.category}</p>
                <img className="card-image" src={key.image} alt={`image for ${key.name}`}/>
        </div>
        </Link>
      )
     
      
})

return (
    <div >
      <CatFilterBar handleFilterChange={handleFilterChange}/>
      <NameFilterBar handleNameFilter={handleNameFilter}/>
     
        <div className="filter-container">
      <Link to="/create">
      <div className="card">
                    <h5> Create New Project <br></br></h5>
                    {setQueryResult}
                    <img className="card-image" src="data:image/png;base64,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" />
           
                    </div>
          </Link>
            {mapVariables}
        </div>
      
          
    </div>
)
}

export default GetData

   